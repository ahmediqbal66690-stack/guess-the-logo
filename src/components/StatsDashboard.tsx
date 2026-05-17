import React from 'react';
import { motion } from 'motion/react';
import { X, Award, CheckCircle2, History, Timer, TrendingUp } from 'lucide-react';

interface StatsDashboardProps {
  stats: {
    totalGames: number;
    correctAnswers: number;
    highestStreak: number;
    bestTime: number;
  };
  milestones: string[];
  onClose: () => void;
}

export const StatsDashboard = ({ stats, milestones, onClose }: StatsDashboardProps) => {
  return (
    <div className="w-full min-h-[500px] neu-card neu-card-light dark:neu-card-dark p-8 flex flex-col gap-8 relative overflow-hidden">
      <button 
        id="close-stats"
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors opacity-60"
      >
        <X size={24} />
      </button>

      <h2 className="text-3xl font-black mb-2">Performance Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard icon={<History size={16}/>} label="Total Guesses" value={stats.correctAnswers} />
        <StatCard icon={<TrendingUp size={16}/>} label="Best Streak" value={stats.highestStreak} />
        <StatCard icon={<Timer size={16}/>} label="Fastest Guess" value={`${stats.bestTime === 99 ? '-' : stats.bestTime}s`} />
        <StatCard icon={<Award size={16}/>} label="Milestones" value={milestones.length} />
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} /> Unlocked Milestones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.length === 0 ? (
            <div className="col-span-2 text-center py-12 opacity-40 italic">
              Keep playing to unlock achievements!
            </div>
          ) : (
            milestones.map((milestone) => (
              <motion.div
                key={milestone}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-2xl flex items-center gap-3"
              >
                <div className="text-indigo-600 bg-white dark:bg-slate-900 p-2 rounded-lg">
                  <Award size={18} />
                </div>
                <span className="font-bold">{milestone}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-white/5 flex flex-col gap-1">
    <div className="flex items-center gap-2 opacity-40 text-[10px] font-bold uppercase tracking-wider">
      {icon} {label}
    </div>
    <div className="text-2xl font-black">{value}</div>
  </div>
);
