"use client";

import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from '@/components/FlashcardLists';
import Spinner from "@/components/Spinner";
import '@/flash.css'
import axios from 'axios'
import { DEFAULT_FLASHCARDS_COUNT } from '@/utils/constants';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(DEFAULT_FLASHCARDS_COUNT)

  const categoryEl = useRef()
  const amountEl = useRef()

  async function getFlashcards() {
    try {
      setLoading(true)
      const response = await axios.post('api/flashcards', {count: count});
      console.log(response.data)
      setFlashcards(response.data);
      console.log(response.status)

      if (response.status !== 200){
        throw new Error(`API request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFlashcards()
  }, [])

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center text-md">
          <Spinner loading={loading} />
          <p className="ml-4 text-gray-800">Preparing your flashcards...</p>
        </div>
      ) : (
        <div className="container flex flex-col">
          <div className="flex justify-between h-12 mb-4 md:mb-4 max-w-[400px]">
            <form
              className="flex sm:flex-col md:flex-row md:gap-y-1 gap-x-2 sm:gap-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                getFlashcards();
              }}
            >
              <input
                type="number"
                min={2}
                max={20}
                placeholder="Number of Flashcards"
                defaultValue={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="p-4 overflow-hidden h-[100%] rounded-l-lg"
              />
              <button
                type="submit"
                className="bg-green-500 px-2 md:px-4 text-xs md:text-md h-[100%] rounded-none rounded-r-lg"
              >
                Regenerate Flashcards
              </button>
            </form>
          </div>
          <FlashcardList flashcards={flashcards} />
        </div>
      )}
    </>
  );
}

export default App;
