import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useStore';

export const ContactPage: React.FC = () => {
  const { showToast } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Your message has been sent to our support desk!', 'success');
  };

  return (
    <PageWrapper title="Contact Support & Dietitian Inquiries">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif-heading text-4xl font-bold text-[#1A2E1A]">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-[#4A6741] mt-2">
            Have questions about your meal plan, subscription, or dietitian appointments? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-white p-6 rounded-[24px] border border-[#E8EFE6] space-y-6">
            <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
              NutriWise USA Office
            </h3>

            <div className="space-y-4 text-xs text-[#4A6741]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A2E1A] block">Headquarters</strong>
                  <span>100 Montgomery St, Suite 1400<br />San Francisco, CA 94104</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A2E1A] block">Email Support</strong>
                  <span>hello@nutriwiseusa.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A2E1A] block">Dietitian Relations</strong>
                  <span>clinical@nutriwiseusa.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-8 rounded-[28px] border border-[#D4E4D0] shadow-sm">
            {sent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#2D6A4F] mx-auto" />
                <h3 className="font-bold text-base text-[#1A2E1A]">Message Received</h3>
                <p className="text-xs text-[#4A6741]">
                  Our nutrition support team typically responds within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                />

                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />

                <div>
                  <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">
                    How can we help?
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    className="w-full p-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs text-[#1A2E1A] focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full">
                  <Send className="w-3.5 h-3.5" /> Send Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
