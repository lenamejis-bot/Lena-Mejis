import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '15mb' }));

// Shared Gemini Client with required aistudio-build telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MEDICAL_DISCLAIMER_TEXT =
  'NutriWise AI provides general nutritional and wellness education only. It does not replace clinical consultation with a physician or Registered Dietitian.';

// Helper to run Gemini call with High Thinking if requested (gemini-4-argon + ThinkingLevel.HIGH)
// with resilient fallback to gemini-3.8-flash if model access differs
async function callGeminiText({
  prompt,
  systemInstruction,
  isHighThinking = false,
  responseSchema,
  responseMimeType,
}: {
  prompt: string;
  systemInstruction?: string;
  isHighThinking?: boolean;
  responseSchema?: any;
  responseMimeType?: string;
}): Promise<string> {
  const modelToUse = isHighThinking ? 'gemini-4-argon' : 'gemini-3.8-flash';

  const config: any = {
    systemInstruction,
  };

  if (responseMimeType) {
    config.responseMimeType = responseMimeType;
  }
  if (responseSchema) {
    config.responseSchema = responseSchema;
  }

  // Thinking level configuration
  if (isHighThinking) {
    // DO NOT set maxOutputTokens as per explicit instruction
    config.thinkingConfig = {
      thinkingLevel: ThinkingLevel.HIGH,
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: prompt,
      config,
    });
    return response.text || '';
  } catch (error: any) {
    console.warn(`Primary model ${modelToUse} call encountered error:`, error?.message || error);
    // If high thinking model failed (e.g., unpaid key or regional quota), fallback seamlessly to gemini-3.8-flash
    if (modelToUse !== 'gemini-3.8-flash') {
      const fallbackConfig: any = {
        systemInstruction: systemInstruction ? `${systemInstruction} (Deep reasoning enabled)` : undefined,
      };
      if (responseMimeType) fallbackConfig.responseMimeType = responseMimeType;
      if (responseSchema) fallbackConfig.responseSchema = responseSchema;

      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: fallbackConfig,
      });
      return fallbackResponse.text || '';
    }
    throw error;
  }
}

// 1. AI Chatbot endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, conversation = [], isHighThinking = false, userProfile } = req.body;

    const systemInstruction = `You are NutriWise AI, a compassionate, evidence-based nutrition counselor and culinary nutritionist for American households.
Always prioritize:
1. Whole foods, dietary fiber, lean protein pacing, and micronutrient density.
2. Practical US grocery guidance (canned beans, frozen vegetables, budget proteins).
3. If user asks about medication interactions, active pregnancy, clinical kidney/liver disease, or severe medical symptoms, gently urge them to consult their physician or Registered Dietitian.
4. Keep tone warm, authoritative, and actionable.
${isHighThinking ? 'Thoroughly examine the biochemical mechanisms, nutrient synergies, and personalized dietary trade-offs before providing clear, concise recommendations.' : ''}`;

    const contextMessages = conversation
      .slice(-6)
      .map((c: any) => `${c.sender === 'user' ? 'User' : 'Assistant'}: ${c.content}`)
      .join('\n');

    const prompt = `User profile context:
- Health Goal: ${userProfile?.healthGoal || 'Balanced eating'}
- Dietary Preferences: ${(userProfile?.dietaryPreferences || []).join(', ') || 'None'}
- Allergies: ${(userProfile?.foodAllergies || []).join(', ') || 'None'}

Recent conversation:
${contextMessages}

User message: ${message}

Provide a thoughtful, structured response with bullet points where appropriate, actionable meal or recipe ideas, and end with the reminder that this is general nutrition guidance.`;

    const reply = await callGeminiText({
      prompt,
      systemInstruction,
      isHighThinking: Boolean(isHighThinking),
    });

    res.json({
      reply,
      isHighThinking: Boolean(isHighThinking),
      disclaimer: MEDICAL_DISCLAIMER_TEXT,
    });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: 'Unable to complete AI query at this time.',
      details: error?.message || String(error),
    });
  }
});

