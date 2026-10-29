import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper title="Reset Password">
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-[28px] border border-[#D4E4D0] p-8 shadow-sm space-y-6">
          <div>
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A6741] hover:text-[#2D6A4F] mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
            <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              Forgot Password
            </h1>
            <p className="text-xs text-[#4A6741] mt-1">
              Enter your email and we'll send you a secure password reset link.
            </p>
          </div>

          {submitted ? (
            <div className="p-5 rounded-[16px] bg-[#F0F4EF] border border-[#D4E4D0] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#2D6A4F] mx-auto" />
              <h3 className="font-bold text-sm text-[#1A2E1A]">Reset Link Sent</h3>
              <p className="text-xs text-[#4A6741]">
                If an account exists for {email}, a secure password reset email has been dispatched.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon={<Mail className="w-4 h-4" />}
              />

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Reset Link
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
