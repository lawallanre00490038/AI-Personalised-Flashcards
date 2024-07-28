import React from 'react'
import Flashcard from './Flashcard'
import {FlashcardsTypes}  from '@/types/flashcards'
import { Flashcards} from '@/Flashcards'
 
function FlashcardList(flashcards: any) {
  return (
    <div>
      {
        flashcards.map((flashcard: any) => {
          return <Flashcard flashcard={flashcard} />
        })
      }
    </div>
  )
}

export default FlashcardList