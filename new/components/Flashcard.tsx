import React, { useState, useEffect, useRef } from 'react'
import '@/flash.css'


type FlashcardType = {
  question: string
  answer: string
  options: string[]
}

export default function Flashcard({ flashcard }: { flashcard: FlashcardType }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef<HTMLDivElement>(null);
  const backEl = useRef<HTMLDivElement>(null);

  function setMaxHeight() {
    const frontHeight = frontEl.current?.getBoundingClientRect().height ?? 0;
    const backHeight = backEl.current?.getBoundingClientRect().height ?? 0;
    setHeight(Math.max(frontHeight, backHeight, 100) + "px");
  }


  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map(option => {
            return <div className="flashcard-option" key={option}>{option}</div>
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}
