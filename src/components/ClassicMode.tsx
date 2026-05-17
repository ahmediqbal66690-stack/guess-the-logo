import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brand } from '../data/brands';
import { X, Delete } from 'lucide-react';

interface ClassicModeProps {
  correctBrand: Brand | null;
  onAnswer: (isCorrect: boolean) => void;
}

export const ClassicMode = ({ correctBrand, onAnswer }: ClassicModeProps) => {
  const [input, setInput] = useState<string[]>([]);
  const [scrambled, setScrambled] = useState<{ letter: string; id: number }[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!correctBrand) return;

    const brandName = correctBrand.name.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const letters = brandName.split('').map((l, i) => ({ letter: l, id: i }));
    
    // Add random letters to fill up to 12
    const fillerCount = 12 - letters.length;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < fillerCount; i++) {
      letters.push({ 
        letter: alphabet.charAt(Math.floor(Math.random() * alphabet.length)), 
        id: letters.length + i 
      });
    }

    setScrambled(letters.sort(() => 0.5 - Math.random()));
    setInput([]);
    setIsError(false);
  }, [correctBrand]);

  const addLetter = (letterObj: { letter: string; id: number }) => {
    if (input.some(item => item === letterObj.id.toString())) return;
    const newInput = [...input, letterObj.id.toString()];
    setInput(newInput);
    checkResult(newInput);
  };

  const removeLetter = () => {
    if (input.length === 0) return;
    const newInput = input.slice(0, -1);
    setInput(newInput);
    setIsError(false);
  };

  const checkResult = (currentInput: string[]) => {
    const brandName = correctBrand?.name.toUpperCase().replace(/[^A-Z0-9]/g, '') || '';
    if (currentInput.length === brandName.length) {
      const result = currentInput.map(id => scrambled.find(s => s.id.toString() === id)?.letter).join('');
      if (result === brandName) {
        setTimeout(() => onAnswer(true), 400);
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setInput([]);
        }, 1000);
      }
    }
  };

  const brandNameClean = correctBrand?.name.toUpperCase().replace(/[^A-Z0-9]/g, '') || '';

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto">
      {/* Answer Slots */}
      <div className="flex justify-center flex-wrap gap-2 min-h-[48px]">
        {brandNameClean.split('').map((_, i) => {
          const letterId = input[i];
          const letter = letterId ? scrambled.find(s => s.id.toString() === letterId)?.letter : '';
          return (
            <div
              key={i}
              className={`w-10 h-12 flex items-center justify-center rounded-xl font-black text-xl border-2 transition-all ${
                isError ? "border-red-500 text-red-500 animate-shake" : "neu-card neu-pressed-light dark:neu-pressed-dark border-transparent"
              }`}
            >
              <AnimatePresence>
                {letter && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    {letter}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Keyboard letters */}
      <div className="grid grid-cols-6 gap-3">
        {scrambled.map((item) => {
          const isUsed = input.includes(item.id.toString());
          return (
            <button
              id={`letter-${item.id}`}
              key={item.id}
              onClick={() => addLetter(item)}
              disabled={isUsed}
              className={`w-full aspect-square flex items-center justify-center rounded-2xl font-bold text-lg transition-all ${
                isUsed ? "opacity-20 scale-90" : "neu-button-light dark:neu-button-dark"
              }`}
            >
              {item.letter}
            </button>
          );
        })}
        <button
          id="delete-letter"
          onClick={removeLetter}
          className="col-span-2 aspect-auto flex items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-800 font-bold opacity-60 hover:opacity-100 transition-all"
        >
          <Delete size={20} />
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};
