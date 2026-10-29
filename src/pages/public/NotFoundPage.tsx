import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <PageWrapper title="Page Not Found (404)">
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F0F4EF] text-[#2D6A4F] flex items-center justify-center text-3xl font-bold mx-auto">
            🌿
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8FAE8A] block">
            404 Error
          </span>
          <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
            Page Not Found
          </h1>
          <p className="text-xs text-[#4A6741] leading-relaxed">
            The page you requested may have been moved or does not exist. Let's get you back to our healthy recipes and nutrition guides.
          </p>
          <div className="pt-4 flex items-center justify-center gap-2">
            <Link to="/">
              <Button variant="primary" size="md">
                <Home className="w-4 h-4" /> Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
