import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BRANDS, Brand } from '../data/brands';

interface MultipleChoiceProps {
  correctBrand: Brand | null;
  difficulty: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const MultipleChoice = ({ correctBrand, difficulty, onAnswer }: MultipleChoiceProps) => {
  const [options, setOptions] = useState<Brand[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!correctBrand) return;

    // Generate options: 1 correct + 3 random from same category or pool
    const pool = BRANDS.filter(b => b.id !== correctBrand.id);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const distractors = shuffled.slice(0, 3);
    
    const allOptions = [...distractors, correctBrand].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelectedId(null);
    setIsCorrect(null);
  }, [correctBrand]);

  const handleSelect = (brand: Brand) => {
    if (selectedId) return;
    
    const correct = brand.id === correctBrand?.id;
    setSelectedId(brand.id);
    setIsCorrect(correct);

    setTimeout(() => {
      onAnswer(correct);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {options.map((option) => (
        <button
          id={`option-${option.id}`}
          key={option.id}
          onClick={() => handleSelect(option)}
          disabled={!!selectedId}
          className={`p-6 neu-button-light dark:neu-button-dark text-lg font-bold transition-all ${
            selectedId === option.id 
              ? (isCorrect ? "bg-green-500! text-white" : "bg-red-500! text-white")
              : (selectedId && option.id === correctBrand?.id ? "bg-green-500/50! text-white" : "")
          }`}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};
