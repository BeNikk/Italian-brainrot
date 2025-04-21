import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  position: 'left' | 'right';
  isRevealed: boolean;
  showPower: boolean;
  onSelect?: () => void;
  isSelectable?: boolean;
  isWinner?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  position, 
  isRevealed, 
  showPower,
  onSelect,
  isSelectable,
  isWinner 
}) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      x: position === 'left' ? -100 : 100,
      rotateY: position === 'left' ? -30 : 30
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: { 
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    },
    winner: {
      scale: [1, 1.05, 1],
      boxShadow: ["0px 0px 0px rgba(255,255,0,0)", "0px 0px 20px rgba(255,255,0,0.8)", "0px 0px 0px rgba(255,255,0,0)"],
      transition: {
        repeat: Infinity,
        duration: 1.5
      }
    },
    loser: {
      opacity: 0.7,
      scale: 0.95,
      filter: "grayscale(50%)"
    }
  };

  const powerColors = [
    "bg-red-600", // 1-20
    "bg-orange-500", // 21-40
    "bg-yellow-400", // 41-60
    "bg-green-500", // 61-80
    "bg-blue-500"  // 81-100
  ];

  const getPowerColor = (power: number) => {
    const index = Math.min(Math.floor(power / 20), 4);
    return powerColors[index];
  };
  
  return (
    <motion.div
      className={`
        relative w-full max-w-[280px] sm:max-w-xs mx-auto 
        ${isWinner === true ? 'z-10' : ''}
        ${isSelectable ? 'cursor-pointer transform hover:scale-105 transition-transform' : ''}
      `}
      initial="hidden"
      animate={
        isRevealed 
          ? isWinner === true 
            ? "winner" 
            : isWinner === false 
              ? "loser" 
              : "visible" 
          : "hidden"
      }
      variants={variants}
      onClick={isSelectable ? onSelect : undefined}
    >
      <div className={`
        relative overflow-hidden rounded-xl border-4
        ${position === 'left' ? 'border-[##ff00ff]' : 'border-[#00ffff]'}
        ${isWinner === true ? 'shadow-[#ffff00]' : ''}
        ${isSelectable ? 'shadow-lg hover:shadow-xl' : ''}
        transform transition-all duration-300
      `}>
        <div className="relative h-48 sm:h-64 bg-black">
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-full object-contain"
          />
          
          {/* Character name overlay */}
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
            <h3 className="character-name text-xl sm:text-2xl text-center font-bold text-white">
              {character.name}
            </h3>
          </div>
          
          {/* Power level badge */}
          {showPower && (
            <motion.div 
              className={`absolute top-2 right-2 ${getPowerColor(character.powerLevel)} text-white text-base sm:text-lg font-bold px-3 py-1 rounded-full`}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [-5, 0, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {character.powerLevel}
            </motion.div>
          )}
        </div>
        
        {/* Character description */}
        <div className="p-2 sm:p-3 bg-gradient-to-b from-gray-900 to-black">
          <p className="text-white text-xs sm:text-sm italic">
            {character.description}
          </p>
        </div>

        {/* VS badge for right character */}
        {position === 'right' && !isRevealed && (
          <motion.div
            className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-neon-yellow text-black text-2xl sm:text-4xl font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full transform -rotate-12 shadow-neon-yellow">
              VS
            </div>
          </motion.div>
        )}

        {/* Selection indicator */}
        {isSelectable && (
          <motion.div
            className="absolute inset-0 bg-neon-yellow opacity-0 hover:opacity-20 transition-opacity rounded-xl"
            whileHover={{ scale: 1.02 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default CharacterCard;