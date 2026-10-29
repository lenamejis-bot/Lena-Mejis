import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { analyzeMealPhoto } from '../../lib/api';
import { Camera, Upload, Sparkles, PlusCircle, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { MacroBadges } from '../../components/shared/MacroBadges';
import { useAppStore } from '../../store/useStore';

export const PhotoAnalyzerPage: React.FC = () => {
  const { addFoodDiaryEntry, showToast, user } = useAppStore();

  const [description, setDescription] = useState('Wild salmon fillet with roasted sweet potatoes, asparagus, and olive oil');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80'
  );
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sampleMeals = [
    {
      name: 'Wild Salmon & Sweet Potato',
      img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      desc: 'Wild salmon fillet with roasted sweet potatoes, asparagus, and olive oil'
    },
    {
      name: 'Greek Yogurt & Blueberries Parfait',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
      desc: '1 cup nonfat Greek yogurt with raw walnuts, chia seeds, and fresh wild blueberries'
    },
    {
      name: 'Tuscan White Bean Kale Soup',
      img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
      desc: 'Cannellini bean stew with Lacinato kale, diced carrots, and sourdough bread'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('Photo must be under 10MB. Please choose a smaller image.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setImageBase64(base64);
        setDescription(file.name.replace(/\.[^/.]+$/, ''));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const data = await analyzeMealPhoto(description, imageBase64);
      setResult(data);
      showToast('Completed AI photo analysis!', 'success');
    } catch (err) {
      showToast('Analysis error. Please try again.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToDiary = () => {
    if (!result) return;
    addFoodDiaryEntry({
      date: new Date().toISOString().split('T')[0],
      mealType: 'dinner',
      foodName: result.mealName || description,
      servingAmount: '1 plate',
      calories: result.averageCalories || 500,
      proteinG: result.proteinG || 35,
      carbsG: result.carbsG || 45,
      fatG: result.fatG || 18,
      fiberG: result.fiberG || 7,
      aiAnalyzed: true
    });
  };

  return (
    <PageWrapper title="AI Food Photo Meal Analyzer">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase mb-2">
            <Camera className="w-3.5 h-3.5 text-[#F77F00]" /> Vision AI Nutrition Intelligence
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
            AI Food Photo Meal Analyzer
          </h1>
          <p className="text-sm text-[#4A6741] mt-2 max-w-xl mx-auto leading-relaxed">
            Snap or upload a photo of your plate. Computer vision detects ingredients, estimates realistic calorie ranges, and offers healthier preparation tips.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Uploader Column */}
          <div className="lg:col-span-6 bg-white p-6 rounded-[28px] border border-[#D4E4D0] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] mb-3">
                1. Upload Meal Photo or Choose Sample
              </h3>

              {/* Image Preview Box */}
              <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] bg-stone-100 border-2 border-dashed border-[#D4E4D0] flex items-center justify-center group">
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected meal" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6">
                    <Camera className="w-10 h-10 text-[#8FAE8A] mx-auto mb-2" />
                    <p className="text-xs text-[#4A6741]">Drop meal photo here or click upload</p>
                  </div>
                )}
                <label className="absolute inset-0 cursor-pointer flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white font-bold flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs">
                    <Upload className="w-3.5 h-3.5" /> Change Photo
                  </span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {/* Sample Quick Selectors */}
              <div className="mt-4">
                <span className="text-[11px] font-bold text-[#8FAE8A] uppercase tracking-wider block mb-2">
                  Or test with sample plates:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sampleMeals.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedImage(sample.img);
                        setImageBase64(undefined);
                        setDescription(sample.desc);
                      }}
                      className="p-2 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6] text-left hover:border-[#2D6A4F] transition-all cursor-pointer"
                    >
                      <img src={sample.img} alt={sample.name} className="w-full h-12 object-cover rounded-[8px] mb-1" />
                      <span className="text-[10px] font-bold text-[#1A2E1A] line-clamp-1">{sample.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A6741] uppercase mb-1">
                Meal Description / Notes (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Salmon fillet with sweet potatoes..."
                className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs text-[#1A2E1A] focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-md"
              isLoading={isAnalyzing}
              onClick={handleAnalyze}
            >
              <Sparkles className="w-4 h-4 text-[#FFBE0B]" />
              Analyze Nutrition Composition
            </Button>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6">
            {result ? (
              <div className="bg-white p-8 rounded-[28px] border border-[#D4E4D0] shadow-sm space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#F0F4EF]">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D6A4F]">
                      Analysis Complete
                    </span>
                    <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
                      {result.mealName || 'Analyzed Meal'}
                    </h2>
                  </div>

                  <Button variant="primary" size="sm" onClick={handleAddToDiary}>
                    <PlusCircle className="w-3.5 h-3.5" /> Save to Diary
                  </Button>
                </div>

                {/* Calorie Range Box */}
                <div className="p-5 rounded-[18px] bg-[#F0F4EF] border border-[#D4E4D0] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#4A6741] font-semibold block">Estimated Caloric Density:</span>
                    <span className="text-2xl font-bold text-[#1A2E1A]">
                      ~{result.averageCalories} <span className="text-xs font-normal text-[#4A6741]">kcal ({result.estimatedCaloriesMin}–{result.estimatedCaloriesMax} range)</span>
                    </span>
                  </div>
                  <MacroBadges
                    proteinG={result.proteinG}
                    carbsG={result.carbsG}
                    fatG={result.fatG}
                    fiberG={result.fiberG}
                    size="sm"
                  />
                </div>

                {/* Identified Components */}
                {result.identifiedItems && result.identifiedItems.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
                      Identified Plate Components
                    </h3>
                    <div className="space-y-1.5 text-xs">
                      {result.identifiedItems.map((item: any, i: number) => (
                        <div key={i} className="p-3 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6] flex items-center justify-between">
                          <span className="font-semibold text-[#1A2E1A]">{item.item}</span>
                          <span className="text-[#4A6741] font-medium">{item.estimatedPortion} • ~{item.calories} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Healthier Prep Suggestions */}
                {result.healthierPrepSuggestions && result.healthierPrepSuggestions.length > 0 && (
                  <div className="p-5 rounded-[18px] bg-emerald-50/60 border border-emerald-200/60 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" /> Healthier Preparation Tweaks
                    </h4>
                    <ul className="space-y-1 text-xs text-emerald-950">
                      {result.healthierPrepSuggestions.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#2D6A4F] font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-[11px] text-[#8FAE8A] leading-tight">
                  * Note: All nutrient values are computer-vision estimates for lifestyle tracking and not laboratory measurements.
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-[28px] border border-[#E8EFE6] text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F0F4EF] flex items-center justify-center text-[#2D6A4F] mx-auto text-2xl">
                  📸
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                  AI Vision Nutrition Scanner
                </h3>
                <p className="text-xs text-[#4A6741] max-w-sm mx-auto leading-relaxed">
                  Upload an image or pick a sample on the left. The model analyzes food portions and calculates macronutrients to log directly into your food diary.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
