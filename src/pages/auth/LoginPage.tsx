import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAppStore } from '../../store/useStore';
import { UserRole } from '../../types';
import { ShieldCheck, Mail, Lock, ArrowRight, User } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserRole, showToast } = useAppStore();

  const [email, setEmail] = useState('jordan.miller@example.com');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Welcome back to NutriWise USA!', 'success');
      navigate('/dashboard');
    }, 500);
  };

  const handleDemoLogin = (role: UserRole) => {
    setUserRole(role);
    showToast(`Signed in as demo ${role.toUpperCase()}`, 'info');
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <PageWrapper title="Sign In">
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-[28px] border border-[#D4E4D0] p-8 shadow-sm space-y-6">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xl shadow-xs">
                🌿
              </div>
            </Link>
            <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              Sign in to NutriWise
            </h1>
            <p className="text-xs text-[#4A6741] mt-1">
              Access your personalized meal plans, diary, and saved recipes.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A6741]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-[#2D6A4F] hover:underline font-semibold">
                  Forgot?
                </Link>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In to Account
            </Button>
          </form>

          {/* Quick Demo Role Logins */}
          <div className="pt-4 border-t border-[#F0F4EF] space-y-2">
            <div className="text-[11px] font-bold text-[#8FAE8A] uppercase tracking-wider text-center">
              Quick Test Sign-In (Click any role):
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoLogin('free')}
                className="p-2 rounded-[10px] bg-[#F0F4EF] hover:bg-[#E2ECE0] text-[#2D6A4F] font-bold text-center cursor-pointer transition-colors"
              >
                Free Member
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('premium')}
                className="p-2 rounded-[10px] bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-center cursor-pointer transition-colors border border-amber-200"
              >
                Premium Member
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('dietitian')}
                className="p-2 rounded-[10px] bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-center cursor-pointer transition-colors"
              >
                Dietitian Portal
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="p-2 rounded-[10px] bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-center cursor-pointer transition-colors"
              >
                Super Admin
              </button>
            </div>
          </div>

          <p className="text-xs text-center text-[#4A6741]">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#2D6A4F] font-bold hover:underline">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};
