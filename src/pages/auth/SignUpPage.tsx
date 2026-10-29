import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAppStore } from '../../store/useStore';
import { Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserProfile, setUserRole, showToast } = useAppStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('balanced');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setUserRole('free');
      updateUserProfile({
        fullName: fullName || 'New Member',
        email: email || 'user@example.com',
        healthGoal: goal as any
      });
      setIsLoading(false);
      showToast('Welcome to NutriWise! Your free account is ready.', 'success');
      navigate('/dashboard');
    }, 600);
  };

  return (
    <PageWrapper title="Create Your Free Account">
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-[28px] border border-[#D4E4D0] p-8 shadow-sm space-y-6">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xl shadow-xs">
                🌿
              </div>
            </Link>
            <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              Create Your Free Account
            </h1>
            <p className="text-xs text-[#4A6741] mt-1">
              Start building evidence-based meal habits for your household.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jordan Miller"
              icon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password (min 8 characters)"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A6741] mb-1">
                Primary Nutrition Focus
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full h-12 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold text-[#1A2E1A]"
              >
                <option value="balanced">Balanced Vitality & Gut Diversity</option>
                <option value="weight_management">Sustainable Weight Management</option>
                <option value="muscle">Lean Muscle & Athletic Fuel</option>
                <option value="family">Family Budget Meal Prep</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Get Started Free
            </Button>
          </form>

          <p className="text-xs text-center text-[#4A6741]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2D6A4F] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};
