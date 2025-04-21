export interface Character {
    id: number;
    name: string;
    powerLevel: number;
    image: string;
    audio: string;
    description: string;
  }
  
  export interface GameState {
    round: number;
    characters: {
      left: Character | null;
      right: Character | null;
    };
    stage: 'intro' | 'leftReveal' | 'rightReveal' | 'choice' | 'result' | 'gameOver' | 'victory';
    correctAnswers: number;
    isGameOver: boolean;
    isVictory: boolean;
    message: string;
  }