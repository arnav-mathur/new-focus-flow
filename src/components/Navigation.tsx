import { Link, useLocation } from "react-router-dom";
import { Timer, Camera, Calendar, Users, Settings, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const mainLinks = [
    { to: "/focus", icon: Timer, label: "Focus Timer" },
    { to: "/habits", icon: Camera, label: "Habits" },
    { to: "/planner", icon: Calendar, label: "Planner" },
    { to: "/social", icon: Users, label: "Friends" },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-focus">
              FocusFlow
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System Theme
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Share Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'FocusFlow',
                      text: 'Check out FocusFlow - Your productivity companion!',
                      url: window.location.href,
                    }).catch(console.error);
                  }
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {mainLinks.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors flex flex-col items-center",
                  location.pathname === to
                    ? "text-focus"
                    : "text-gray-600 hover:text-focus"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{label}</span>
                {location.pathname === to && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-focus"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;