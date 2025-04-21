import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameMessageProps {
  message: string;
  isError?: boolean;
  duration?: number;
}

const GameMessage: React.FC<GameMessageProps> = ({ 
  message, 
  isError = false,
  duration = 2000
}) => {
  const [isVisible, setIsVisible] = useState(!!message);
  
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, duration]);
  
  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div 
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`
            px-6 py-3 rounded-lg shadow-lg text-xl font-bold
            ${isError 
              ? 'bg-italian-red text-white' 
              : 'bg-neon-green text-black'}
          `}>
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameMessage;