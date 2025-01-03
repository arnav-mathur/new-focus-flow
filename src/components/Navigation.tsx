import { Link, useLocation } from "react-router-dom";
import { Timer, Camera, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: "/focus", icon: Timer, label: "Focus Timer" },
    { to: "/habits", icon: Camera, label: "Habits" },
    { to: "/planner", icon: Calendar, label: "Planner" },
    { to: "/social", icon: Users, label: "Friends" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/50 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-focus">
            FocusFlow
          </Link>
          
          <div className="flex space-x-4">
            {links.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === to
                    ? "text-focus"
                    : "text-gray-600 hover:text-focus"
                )}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
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
      </div>
    </nav>
  );
};

export default Navigation;