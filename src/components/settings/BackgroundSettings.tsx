import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

const gradients = [
  { name: "Ocean Breeze", value: "bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50" },
  { name: "Sunset Vibes", value: "bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50" },
  { name: "Forest Dream", value: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" },
  { name: "Purple Haze", value: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50" }
];

const minimalist = [
  { name: "Clean White", value: "bg-white" },
  { name: "Soft Gray", value: "bg-gray-50" },
  { name: "Light Neutral", value: "bg-neutral-50" }
];

const animations = [
  { name: "Gentle Pulse", value: "animate-pulse bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" },
  { name: "Soft Wave", value: "animate-pulse bg-gradient-to-br from-green-50 via-teal-50 to-blue-50" }
];

const artwork = [
  { name: "Abstract Pattern", value: "bg-[url('/placeholder.svg')] bg-repeat bg-opacity-10" },
  { name: "Geometric", value: "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 bg-opacity-50" }
];

export const BackgroundSettings = () => {
  const [selectedCategory, setSelectedCategory] = useState("gradients");
  const [selectedBackground, setSelectedBackground] = useState(gradients[0].value);

  const categories = {
    gradients,
    minimalist,
    animations,
    artwork
  };

  const handleBackgroundChange = (value: string) => {
    setSelectedBackground(value);
    const root = document.documentElement;
    // Remove all existing background classes
    root.className = root.className.replace(/bg-\S+/g, '');
    // Add new background class
    root.classList.add(...value.split(' '));
    // Store the preference
    localStorage.setItem('app-background', value);
  };

  useEffect(() => {
    const savedBackground = localStorage.getItem('app-background');
    if (savedBackground) {
      handleBackgroundChange(savedBackground);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Background Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize the app background to match your style
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Background Style
          </label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gradients">Colorful Gradients</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="animations">Fun Animations</SelectItem>
              <SelectItem value="artwork">Artwork</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Background Option
          </label>
          <Select
            value={selectedBackground}
            onValueChange={handleBackgroundChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select background" />
            </SelectTrigger>
            <SelectContent>
              {categories[selectedCategory as keyof typeof categories].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-32 rounded-lg border" style={{ background: 'var(--background)' }}>
        <div className={`w-full h-full rounded-lg ${selectedBackground}`}>
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            Preview
          </div>
        </div>
      </div>
    </div>
  );
};