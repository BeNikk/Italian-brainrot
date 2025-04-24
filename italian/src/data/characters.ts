import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 1,
    name: "La Vaca Saturno Saturnita",
    powerLevel: 85,
    image: "/Saturno_Saturnita.webp",
    audio: "/saturno.mp3",
    description: "It is a character with a person's feet and a cow's head on Saturn 's body. It appears at the festival site, and every time I take a step, it looks like a dance and makes people enjoy it. Like the above Lyrili Larila"
  },
  {
    id: 2,
    name: "Brr Brr Patapim",
    powerLevel: 83,
    image: "/patapim.webp",
    audio: "/prrprrpatapim.mp3",
    description: "A character with the head of a cozu monkey on the limbs of the tree . Those who have invaded the forest while guarding the forest are attacked by the roots of the tree, or make a trap and attack. His real name is Pata Pim, and the previous Berr berr is the sound of the blue frog"
  },
  {
    id: 3,
    name: "Bombardiro Crocodilo",
    powerLevel: 91,
    image: "/crocodilo.webp",
    audio: "/bombardilo-crocodilo.mp3",
    description: "It is a character that synthesizes bombers and crocodiles . The next famous character after Tralalo Tralala in Italian Brainrot. It is said that they bomb the children in the Gaza district of Palestine because they do not believe Allah. "
  },
  {
    id: 4,
    name: "U Din Din Din Din Dun Ma Din Din Din Dun",
    powerLevel: 88,
    image: "/dindun.webp",
    audio: "/dindindun.mp3",
    description: "It is a character that combines the muscular body that reminiscent of a bodybuilder on the orange head. The image is used by one of the above. It doesn't appear much from the vs. video, but it comes out as a strong man, and the head of Tung Tung Tung Sahur made a slightly gold"
  },
  {
    id: 5,
    name: "Garamaraman dan Garamamaraman",
    powerLevel: 80,
    image: "/garam.webp",
    audio: "/garamaraman.mp3",
    description: "It is a character that synthesizes a person's face and feet in the salt and honey complex. The name of the salt barrel is karamarahman, and the honey barrel is Madungdong. It is said to appear mainly during the period of Ramadan ."
  },
  {
    id: 6,
    name: "Lirilì Larilà",
    powerLevel: 92,
    image: "/Lirili_rili_ralila.webp",
    audio: "/lirililarila.mp3",
    description: "Elephant characters with cactuses wearing sandals. It is often described as using the clock that can stop the time in the battle. It is mainly expressed by avoiding the fight, but in the technical fight using elephant's unique physique and long nose, it shows the power of the strong."
  },
  {
    id: 7,
    name: "Tralalero Tralala",
    powerLevel: 86,
    image: "/tralalero.webp",
    audio: "/tralalero.mp3",
    description: "Shark characters with three legs on the beach with Nike sneakers."
  },
  {
    id: 8,
    name: "Trippi Troppi Troppi Trappa",
    powerLevel: 85,
    image: "/trippi.webp",
    audio: "/tripitropi.mp3",
    description: "There are two characters with the same name, with images that combine shrimp and cats and images of fat bears and fish share their names. The entire name is 'TripPi Troppi Troppa Trippa'."
  },
  {
    id: 9,
    name: "Tung Tung Tung Tung Tung Tung Tung Tung Tung Sahur",
    powerLevel: 90,
    image: "/tungtung.webp",
    audio: "/tungtung.mp3",
    description: "A brown tree sculpture character holding a baseball bat. The face resembles a Thomas locomotive, causing unpleasant valley ."
  },
  {
    id: 10,
    name: " Frigo Camelo Bufo Furdelo",
    powerLevel: 85,
    image: "/frigocamelo.webp",
    audio: "/frigocamelo.mp3",
    description: "It is a camel character with the torso of the refrigerator wearing shoes. A cold wind comes out of your mouth. Sometimes it is frozen. VS videos are often applied to Boneca Ambalabu"
  }
];

// Sound effects
export const soundEffects = {
  vs: "/versos.mp3",
  correct: "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3",
  wrong: "https://assets.mixkit.co/active_storage/sfx/132/132-preview.mp3",
  gameOver: "https://assets.mixkit.co/active_storage/sfx/561/561-preview.mp3",
  victory: "https://assets.mixkit.co/active_storage/sfx/213/213-preview.mp3",
  background: "https://assets.mixkit.co/active_storage/sfx/2265/2265-preview.mp3"
};

// Get random characters excluding used ones
export const getRandomCharacters = (excludeIds: number[] = []): [Character, Character] => {
  const availableCharacters = characters.filter(char => !excludeIds.includes(char.id));
  
  if (availableCharacters.length < 2) {
    // Reset if we've used all characters
    return getRandomCharacters([]);
  }
  
  const shuffled = [...availableCharacters].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
};

// Get a single random character excluding used ones
export const getRandomCharacter = (excludeIds: number[] = []): Character => {
  const availableCharacters = characters.filter(char => !excludeIds.includes(char.id));
  
  if (availableCharacters.length === 0) {
    // Reset if we've used all characters
    return getRandomCharacter([]);
  }
  
  const shuffled = [...availableCharacters].sort(() => Math.random() - 0.5);
  return shuffled[0];
};