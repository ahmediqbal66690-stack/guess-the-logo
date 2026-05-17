import { useState, useEffect, useCallback, useRef } from 'react';
import { BRANDS, Brand, getLogoUrl } from '../data/brands';

export const useGameEngine = () => {
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [gameMode, setGameMode] = useState<'Multiple Choice' | 'Classic'>('Multiple Choice');
  const [unlockedMilestones, setUnlockedMilestones] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalGames: 0,
    correctAnswers: 0,
    highestStreak: 0,
    bestTime: 99,
  });

  const nextBrandsQueue = useRef<Brand[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Persistence
  useEffect(() => {
    const savedStats = localStorage.getItem('logoQuestStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    const savedMilestones = localStorage.getItem('logoQuestMilestones');
    if (savedMilestones) {
      setUnlockedMilestones(JSON.parse(savedMilestones));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('logoQuestStats', JSON.stringify(stats));
    localStorage.setItem('logoQuestMilestones', JSON.stringify(unlockedMilestones));
  }, [stats, unlockedMilestones]);

  // Preloading logic
  const preloadNextBrands = useCallback(() => {
    const filteredBrands = BRANDS.filter(b => b.difficulty === difficulty);
    const shuffled = [...filteredBrands].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8); // Queue more
    nextBrandsQueue.current = selected;
    
    // Asynchronous background preloading with requestIdleCallback if available
    const preload = () => {
      selected.forEach(brand => {
        const img = new Image();
        img.src = getLogoUrl(brand.domain);
      });
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preload);
    } else {
      setTimeout(preload, 100);
    }
  }, [difficulty]);

  const startNewRound = useCallback(() => {
    if (nextBrandsQueue.current.length <= 2) {
      const remaining = BRANDS.filter(b => b.difficulty === difficulty && (!currentBrand || b.id !== currentBrand.id));
      const randomFill = [...remaining].sort(() => 0.5 - Math.random()).slice(0, 5);
      nextBrandsQueue.current = [...nextBrandsQueue.current, ...randomFill];
      
      // Preload the new additions
      randomFill.forEach(b => {
        const img = new Image();
        img.src = getLogoUrl(b.domain);
      });
    }
    
    const next = nextBrandsQueue.current.shift();
    if (next) {
      setCurrentBrand(next);
      setTimeLeft(15);
    }
  }, [difficulty, currentBrand]);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      handleAnswer(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isGameOver]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 2);
      setScore(s => s + 10 + timeBonus);
      setStreak(s => s + 1);
      setStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        highestStreak: Math.max(prev.highestStreak, streak + 1),
        bestTime: Math.min(prev.bestTime, 15 - timeLeft),
      }));
      
      // Unlock milestones
      if (streak + 1 === 5 && !unlockedMilestones.includes('Streak Master')) {
        setUnlockedMilestones(prev => [...prev, 'Streak Master']);
      }
    } else {
      setStreak(0);
      setIsGameOver(true);
      setStats(prev => ({ ...prev, totalGames: prev.totalGames + 1 }));
    }
    
    if (!isCorrect) return; // Wait for user to click restart if game over
    startNewRound();
  };

  const restartGame = () => {
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    startNewRound();
  };

  return {
    currentBrand,
    score,
    streak,
    timeLeft,
    isGameOver,
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    handleAnswer,
    restartGame,
    stats,
    unlockedMilestones,
  };
};
