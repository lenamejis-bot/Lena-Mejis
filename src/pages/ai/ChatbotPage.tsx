import React, { useState, useRef, useEffect } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Send, Sparkles, Brain, ShieldCheck, RefreshCw, User, Check, Trash2, Copy, Bookmark, Heart } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useStore';
import { askAiNutritionChat } from '../../lib/api';
import { ChatMessage } from '../../types';

export const ChatbotPage: React.FC = () => {
  const { user, aiQueriesUsedToday, incrementAiQueryCount, showToast } = useAppStore();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      content: `Hello! I'm your 100% Free NutriWise Nutrition Assistant 🌿\n\nI can help you plan balanced meals, troubleshoot grocery budgets, analyze macros, decode FDA food labels, or suggest healthy recipe swaps — completely free with unlimited questions.\n\nHow can I support your nutrition goals today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHighThinking, setIsHighThinking] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'meals' | 'macros' | 'grocery' | 'swaps'>('all');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const promptCategories = {
    all: [
      'Give me healthy high-protein breakfast ideas under $4',
      'High-fiber vegetarian lunch recipes for busy weekdays',
      'What can I cook tonight with chicken, sweet potato & broccoli?',
      'How to lower sodium without sacrificing flavor'
    ],
    meals: [
      'Quick dinner under 25 minutes with 30g+ protein',
      'Anti-inflammatory meal prep ideas for 4 days',
      'Healthy kid-friendly dinner with hidden vegetables',
      'Mediterranean diet lunch bowl with pantry staples'
    ],
    macros: [
      'Calculate my daily protein target for healthy lean muscle',
      'Best sources of soluble prebiotic fiber for gut health',
      'Healthy fats vs unhealthy fats: practical everyday list',
      'How to hit 120g of protein without protein powder'
    ],
    grocery: [
      'Create a 5-day balanced grocery list for under $50',
      'Affordable nutrient-dense foods at Walmart or Trader Joes',
      'Produce that lasts the longest in the fridge without spoiling',
      'Budget pantry staples every healthy kitchen needs'
    ],
    swaps: [
      'What can I substitute for heavy cream in soups & sauces?',
      'Healthy low-sodium swaps for soy sauce and bouillon',
      'Higher-fiber alternative to white rice or pasta',
      'Clean alternative to sugary processed afternoon snacks'
    ]
  };

  const currentChips = promptCategories[activeCategory];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    incrementAiQueryCount();

    try {
      const response = await askAiNutritionChat({
        message: text,
        conversation: messages,
        isHighThinking,
        userProfile: user
      });

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isHighThinking: response.isHighThinking
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: 'Here to help! For general wellness, focus on balanced whole foods, colorful vegetables, lean proteins, and staying hydrated. Please feel free to retry your query.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-reset',
        sender: 'assistant',
        content: "Chat cleared! What nutrition or recipe question can I answer for you next?",
        timestamp: 'Just now'
      }
    ]);
    showToast('Chat history cleared', 'info');
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied response to clipboard ✓', 'success');
  };

  return (
    <PageWrapper title="Free AI Nutrition Chatbot — 100% Free & Unlimited" hideFooter={true}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 h-[calc(100vh-4.5rem)] flex flex-col">
        {/* Header Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-[20px] border border-[#D4E4D0] shadow-xs flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-xl shadow-xs">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
                  Free AI Nutrition Assistant
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#2D6A4F] border border-emerald-300">
                  100% FREE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#4A6741]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Unlimited Questions • No Dollars / No Subscription</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Thinking Mode Toggle */}
            <button
              onClick={() => setIsHighThinking(!isHighThinking)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                isHighThinking
                  ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-xs'
                  : 'bg-[#F0F4EF] text-[#4A6741] border-[#D4E4D0]'
              }`}
              title="Toggle Gemini Deep Thinking Reasoning"
            >
              <Brain className={`w-3.5 h-3.5 ${isHighThinking ? 'text-[#FFBE0B]' : 'text-[#8FAE8A]'}`} />
              <span>Thinking: {isHighThinking ? 'HIGH' : 'FAST'}</span>
            </button>

            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClearChat}
              className="p-2 text-[#8FAE8A] hover:text-[#D62828] hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          {[
            { id: 'all', label: '🌟 All Questions' },
            { id: 'meals', label: '🥗 Meal Ideas' },
            { id: 'macros', label: '🥑 Macros & Calories' },
            { id: 'grocery', label: '🛒 Grocery & Budget' },
            { id: 'swaps', label: '💡 Healthy Swaps' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer shrink-0 border ${
                activeCategory === tab.id
                  ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                  : 'bg-white text-[#4A6741] border-[#D4E4D0] hover:bg-[#F0F4EF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/80 rounded-[24px] border border-[#E8EFE6] shadow-inner">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-sm shadow-xs shrink-0 mt-1">
                  🌿
                </div>
              )}

              <div
                className={`group relative max-w-[85%] sm:max-w-[75%] rounded-[20px] p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-[#F0F4EF] text-[#1A2E1A] border border-[#D4E4D0]'
                }`}
              >
                {msg.isHighThinking && (
                  <div className="mb-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2D6A4F]/10 text-[#2D6A4F] text-[10px] font-bold uppercase tracking-wider">
                    <Brain className="w-3 h-3 text-[#F77F00]" /> Gemini High Thinking Reasoning Applied
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5">
                  <div className="text-[10px] opacity-75">
                    {msg.timestamp}
                  </div>
                  {msg.sender === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-[#2D6A4F] text-[#8FAE8A] cursor-pointer"
                      title="Copy response"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-sm shadow-xs shrink-0">
                🌿
              </div>
              <div className="bg-[#F0F4EF] p-4 rounded-[20px] border border-[#D4E4D0] text-xs text-[#4A6741] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#2D6A4F]" />
                <span>
                  {isHighThinking ? 'Analyzing nutritional literature and calculating optimal options (High Thinking)...' : 'Generating personalized nutrition advice...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Starter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
          {currentChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#D4E4D0] text-[#4A6741] hover:bg-[#F0F4EF] hover:border-[#2D6A4F] transition-colors whitespace-nowrap cursor-pointer shadow-2xs shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2 mt-1"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about nutrition, recipes, or ingredients — 100% Free..."
            disabled={isLoading}
            className="flex-1 h-14 pl-5 pr-14 rounded-[16px] bg-white border border-[#D4E4D0] focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-sm text-[#1A2E1A] placeholder-[#8FAE8A] shadow-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2.5 p-2.5 rounded-[12px] bg-[#2D6A4F] text-white hover:bg-[#245840] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="text-[11px] text-center text-[#8FAE8A] mt-2">
          100% Free AI Nutrition Tool • Evidence-based wellness guidance • No subscription or credit card needed
        </div>
      </div>
    </PageWrapper>
  );
};