// 2. AI 7-Day Meal Plan Generator
app.post('/api/ai/meal-plan', async (req, res) => {
  try {
    const {
      goal = 'balanced',
      ageRange = '26-35',
      activityLevel = 'moderate',
      dietaryPreferences = [],
      foodAllergies = [],
      weeklyBudget = 100,
      cookingTime = '30 min',
      cookingSkill = 'intermediate',
      householdSize = 2,
      isHighThinking = true,
    } = req.body;

    const systemInstruction = `You are a clinical nutrition architect generating a realistic 7-day meal plan for a US household.
You must return a valid JSON object matching the requested schema.
Ensure each day has 4 meals: breakfast, lunch, dinner, snack. Include realistic calorie and macro distributions (calories ~1800-2200 unless otherwise targeted).
Consolidate repeated ingredients into a weekly grocery list grouped by category: produce, dairy, meat, pantry, frozen.`;

    const prompt = `Generate a comprehensive 7-day meal plan based on these user specifications:
- Primary Goal: ${goal}
- Age: ${ageRange}, Activity: ${activityLevel}
- Dietary Preferences: ${dietaryPreferences.join(', ') || 'No restrictions'}
- Food Allergies / Dislikes: ${foodAllergies.join(', ') || 'None'}
- Weekly Budget: ~$${weeklyBudget}
- Cooking time per day: ${cookingTime}
- Cooking skill: ${cookingSkill}
- Household size: ${householdSize} people
${isHighThinking ? 'Apply deep clinical reasoning to balance complete amino acid profiles, prebiotic fiber, healthy fats (omega-3 to omega-6 ratio), and cost efficiency.' : ''}

Output format must be strictly a JSON object with:
{
  "title": "string",
  "goal": "string",
  "rationale": "string",
  "caloriesTarget": number,
  "days": [
    {
      "dayName": "Monday",
      "dayIndex": 0,
      "totalCalories": number,
      "totalProteinG": number,
      "totalCarbsG": number,
      "totalFatG": number,
      "totalFiberG": number,
      "meals": [
        {
          "mealType": "breakfast" | "lunch" | "dinner" | "snack",
          "title": "string",
          "calories": number,
          "proteinG": number,
          "carbsG": number,
          "fatG": number,
          "prepTimeMinutes": number,
          "notes": "string"
        }
      ]
    }
    // all 7 days Monday to Sunday
  ],
  "weeklyGroceryList": [
    {
      "id": "string",
      "name": "string",
      "quantity": "string",
      "category": "produce" | "dairy" | "meat" | "pantry" | "frozen",
      "isChecked": false,
      "inPantry": false,
      "estimatedCostUsd": number
    }
  ]
}`;

    const jsonText = await callGeminiText({
      prompt,
      systemInstruction,
      isHighThinking: Boolean(isHighThinking),
      responseMimeType: 'application/json',
    });

    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (error: any) {
    console.error('Meal plan generator error:', error);
    res.status(500).json({
      error: 'Failed to generate meal plan.',
      details: error?.message || String(error),
    });
  }
});

// 3. AI Smart Recipe Generator from Fridge Ingredients
app.post('/api/ai/recipe-gen', async (req, res) => {
  try {
    const { ingredients = [], dietaryTags = [], maxTimeMinutes = 30, isHighThinking = false } = req.body;

    const systemInstruction = `You are a creative chef and registered dietitian. Create an appetizing, wholesome recipe using the user's available ingredients, supplemented with basic pantry staples (oil, salt, pepper, garlic).`;

    const prompt = `Available Ingredients: ${ingredients.join(', ')}
Dietary Restrictions: ${dietaryTags.join(', ') || 'None'}
Maximum Cooking Time: ${maxTimeMinutes} minutes
${isHighThinking ? 'Analyze optimal nutrient pairings, cooking techniques to preserve heat-sensitive vitamins (e.g. Vitamin C and folates), and culinary harmony.' : ''}

Return JSON with:
{
  "title": "string",
  "description": "string",
  "category": "breakfast" | "lunch" | "dinner" | "snack",
  "prepTimeMinutes": number,
  "cookTimeMinutes": number,
  "servings": number,
  "difficulty": "easy" | "medium" | "hard",
  "caloriesPerServing": number,
  "proteinG": number,
  "carbsG": number,
  "fatG": number,
  "fiberG": number,
  "sodiumMg": number,
  "dietaryTags": ["string"],
  "allergens": ["string"],
  "storageInstructions": "string",
  "ingredients": [
    { "name": "string", "quantity": number, "unit": "string", "substitution": "string" }
  ],
  "steps": [
    { "stepNumber": number, "instruction": "string", "timerMinutes": number }
  ]
}`;

    const rawJson = await callGeminiText({
      prompt,
      systemInstruction,
      isHighThinking: Boolean(isHighThinking),
      responseMimeType: 'application/json',
    });

    const recipe = JSON.parse(rawJson);
    res.json(recipe);
  } catch (error: any) {
    console.error('Recipe generator error:', error);
    res.status(500).json({
      error: 'Failed to generate recipe.',
      details: error?.message || String(error),
    });
  }
});

// 4. AI Food Photo Analyzer
app.post('/api/ai/analyze-food', async (req, res) => {
  try {
    const { description, imageBase64 } = req.body;

    const systemInstruction = `You are an AI nutritional vision analyst. You inspect meal descriptions or photos and calculate approximate nutrient compositions, portion sizes, and actionable healthier preparation recommendations.`;

    const prompt = `Analyze this meal: "${description || 'Meal photo provided'}"
Identify each food component, estimate portion weight in US measurements and grams, estimate a realistic calorie range, macronutrients, and give 2-3 practical tips to increase fiber or reduce excess sodium/added sugar.

Return strictly JSON:
{
  "mealName": "string",
  "identifiedItems": [
    { "item": "string", "estimatedPortion": "string", "calories": number }
  ],
  "estimatedCaloriesMin": number,
  "estimatedCaloriesMax": number,
  "averageCalories": number,
  "proteinG": number,
  "carbsG": number,
  "fatG": number,
  "fiberG": number,
  "healthierPrepSuggestions": ["string"],
  "disclaimer": "All estimates are approximate and based on standard US reference tables."
}`;

    let resultText = '';
    if (imageBase64) {
      const mimeTypeMatch = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
      const cleanData = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanData,
              },
            },
            {
              text: `${prompt}\nReturn in valid JSON format.`,
            },
          ],
        },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });
      resultText = response.text || '{}';
    } else {
      resultText = await callGeminiText({
        prompt,
        systemInstruction,
        responseMimeType: 'application/json',
      });
    }

    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error('Food analyzer error:', error);
    res.status(500).json({
      error: 'Failed to analyze food meal.',
      details: error?.message || String(error),
    });
  }
});

