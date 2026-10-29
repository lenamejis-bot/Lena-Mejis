import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sparkles, Menu, X, Shield, Crown, User, ChevronDown, Check } from 'lucide-react';
import { useAppStore } from '../../store/useStore';
import { UserRole } from '../../types';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, setUserRole } = useAppStore();

  const navLinks = [
    { name: 'Free AI Chatbot', path: '/ai/chatbot', isChatbot: true },
    { name: 'AI Tools (Free)', path: '/ai-tools', highlight: true },
    { name: 'Articles', path: '/articles' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Foods Database', path: '/foods' },
    { name: 'Diet Plans', path: '/diet-plans' },
    { name: 'Dietitians', path: '/nutritionist-services' }
  ];

  const roles: { role: UserRole; label: string; badge: string }[] = [
    { role: 'guest', label: 'Guest (Public)', badge: 'bg-stone-100 text-stone-700' },
    { role: 'free', label: 'Free Member', badge: 'bg-emerald-100 text-[#2D6A4F]' },
    { role: 'premium', label: 'Premium Member', badge: 'bg-[#F77F00]/20 text-[#C46500]' },
    { role: 'dietitian', label: 'Registered Dietitian', badge: 'bg-blue-100 text-blue-800' },
    { role: 'admin', label: 'Super Admin', badge: 'bg-purple-100 text-purple-800' }
  ];

  const currentRoleMeta = roles.find(r => r.role === user.role) || roles[1];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D4E4D0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-xl shadow-xs group-hover:scale-105 transition-transform">
              🌿
            </div>
            <div>
              <span className="font-serif-heading text-xl font-bold text-[#1A2E1A] tracking-tight block leading-tight">
                NutriWise <span className="text-[#2D6A4F]">USA</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#4A6741] font-semibold block">
                Evidence-Based Nutrition
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.pathname.startsWith(`${link.path}/`);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2D6A4F] text-white shadow-xs'
                      : link.isChatbot
                      ? 'bg-emerald-100 text-[#2D6A4F] hover:bg-emerald-200 border border-emerald-300 font-bold'
                      : link.highlight
                      ? 'text-[#2D6A4F] hover:bg-[#F0F4EF] font-bold'
                      : 'text-[#4A6741] hover:text-[#1A2E1A] hover:bg-[#F0F4EF]'
                  }`}
                >
                  {link.isChatbot ? (
                    <>
                      <span>🌿</span>
                      <span>{link.name}</span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-[#2D6A4F] text-white font-extrabold uppercase">
                        Free
                      </span>
                    </>
                  ) : (
                    <>
                      {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#F77F00]" />}
                      {link.name}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Global Search Button */}
          <Link
            to="/search"
            className="p-2 text-[#4A6741] hover:text-[#1A2E1A] hover:bg-[#F0F4EF] rounded-full transition-colors cursor-pointer"
            title="Search articles, foods, and recipes"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Role Preview Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] bg-[#F0F4EF] border border-[#D4E4D0] text-xs text-[#1A2E1A] font-medium hover:bg-[#E2ECE0] transition-colors cursor-pointer"
              title="Test application as different user roles"
            >
              <span className="w-2 h-2 rounded-full bg-[#52B788]"></span>
              <span className="hidden sm:inline text-stone-500 text-[11px]">Role:</span>
              <span className="font-semibold capitalize">{user.role}</span>
              <ChevronDown className="w-3 h-3 text-[#4A6741]" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-[14px] bg-white border border-[#D4E4D0] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1.5 text-[11px] font-bold text-[#8FAE8A] uppercase tracking-wider border-b border-[#F0F4EF] mb-1">
                  Preview as Role
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setUserRole(r.role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-[8px] transition-colors cursor-pointer ${
                      user.role === r.role ? 'bg-[#F0F4EF] font-bold text-[#2D6A4F]' : 'hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span>{r.label}</span>
                    {user.role === r.role && <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dashboard / Auth CTA */}
          {user.role === 'guest' ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {user.role === 'admin' ? (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="gap-1.5 border-purple-600 text-purple-700 bg-purple-50">
                    <Shield className="w-3.5 h-3.5" />
                    Admin Panel
                  </Button>
                </Link>
              ) : user.role === 'premium' ? (
                <Link to="/dashboard">
                  <Button variant="accent" size="sm" className="gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button variant="primary" size="sm" className="gap-1">
                    <User className="w-3.5 h-3.5" />
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A6741] hover:bg-[#F0F4EF] rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#D4E4D0] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-[10px] text-sm font-semibold text-[#1A2E1A] hover:bg-[#F0F4EF]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#F0F4EF] flex flex-col gap-2">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                My Health Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
