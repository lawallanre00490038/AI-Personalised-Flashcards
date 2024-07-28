// components/FlashcardList.tsx

import React from 'react';
import Flashcard from './Flashcard';
import '@/flash.css';

interface Flashcard {
  question: string;
  answer: string;
  options: string[];
}

interface FlashcardListProps {
  flashcards: Flashcard[];
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards }) => {
  return (
    <div className="card-grid mt-4 md:mt-0">
      {flashcards.map((flashcard, index) => (
        <Flashcard flashcard={flashcard} 
        key={index} 
        />
      ))}
    </div>
  );
};

export default FlashcardList;
