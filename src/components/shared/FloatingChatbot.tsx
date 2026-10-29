import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Brain, Sparkles, Maximize2, Minimize2, RefreshCw, Check, Bot } from 'lucide-react';
import { askAiNutritionChat } from '../../lib/api';
import { useAppStore } from '../../store/useStore';
import { ChatMessage } from '../../types';
import { Link } from 'react-router-dom';

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { user, incrementAiQueryCount } = useAppStore();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      content: "Hi! I'm your 100% Free AI Nutrition Assistant 🌿\n\nAsk me anything about healthy meals, quick ingredient swaps, macros, or grocery budgets. How can I help you eat better today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHighThinking, setIsHighThinking] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  const quickPrompts = [
    '🥗 Quick healthy dinner under 500 cal',
    '🥑 High-protein vegetarian snacks',
    '🍳 What to cook with chicken & broccoli',
    '🧂 How to lower sodium without losing flavor',
    '⚡ Best pre-workout energy foods'
  ];

  const handleSendMessage = async (customText?: string) => {
    const text = customText || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
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

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isHighThinking: response.isHighThinking
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: "I'm right here! Even when offline, I can help you with balanced meal tips, high-protein recipes, and USDA food nutrition facts. Please try your question again!",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div
          className={`bg-white rounded-[24px] border border-[#D4E4D0] shadow-2xl overflow-hidden transition-all duration-200 mb-3 flex flex-col ${
            isMinimized
              ? 'h-14 w-80'
              : 'w-[92vw] sm:w-[420px] h-[540px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#2D6A4F] px-4 py-3 text-white flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-base">
                🌿
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif-heading font-bold text-sm tracking-wide">
                    Free AI Nutritionist
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#FFBE0B] text-[#1A2E1A]">
                    FREE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>100% Free • Unlimited</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <Link
                to="/ai/chatbot"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Open full page chatbot"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Close chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Thinking Mode Sub-header */}
              <div className="bg-[#F0F4EF] px-3.5 py-1.5 border-b border-[#D4E4D0] flex items-center justify-between text-[11px] text-[#4A6741]">
                <button
                  type="button"
                  onClick={() => setIsHighThinking(!isHighThinking)}
                  className="flex items-center gap-1 font-bold text-[#2D6A4F] hover:underline cursor-pointer"
                  title="Toggle Gemini Deep Thinking Reasoning Mode"
                >
                  <Brain className={`w-3 h-3 ${isHighThinking ? 'text-[#F77F00]' : 'text-stone-400'}`} />
                  <span>Thinking: {isHighThinking ? 'HIGH REASONING' : 'FAST'}</span>
                </button>
                <span className="text-[10px] text-[#8FAE8A]">
                  No subscription needed
                </span>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#FAFAF7]/70 text-xs">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 shadow-2xs">
                        🌿
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-[16px] px-3.5 py-2.5 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#2D6A4F] text-white'
                          : 'bg-white text-[#1A2E1A] border border-[#E8EFE6] shadow-2xs'
                      }`}
                    >
                      {msg.isHighThinking && (
                        <div className="mb-1 inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 text-[9px] font-bold">
                          <Brain className="w-2.5 h-2.5 text-[#F77F00]" /> High Thinking
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div
                        className={`text-[9px] mt-1 text-right ${
                          msg.sender === 'user' ? 'text-emerald-200' : 'text-[#8FAE8A]'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-[10px] shrink-0">
                      🌿
                    </div>
                    <div className="bg-white p-3 rounded-[16px] border border-[#D4E4D0] text-[11px] text-[#4A6741] flex items-center gap-2 shadow-2xs">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2D6A4F]" />
                      <span>{isHighThinking ? 'Thinking deeply with Gemini...' : 'Crafting answer...'}</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="px-3 py-1.5 bg-white border-t border-[#F0F4EF] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#F0F4EF] hover:bg-[#E2ECE0] text-[#2D6A4F] font-medium whitespace-nowrap cursor-pointer transition-colors border border-[#D4E4D0]/60 shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-2.5 bg-white border-t border-[#D4E4D0] flex items-center gap-1.5"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask any nutrition question for free..."
                  disabled={isLoading}
                  className="flex-1 h-10 px-3 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs text-[#1A2E1A] placeholder-[#8FAE8A] focus:outline-none focus:border-[#2D6A4F]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="h-10 w-10 rounded-[12px] bg-[#2D6A4F] text-white flex items-center justify-center hover:bg-[#245840] disabled:opacity-40 transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-[#2D6A4F] text-white shadow-xl hover:shadow-2xl hover:bg-[#245840] hover:scale-105 transition-all cursor-pointer border-2 border-white"
        >
          <div className="relative">
            <span className="text-xl">🌿</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFBE0B] animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFBE0B]"></span>
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-tight flex items-center gap-1">
              <span>Free AI Assistant</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#FFBE0B] text-[#1A2E1A]">
                FREE
              </span>
            </div>
            <div className="text-[10px] text-emerald-100 font-medium">
              Ask anything • No dollars
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
