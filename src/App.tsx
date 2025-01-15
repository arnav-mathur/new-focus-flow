import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import PlannerPage from "./pages/PlannerPage";
import SocialPage from "./pages/SocialPage";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => {
  // Load saved background on mount
  React.useEffect(() => {
    const savedBackground = localStorage.getItem('app-background');
    if (savedBackground) {
      document.documentElement.classList.add(...savedBackground.split(' '));
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/focus" element={
                <div className="min-h-screen">
                  <Navigation />
                  <FocusPage />
                </div>
              } />
              <Route path="/habits" element={
                <div className="min-h-screen">
                  <Navigation />
                  <HabitPage />
                </div>
              } />
              <Route path="/planner" element={
                <div className="min-h-screen">
                  <Navigation />
                  <PlannerPage />
                </div>
              } />
              <Route path="/social" element={
                <div className="min-h-screen">
                  <Navigation />
                  <SocialPage />
                </div>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;