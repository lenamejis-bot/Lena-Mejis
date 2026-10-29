import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowRight, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAppStore } from '../../store/useStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useAppStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to our Weekly Evidence-Based Nutrition Brief!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-[#D4E4D0] mt-16 pt-16 pb-12 text-[#1A2E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E8EFE6]">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-lg shadow-xs">
                🌿
              </div>
              <span className="font-serif-heading text-2xl font-bold tracking-tight text-[#1A2E1A]">
                NutriWise <span className="text-[#2D6A4F]">USA</span>
              </span>
            </Link>

            <p className="text-sm text-[#4A6741] leading-relaxed max-w-sm">
              Making healthy eating simple, personalized, and practical for every American household through peer-reviewed science, AI meal planning, and registered dietitian expertise.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E1A] mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2D6A4F]" />
                Weekly Nutrition Digest
              </h4>
              {subscribed ? (
                <div className="text-xs bg-[#F0F4EF] text-[#2D6A4F] p-3 rounded-[10px] font-semibold border border-[#D4E4D0]">
                  ✓ You're subscribed! Look for evidence-based meal guides each Tuesday.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 px-3.5 py-2 text-xs rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                  <Button type="submit" size="sm" variant="primary">
                    Join Free <ArrowRight className="w-3 h-3" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Column 1: Nutrition & Recipes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E1A] mb-4">
              Explore Content
            </h4>
            <ul className="space-y-2 text-xs text-[#4A6741]">
              <li><Link to="/articles" className="hover:text-[#2D6A4F] transition-colors">Health & Wellness Blog</Link></li>
              <li><Link to="/recipes" className="hover:text-[#2D6A4F] transition-colors">Healthy Recipe Library</Link></li>
              <li><Link to="/foods" className="hover:text-[#2D6A4F] transition-colors">USDA Food Database</Link></li>
              <li><Link to="/diet-plans" className="hover:text-[#2D6A4F] transition-colors">7-Day Curated Diet Plans</Link></li>
              <li><Link to="/nutritionist-services" className="hover:text-[#2D6A4F] transition-colors">Registered Dietitians</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2: AI Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E1A] mb-4">
              AI Nutrition Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#4A6741]">
              <li><Link to="/ai/meal-plan-generator" className="hover:text-[#2D6A4F] transition-colors">Meal Plan Generator</Link></li>
              <li><Link to="/ai/chatbot" className="hover:text-[#2D6A4F] transition-colors">AI Nutrition Chatbot</Link></li>
              <li><Link to="/ai/recipe-generator" className="hover:text-[#2D6A4F] transition-colors">Smart Recipe Generator</Link></li>
              <li><Link to="/ai/grocery-planner" className="hover:text-[#2D6A4F] transition-colors">Smart Grocery Planner</Link></li>
              <li><Link to="/ai/photo-analyzer" className="hover:text-[#2D6A4F] transition-colors">Food Photo Analyzer</Link></li>
              <li><Link to="/ai/label-scanner" className="hover:text-[#2D6A4F] transition-colors">Nutrition Label Scanner</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 3: Standards & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E1A] mb-4">
              About & Trust
            </h4>
            <ul className="space-y-2 text-xs text-[#4A6741]">
              <li><Link to="/about" className="hover:text-[#2D6A4F] transition-colors">Our Editorial Standards</Link></li>
              <li><Link to="/medical-disclaimer" className="hover:text-[#2D6A4F] transition-colors text-amber-700 font-medium">Medical Disclaimer</Link></li>
              <li><Link to="/subscription-plans" className="hover:text-[#2D6A4F] transition-colors">Free vs Premium Plans</Link></li>
              <li><Link to="/faq" className="hover:text-[#2D6A4F] transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#2D6A4F] transition-colors">Privacy Policy (CCPA)</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-[#2D6A4F] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Medical & Legal Disclaimer Strip */}
        <div className="py-6 border-b border-[#E8EFE6] text-xs text-[#4A6741] leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#1A2E1A]">Important Medical Disclaimer:</strong> The dietary plans, nutritional content, AI responses, and recipe estimates provided on NutriWise USA are for informational, general wellness, and educational purposes only. They do not constitute medical advice, diagnosis, or clinical therapy. Individuals with diagnosed medical conditions (e.g. chronic kidney disease, type 1 diabetes, eating disorders, or active pregnancy) should consult their physician or a Board Certified Registered Dietitian before adopting significant dietary modifications.
            </p>
          </div>
        </div>

        {/* Copyright & Footnote */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8FAE8A] gap-4">
          <p>© 2026 NutriWise USA Inc. All rights reserved. US Nutrition Data sourced from USDA FoodData Central.</p>
          <div className="flex items-center gap-1 text-[#4A6741]">
            <span>Crafted for healthy American households</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
