import { useEffect } from "react";
import { Achievement, achievements } from "@/lib/achievements";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface AchievementDisplayProps {
  userProgress: {
    completedAlgorithms: string[];
    achievements: string[];
  };
}

export function AchievementDisplay({ userProgress }: AchievementDisplayProps) {
  const { toast } = useToast();

  useEffect(() => {
    const earnedAchievements = achievements.filter(
      (achievement) => userProgress.achievements.includes(achievement.id)
    );

    // Show the most recent achievement
    const lastAchievement = earnedAchievements[earnedAchievements.length - 1];
    if (lastAchievement) {
      toast({
        title: "New Achievement Unlocked! 🎉",
        description: `${lastAchievement.name} - ${lastAchievement.description}`,
        duration: 5000,
      });
    }
  }, [userProgress.achievements]);

  return (
    <div className="p-4 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Achievements</h2>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                userProgress.achievements.includes(achievement.id)
                  ? "bg-primary/10"
                  : "bg-muted/50 opacity-60"
              }`}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