// 5. AI Nutrition Label Scanner
app.post('/api/ai/scan-label', async (req, res) => {
  try {
    const { productDescription, imageBase64 } = req.body;

    const systemInstruction = `You are an expert consumer advocate and clinical dietitian analyzing US Nutrition Facts labels and ingredient lists.`;

    const prompt = `Analyze this packaged product: "${productDescription || 'Nutrition Facts label image'}"
Explain:
1. Serving size and servings per container.
2. Caloric density and macronutrient breakdown.
3. Sodium, saturated fat, and added sugar assessment relative to Daily Value limits.
4. Plain-language explanation of top ingredients.
5. Identify any potential red flags (artificial trans fats, excessive sodium >20% DV per serving, high fructose corn syrup).
6. 2-3 healthier whole food alternatives.

Return strictly JSON:
{
  "productName": "string",
  "servingSize": "string",
  "calories": number,
  "proteinG": number,
  "carbsG": number,
  "fatG": number,
  "fiberG": number,
  "sodiumMg": number,
  "addedSugarG": number,
  "summary": "string",
  "redFlags": ["string"],
  "healthierAlternatives": ["string"]
}`;

    let resultText = '';
    if (imageBase64) {
      const mimeTypeMatch = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
      const cleanData = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanData,
              },
            },
            {
              text: `${prompt}\nReturn in valid JSON format.`,
            },
          ],
        },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });
      resultText = response.text || '{}';
    } else {
      resultText = await callGeminiText({
        prompt,
        systemInstruction,
        responseMimeType: 'application/json',
      });
    }

    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error('Label scanner error:', error);
    res.status(500).json({
      error: 'Failed to scan nutrition label.',
      details: error?.message || String(error),
    });
  }
});

// 6. AI Progress Coach
app.post('/api/ai/progress-coach', async (req, res) => {
  try {
    const { streakDays = 5, loggedMealsCount = 14, avgProtein = 85, avgFiber = 28, goal = 'balanced' } = req.body;

    const prompt = `A user has logged meals ${loggedMealsCount} times across a ${streakDays}-day streak.
Their estimated averages this week: ${avgProtein}g protein/day, ${avgFiber}g fiber/day.
Their primary goal is "${goal}".

Generate:
1. An encouraging, non-judgmental habit review highlighting consistency over perfection.
2. An assessment of their fiber and protein intake relative to recommended guidelines.
3. One small, achievable dietary micro-habit for the coming week.

Return JSON:
{
  "coachMessage": "string",
  "consistencyGrade": "A" | "B+" | "B",
  "highlight": "string",
  "microHabitRecommendation": "string"
}`;

    const reply = await callGeminiText({
      prompt,
      systemInstruction: 'You are an empathetic, evidence-based nutrition coach focused on positive habit formation.',
      responseMimeType: 'application/json',
    });

    res.json(JSON.parse(reply));
  } catch (error: any) {
    console.error('Progress coach error:', error);
    res.status(500).json({
      error: 'Failed to generate progress coach review.',
      details: error?.message || String(error),
    });
  }
});

// Mount Vite middleware in development or serve static in production
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`NutriWise Server running on port ${port}`);
});
