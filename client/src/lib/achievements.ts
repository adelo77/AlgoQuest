import { Algorithm } from "./algorithms";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: (progress: UserProgress) => boolean;
}

export interface UserProgress {
  completedAlgorithms: string[];
  achievements: string[];
}

export const achievements: Achievement[] = [
  {
    id: "first-sort",
    name: "Sorting Novice",
    description: "Complete your first sorting algorithm visualization",
    icon: "🎯",
    criteria: (progress) => progress.completedAlgorithms.length >= 1
  },
  {
    id: "sort-master",
    name: "Sorting Master",
    description: "Complete all sorting algorithms",
    icon: "🏆",
    criteria: (progress) => 
      progress.completedAlgorithms.includes("bubble-sort") &&
      progress.completedAlgorithms.includes("quick-sort")
  },
  {
    id: "speed-learner",
    name: "Speed Learner",
    description: "Complete 5 algorithm visualizations",
    icon: "⚡",
    criteria: (progress) => progress.completedAlgorithms.length >= 5
  }
];

export function checkAchievements(progress: UserProgress): string[] {
  return achievements
    .filter(achievement => 
      !progress.achievements.includes(achievement.id) && 
      achievement.criteria(progress)
    )
    .map(achievement => achievement.id);
}
