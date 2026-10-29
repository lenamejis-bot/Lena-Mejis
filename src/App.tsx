import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ArticlesPage } from './pages/public/ArticlesPage';
import { ArticleDetailPage } from './pages/public/ArticleDetailPage';
import { RecipesPage } from './pages/public/RecipesPage';
import { RecipeDetailPage } from './pages/public/RecipeDetailPage';
import { FoodsPage } from './pages/public/FoodsPage';
import { FoodDetailPage } from './pages/public/FoodDetailPage';
import { DietPlansPage } from './pages/public/DietPlansPage';
import { DietPlanDetailPage } from './pages/public/DietPlanDetailPage';
import { DietitianServicesPage } from './pages/public/DietitianServicesPage';
import { DietitianProfilePage } from './pages/public/DietitianProfilePage';
import { BookingPage } from './pages/public/BookingPage';
import { SearchPage } from './pages/public/SearchPage';
import { SubscriptionPlansPage } from './pages/public/SubscriptionPlansPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { FAQPage } from './pages/public/FAQPage';
import { MedicalDisclaimerPage } from './pages/public/MedicalDisclaimerPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { TermsPage } from './pages/public/TermsPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// AI Tools
import { AIToolsHubPage } from './pages/ai/AIToolsHubPage';
import { ChatbotPage } from './pages/ai/ChatbotPage';
import { MealPlanGeneratorPage } from './pages/ai/MealPlanGeneratorPage';
import { RecipeGeneratorPage } from './pages/ai/RecipeGeneratorPage';
import { GroceryPlannerPage } from './pages/ai/GroceryPlannerPage';
import { PhotoAnalyzerPage } from './pages/ai/PhotoAnalyzerPage';
import { LabelScannerPage } from './pages/ai/LabelScannerPage';

// Dashboard
import { UserDashboard } from './pages/dashboard/UserDashboard';
import { FoodDiaryPage } from './pages/dashboard/FoodDiaryPage';
import { ProgressPage } from './pages/dashboard/ProgressPage';
import { SavedContentPage } from './pages/dashboard/SavedContentPage';
import { AppointmentsPage } from './pages/dashboard/AppointmentsPage';
import { DashboardSettingsPage } from './pages/dashboard/DashboardSettingsPage';

// Auth
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Admin
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminArticles } from './pages/admin/AdminArticles';
import { AdminRecipes } from './pages/admin/AdminRecipes';
import { AdminFoods } from './pages/admin/AdminFoods';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAISettings } from './pages/admin/AdminAISettings';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
        <Route path="/foods" element={<FoodsPage />} />
        <Route path="/foods/:slug" element={<FoodDetailPage />} />
        <Route path="/diet-plans" element={<DietPlansPage />} />
        <Route path="/diet-plans/:slug" element={<DietPlanDetailPage />} />
        <Route path="/nutritionist-services" element={<DietitianServicesPage />} />
        <Route path="/nutritionist-services/:id" element={<DietitianProfilePage />} />
        <Route path="/nutritionist-services/:id/book" element={<BookingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/subscription-plans" element={<SubscriptionPlansPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/medical-disclaimer" element={<MedicalDisclaimerPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />

        {/* AI Tools */}
        <Route path="/ai-tools" element={<AIToolsHubPage />} />
        <Route path="/ai/chatbot" element={<ChatbotPage />} />
        <Route path="/ai/meal-plan-generator" element={<MealPlanGeneratorPage />} />
        <Route path="/ai/recipe-generator" element={<RecipeGeneratorPage />} />
        <Route path="/ai/grocery-planner" element={<GroceryPlannerPage />} />
        <Route path="/ai/photo-analyzer" element={<PhotoAnalyzerPage />} />
        <Route path="/ai/label-scanner" element={<LabelScannerPage />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/meal-plan" element={<DietPlanDetailPage />} />
        <Route path="/dashboard/diary" element={<FoodDiaryPage />} />
        <Route path="/dashboard/progress" element={<ProgressPage />} />
        <Route path="/dashboard/grocery-list" element={<GroceryPlannerPage />} />
        <Route path="/dashboard/saved" element={<SavedContentPage />} />
        <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
        <Route path="/dashboard/settings" element={<DashboardSettingsPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/articles" element={<AdminArticles />} />
        <Route path="/admin/recipes" element={<AdminRecipes />} />
        <Route path="/admin/foods" element={<AdminFoods />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/ai-settings" element={<AdminAISettings />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
