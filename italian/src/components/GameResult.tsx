import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy } from 'lucide-react';
import useAudio from '../hooks/useAudio';
import { soundEffects } from '../data/characters';

interface GameResultProps {
  isVictory: boolean;
  score: number;
  maxScore: number;
  onRestart: () => void;
}

const GameResult: React.FC<GameResultProps> = ({ isVictory, score, maxScore, onRestart }) => {
  const { play } = useAudio();
  
  useEffect(() => {
    play(isVictory ? soundEffects.victory : soundEffects.gameOver);
  }, [isVictory, play]);

  return (
    <motion.div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4
        ${isVictory ? 'bg-gradient-to-br from-[#00ff00]/80 to-[#00ffff]/80' : 'bg-gradient-to-br from-[#ff0000]/80 to-black/80'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`relative bg-black bg-opacity-80 rounded-xl p-8 max-w-md w-full text-center border-4
          ${isVictory ? 'border-[#00ff00]' : 'border-[#ff0000]'}`}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ 
          scale: 1, 
          y: 0,
          x: isVictory ? [0, -5, 5, -5, 0] : [0, -10, 10, -10, 10, -5, 5, 0],
        }}
        transition={{ 
          duration: 0.5,
          x: {
            duration: isVictory ? 0.5 : 0.8,
            repeat: isVictory ? 1 : 2
          }
        }}
      >
        {isVictory ? (
          <>
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 0.95, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h2 className="title-font text-[#00ff00] text-4xl md:text-5xl mb-4 text-outline">
                YOU ARE THE BRAINROT GOD
              </h2>
            </motion.div>
            
            <div className="flex justify-center my-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Trophy size={80} className="text-[#ff00ff]" />
              </motion.div>
            </div>
            
            <p className="text-white text-xl mb-6">
              You've reached the maximum level of <span className="text-[#ff00ff] font-bold">BRAINROT</span>!
            </p>
          </>
        ) : (
          <>
            <motion.div
              className="animate-wild"
              animate={{ 
                scale: [1, 1.2, 0.9, 1.1, 1],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <h2 className="title-font text-[#ff0000] text-4xl md:text-5xl mb-4 text-outline">
                GAME OVER
              </h2>
            </motion.div>
            
            <div className="flex justify-center my-6">
              <motion.div
                animate={{ 
                  rotate: [-10, 10, -10],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Zap size={80} className="text-[#ffff00]" />
              </motion.div>
            </div>
            
            <p className="text-white text-xl mb-4">
              Your brain wasn't rotten enough!
            </p>
            
            <p className="text-[#00ffff] text-lg mb-6">
              You scored: <span className="font-bold text-neon-pink">{score}/{maxScore}</span>
            </p>
          </>
        )}
        
        <motion.button
          className="bg-[#ffff00] text-black font-bold text-lg py-3 px-8 rounded-full hover:bg-opacity-80 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
        >
          PLAY AGAIN
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GameResult;