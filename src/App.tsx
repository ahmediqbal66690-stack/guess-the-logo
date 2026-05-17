import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameEngine } from './hooks/useGameEngine';
import { ThemeToggle } from './components/ThemeToggle';
import { LogoDisplay } from './components/LogoDisplay';
import { MultipleChoice } from './components/MultipleChoice';
import { ClassicMode } from './components/ClassicMode';
import { StatsDashboard } from './components/StatsDashboard';
import { Trophy, Zap, Clock, Repeat, Settings, BarChart3 } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [showStats, setShowStats] = React.useState(false);
  const game = useGameEngine();

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-[#e0e5ec] dark:bg-[#1a1a1a] text-slate-800 dark:text-slate-200 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <div className="p-3 neu-card neu-card-light dark:neu-card-dark text-indigo-600">
              <Trophy size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">LogoQuest</h1>
              <p className="text-xs opacity-60">Zero-Lag Edition</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <button 
              id="stats-btn"
              onClick={() => setShowStats(!showStats)}
              className="p-3 neu-button-light dark:neu-button-dark"
            >
              <BarChart3 size={20} />
            </button>
            <ThemeToggle isDarkMode={isDarkMode} toggle={() => setIsDarkMode(!isDarkMode)} />
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 neu-card neu-card-light dark:neu-card-dark flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Score</span>
            <span className="text-2xl font-black text-indigo-600">{game.score}</span>
          </div>
          <div className="p-4 neu-card neu-card-light dark:neu-card-dark flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Streak</span>
            <div className="flex items-center gap-1">
              <Zap size={16} className="text-amber-500 fill-amber-500" />
              <span className="text-2xl font-black">{game.streak}</span>
            </div>
          </div>
          <div className="p-4 neu-card neu-card-light dark:neu-card-dark flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Timer</span>
            <div className="flex items-center gap-2">
              <Clock size={16} className={game.timeLeft < 5 ? "text-red-500 animate-pulse" : "text-indigo-600"} />
              <span className={`text-2xl font-black ${game.timeLeft < 5 ? "text-red-500" : ""}`}>{game.timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {showStats ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full h-full"
              >
                <StatsDashboard 
                  stats={game.stats} 
                  milestones={game.unlockedMilestones} 
                  onClose={() => setShowStats(false)} 
                />
              </motion.div>
            ) : game.isGameOver ? (
              <motion.div
                key="gameover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full flex flex-col items-center justify-center neu-card neu-card-light dark:neu-card-dark p-12 text-center"
              >
                <h2 className="text-5xl font-black mb-4 text-red-500">GAME OVER</h2>
                <p className="text-xl opacity-70 mb-8">You achieved a score of {game.score} with a streak of {game.streak}!</p>
                <button 
                  id="restart-btn"
                  onClick={game.restartGame}
                  className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Repeat size={20} />
                  Play Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="game"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-8"
              >
                {/* Logo Section */}
                <div className="flex justify-center">
                  <LogoDisplay brand={game.currentBrand} difficulty={game.difficulty} />
                </div>

                {/* Mode Selector */}
                <div className="flex justify-center">
                  <div className="p-1 neu-card neu-pressed-light dark:neu-pressed-dark flex gap-1">
                    {(['Multiple Choice', 'Classic'] as const).map((mode) => (
                      <button
                        id={`mode-${mode.replace(' ', '-')}`}
                        key={mode}
                        onClick={() => game.setGameMode(mode)}
                        className={`px-6 py-2 rounded-2xl text-sm font-bold transition-all ${
                          game.gameMode === mode 
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls Section */}
                <div className="min-h-[250px]">
                  {game.gameMode === 'Multiple Choice' ? (
                    <MultipleChoice 
                      correctBrand={game.currentBrand} 
                      difficulty={game.difficulty} 
                      onAnswer={game.handleAnswer} 
                    />
                  ) : (
                    <ClassicMode 
                      correctBrand={game.currentBrand} 
                      onAnswer={game.handleAnswer} 
                    />
                  )}
                </div>

                {/* Difficulty Selector */}
                <div className="flex justify-center items-center gap-4 text-xs opacity-50 uppercase tracking-widest font-bold">
                  <span>Difficulty</span>
                  <div className="flex gap-2">
                    {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
                      <button
                        id={`diff-${d}`}
                        key={d}
                        onClick={() => game.setDifficulty(d)}
                        className={`transition-colors ${game.difficulty === d ? "text-indigo-600 opacity-100" : "hover:opacity-100"}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="text-center text-[10px] opacity-40 uppercase tracking-[0.2em] py-8">
          Optimized Hardware Acceleration Enabled • Powered by Gemini
        </footer>
      </div>
    </div>
  );
}
