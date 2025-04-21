import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  onSelectLeft: () => void;
  onSelectRight: () => void;
  round: number;
  isChoiceEnabled: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onSelectLeft, 
  onSelectRight, 
  round,
  isChoiceEnabled
}) => {
  return (
    <div className="my-6 text-center">
      <motion.h2 
        className="text-white text-3xl font-bold mb-4 text-outline"
        animate={{ 
          scale: isChoiceEnabled ? [1, 1.05, 1] : 1,
          color: isChoiceEnabled ? ['#ffffff', '#ffff00', '#ffffff'] : '#ffffff'
        }}
        transition={{ duration: 1.5, repeat: isChoiceEnabled ? Infinity : 0, repeatType: "reverse" }}
      >
        WHO'S STRONGER?
      </motion.h2>
      
      <motion.div 
        className="text-neon-yellow font-bold text-xl mb-6"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Round {round}
      </motion.div>
      
      <div className="flex justify-center space-x-6">
        <motion.button
          className={`flex items-center space-x-2 bg-neon-pink py-2 px-6 rounded-full 
            ${isChoiceEnabled ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
          whileHover={isChoiceEnabled ? { scale: 1.05 } : {}}
          whileTap={isChoiceEnabled ? { scale: 0.95 } : {}}
          onClick={isChoiceEnabled ? onSelectLeft : undefined}
          disabled={!isChoiceEnabled}
        >
          <ArrowLeft size={20} />
          <span className="font-bold">LEFT</span>
        </motion.button>
        
        <motion.button
          className={`flex items-center space-x-2 bg-neon-blue py-2 px-6 rounded-full 
            ${isChoiceEnabled ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
          whileHover={isChoiceEnabled ? { scale: 1.05 } : {}}
          whileTap={isChoiceEnabled ? { scale: 0.95 } : {}}
          onClick={isChoiceEnabled ? onSelectRight : undefined}
          disabled={!isChoiceEnabled}
        >
          <span className="font-bold">RIGHT</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default GameControls;