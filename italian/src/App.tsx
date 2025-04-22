import  { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useAudio from './hooks/useAudio';
import { getRandomCharacters, getRandomCharacter, soundEffects } from './data/characters';
import { GameState, Character } from './types';

// Components
import CharacterCard from './components/CharacterCard';
import BrainrotMeter from './components/BrainrotMeter';
import GameHeader from './components/GameHeader';
import GameResult from './components/GameResult';
import GameMessage from './components/GameMessage';

const MAX_ROUNDS = 10;

function App() {
  const { play, stop } = useAudio();
  const [usedCharacterIds, setUsedCharacterIds] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false); // New state for game start
  const [gameState, setGameState] = useState<GameState>({
    round: 1,
    characters: {
      left: null,
      right: null,
    },
    stage: 'intro',
    correctAnswers: 0,
    isGameOver: false,
    isVictory: false,
    message: '',
  });

  
  const startNewRound = useCallback((champion?: Character) => {
    let leftChar: Character;
    let rightChar: Character;

    if (champion) {
      // Keep the champion and get a new challenger
      leftChar = champion;
      rightChar = getRandomCharacter(usedCharacterIds);
      setUsedCharacterIds(prev => [...prev, rightChar.id]);
    } else {
      // Get two new characters
      [leftChar, rightChar] = getRandomCharacters(usedCharacterIds);
      setUsedCharacterIds(prev => [...prev, leftChar.id, rightChar.id]);
    }

    setGameState(prev => ({
      ...prev,
      round: champion ? prev.round + 1 : 1,
      characters: {
        left: leftChar,
        right: rightChar,
      },
      stage: 'leftReveal',
    }));
  }, [usedCharacterIds]);
  // Initialize the game after user interaction
  const startGame = useCallback(() => {
    setGameStarted(true);
    startNewRound();
  }, [startNewRound]);

  const handleRightReveal = useCallback(() => {
    const { left, right } = gameState.characters;
  
    if (!left || !right) return;
  
    // Stop any currently playing audio
    Howler.stop();
  
    // Play the left character's sound
    const leftSound = new Howl({
      src: [left.audio],
      html5: true,
      preload: true,
    });
  
    // Play the "vs" sound after the left character's sound ends
    leftSound.on('end', () => {
      const vsSound = new Howl({
        src: [soundEffects.vs],
        html5: true,
        preload: true,
      });
  
      // Play the right character's sound after the "vs" sound ends
      vsSound.on('end', () => {
        const rightSound = new Howl({
          src: [right.audio],
          html5: true,
          preload: true,
        });
        rightSound.play();
      });
  
      vsSound.play();
    });
  
    leftSound.play();
  
    // Immediately transition to the "choice" stage
    setGameState(prev => ({
      ...prev,
      stage: 'choice',
    }));
  }, [gameState.characters]);
  
  const handleSelection = useCallback(
    (selection: 'left' | 'right') => {
      const { left, right } = gameState.characters;
  
      if (!left || !right || gameState.stage !== 'choice') return;
  
      const leftStronger = left.powerLevel > right.powerLevel;
      const correctChoice =
        (selection === 'left' && leftStronger) ||
        (selection === 'right' && !leftStronger);
  
      if (correctChoice) {
        // Correct choice
        play(soundEffects.correct);
  
        const newCorrectAnswers = gameState.correctAnswers + 1;
        const isVictory = newCorrectAnswers >= MAX_ROUNDS;
        const champion = leftStronger ? left : right;
  
        setGameState(prev => ({
          ...prev,
          correctAnswers: newCorrectAnswers,
          stage: 'result',
          message: 'CORRECT!',
          isVictory,
          isGameOver: isVictory,
        }));
  
        // If not victory, set up the next round with the champion
        if (!isVictory) {
          setTimeout(() => {
            startNewRound(champion);
          }, 1000); // Short delay before starting the next round
        }
      } else {
        // Wrong choice
        play(soundEffects.wrong);
  
        setGameState(prev => ({
          ...prev,
          stage: 'result',
          message: 'WRONG!',
          isGameOver: true,
        }));
  
        // Play game over sound after a delay
        setTimeout(() => {
          play(soundEffects.gameOver);
        }, 1000);
      }
    },
    [gameState.characters, gameState.stage, gameState.correctAnswers, play, startNewRound]
  );
  // Restart the game
  const restartGame = useCallback(() => {
    setUsedCharacterIds([]);
    setGameState({
      round: 1,
      characters: {
        left: null,
        right: null,
      },
      stage: 'intro',
      correctAnswers: 0,
      isGameOver: false,
      isVictory: false,
      message: '',
    });

    stop();
    startNewRound();
  }, [startNewRound, stop]);

  // Effects to manage stage changes
  useEffect(() => {
    if (gameStarted && gameState.stage === 'leftReveal' && gameState.characters.left) {
      handleRightReveal();
    }
  }, [gameStarted, gameState.stage, gameState.characters.left, handleRightReveal]);

  // Determine if characters are winners or losers
  const getWinnerStatus = (position: 'left' | 'right'): boolean | undefined => {
    if (gameState.stage !== 'result' || !gameState.isGameOver) return undefined;

    const { left, right } = gameState.characters;
    if (!left || !right) return undefined;

    if (position === 'left') {
      return left.powerLevel > right.powerLevel;
    } else {
      return right.powerLevel > left.powerLevel;
    }
  };

  return (
    <div className="game-container min-h-screen overflow-hidden">
      {!gameStarted ? (
        <div className="flex items-center justify-center h-screen">
          <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-xl font-bold"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <GameHeader />

          <motion.div
            className="container mx-auto px-4 py-6"
            animate={{
              x: gameState.isGameOver && !gameState.isVictory
                ? [0, -5, 5, -5, 5, 0]
                : 0,
            }}
            transition={{
              duration: 0.3,
              repeat: gameState.isGameOver && !gameState.isVictory ? 5 : 0,
            }}
          >
            <BrainrotMeter
              correctAnswers={gameState.correctAnswers}
              maxAnswers={MAX_ROUNDS}
            />

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
              {/* Left Character */}
              {gameState.characters.left && (
                <CharacterCard
                  character={gameState.characters.left}
                  position="left"
                  isRevealed={gameState.stage !== 'intro'}
                  showPower={gameState.isGameOver}
                  isWinner={getWinnerStatus('left')}
                  onSelect={() => handleSelection('left')}
                  isSelectable={gameState.stage === 'choice'}
                />
              )}

              {/* Right Character */}
              {gameState.characters.right && (
                <CharacterCard
                  character={gameState.characters.right}
                  position="right"
                  isRevealed={
                    gameState.stage === 'rightReveal' ||
                    gameState.stage === 'choice' ||
                    gameState.stage === 'result'
                  }
                  showPower={gameState.isGameOver}
                  isWinner={getWinnerStatus('right')}
                  onSelect={() => handleSelection('right')}
                  isSelectable={gameState.stage === 'choice'}
                />
              )}
            </div>

            <div className="text-center mt-6">
              <motion.h2
                className="text-white text-2xl sm:text-3xl font-bold mb-4 text-outline"
                animate={{
                  scale: gameState.stage === 'choice' ? [1, 1.05, 1] : 1,
                  color:
                    gameState.stage === 'choice'
                      ? ['#ffffff', '#ffff00', '#ffffff']
                      : '#ffffff',
                }}
                transition={{
                  duration: 1.5,
                  repeat: gameState.stage === 'choice' ? Infinity : 0,
                  repeatType: 'reverse',
                }}
              >
                WHO'S STRONGER?
              </motion.h2>

              <motion.div
                className="text-[#ffff00] font-bold text-lg sm:text-xl"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Round {gameState.round}
              </motion.div>
            </div>

            <GameMessage message={gameState.message} />
          </motion.div>

          {gameState.isGameOver && (
            <GameResult
              isVictory={gameState.isVictory}
              score={gameState.correctAnswers}
              maxScore={MAX_ROUNDS}
              onRestart={restartGame}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;