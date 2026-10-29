import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toast } from '../ui/Toast';
import { FloatingChatbot } from '../shared/FloatingChatbot';
import { useAppStore } from '../../store/useStore';

interface PageWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  hideFooter?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  description,
  children,
  hideFooter = false
}) => {
  const { activeToast } = useAppStore();

  useEffect(() => {
    if (title) {
      document.title = `${title} | NutriWise USA`;
    } else {
      document.title = 'NutriWise USA — Health & Nutrition Platform';
    }
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1A2E1A]">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {!hideFooter && <Footer />}
      {activeToast && <Toast message={activeToast.message} type={activeToast.type} />}
      <FloatingChatbot />
    </div>
  );
};
