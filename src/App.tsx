import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import PlannerPage from "./pages/PlannerPage";
import SocialPage from "./pages/SocialPage";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
                <Navigation />
                <Routes>
                  <Route path="/focus" element={<FocusPage />} />
                  <Route path="/habits" element={<HabitPage />} />
                  <Route path="/planner" element={<PlannerPage />} />
                  <Route path="/social" element={<SocialPage />} />
                  <Route path="*" element={<Navigate to="/social" replace />} />
                </Routes>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;