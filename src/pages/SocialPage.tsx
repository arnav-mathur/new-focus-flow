import { WalkthroughTutorial } from "@/components/tutorial/WalkthroughTutorial";
import { HabitFeed } from "@/components/social/HabitFeed";

const mockPosts = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    habitName: 'Morning Workout',
    imageUrl: '/placeholder.svg',
    timestamp: new Date(),
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Jane Smith',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    habitName: 'Reading',
    imageUrl: '/placeholder.svg',
    timestamp: new Date(),
  },
];

const SocialPage = () => {
  return (
    <div className="container mx-auto py-8">
      <WalkthroughTutorial />
      <HabitFeed posts={mockPosts} />
    </div>
  );
};

export default SocialPage;