import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BrainrotMeterProps {
  correctAnswers: number;
  maxAnswers: number;
}

const BrainrotMeter: React.FC<BrainrotMeterProps> = ({ correctAnswers, maxAnswers }) => {
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    if (correctAnswers > 0) {
      setPulse(true);
      const timeout = setTimeout(() => setPulse(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [correctAnswers]);

  const percentage = (correctAnswers / maxAnswers) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div className="flex items-center justify-between mb-2">
        <motion.h3 
          className="text-xl font-bold text-[#ff00ff] text-outline"
          animate={{ scale: pulse ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          BRAINROT METER
        </motion.h3>
        <span className="text-white font-bold">{correctAnswers}/{maxAnswers}</span>
      </div>
      
      <div className="h-8 bg-gray-900 rounded-full overflow-hidden border-2 border-neon-yellow">
        <motion.div 
          className="h-full brainrot-progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        >
          {percentage > 15 && (
            <div className="h-full flex items-center justify-center">
              <span className="text-black font-bold text-sm px-2">
                {correctAnswers > 0 ? `${Math.round(percentage)}% BRAINROT` : ''}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {percentage >= 50 && (
        <motion.div 
          className="mt-1 text-center text-sm text-neon-green font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {percentage >= 90 ? "MAXIMUM BRAINROT APPROACHING!" : "YOUR BRAIN IS ROTTING NICELY!"}
        </motion.div>
      )}
    </div>
  );
};

export default BrainrotMeter;