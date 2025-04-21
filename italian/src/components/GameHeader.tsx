import React from 'react';
import { motion } from 'framer-motion';
import { BrainIcon } from 'lucide-react';

const GameHeader: React.FC = () => {
  return (
    <motion.div 
      className="bg-black py-3 sm:py-4 px-4 sm:px-6 text-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 10 }}
    >
      <div className="flex items-center justify-center space-x-2 sm:space-x-3">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <BrainIcon size={32} className="text-neon-pink sm:w-10 sm:h-10" />
        </motion.div>
        
        <motion.h1 
          className="title-font text-3xl sm:text-4xl md:text-5xl font-bold"
          animate={{ 
            color: ['#ff00ff', '#00ffff', '#00ff00', '#ffff00', '#ff00ff'],
            textShadow: [
              '0 0 7px #ff00ff',
              '0 0 10px #00ffff',
              '0 0 7px #00ff00',
              '0 0 10px #ffff00',
              '0 0 7px #ff00ff'
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          ITALIAN BRAINROT
        </motion.h1>
        
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <BrainIcon size={32} className="text-neon-green sm:w-10 sm:h-10" />
        </motion.div>
      </div>
      
      <motion.div 
        className="text-white text-base sm:text-lg mt-1 italic"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Mamma mia, that's a spicy meme-a!
      </motion.div>
    </motion.div>
  );
};

export default GameHeader;