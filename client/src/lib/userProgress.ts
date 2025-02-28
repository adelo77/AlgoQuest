import { UserProgress } from "./achievements";

const STORAGE_KEY = "algorithm_progress";

export function getUserProgress(): UserProgress {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    completedAlgorithms: [],
    achievements: []
  };
}

export function updateUserProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

export function markAlgorithmComplete(algorithmId: string): UserProgress {
  const currentProgress = getUserProgress();
  if (!currentProgress.completedAlgorithms.includes(algorithmId)) {
    const updatedProgress = {
      ...currentProgress,
      completedAlgorithms: [...currentProgress.completedAlgorithms, algorithmId]
    };
    return updateUserProgress(updatedProgress);
  }
  return currentProgress;
}

export function addAchievements(newAchievements: string[]): UserProgress {
  const currentProgress = getUserProgress();
  const updatedProgress = {
    ...currentProgress,
    achievements: [...new Set([...currentProgress.achievements, ...newAchievements])]
  };
  return updateUserProgress(updatedProgress);
}
