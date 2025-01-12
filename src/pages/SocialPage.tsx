import { WalkthroughTutorial } from "@/components/tutorial/WalkthroughTutorial";
import { HabitFeed } from "@/components/social/HabitFeed";

const SocialPage = () => {
  return (
    <div className="container mx-auto py-8">
      <WalkthroughTutorial />
      <HabitFeed />
    </div>
  );
};

export default SocialPage;