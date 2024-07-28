import Image from 'next/image'
import React from 'react'
import {ModalForm} from './ModalForm'

const Hero = () => {
  
  return (
    <section className='py-2 w-full h-[calc(100vh-100px)]'>
      <div className='md:grid grid-cols-2 bg-slate-300'>
        <div className='flex flex-col justify-center p-4'>
          <h1 className='text-xl font-bold col-span-1'>
            Transform Learning with AI-Powered Science Flashcards
          </h1>
          <span className='text-sm'>
            Unlock a New Way to Study and Master Primary Science Concepts
          </span>
          <div className='mt-8 transition-all font-bold py-2 px-4 rounded max-w-[200px]'>
            <ModalForm open ='Get Stated' />
          </div>
        </div>
        
        <div className='relative col-span-1 mt-8 md:mt-0 m-auto p-4'>
          <Image src='/hero.png' width={400} height={400} objectFit='square' className='w-full' alt='The hero'/>
        </div>
      </div>
    </section>
  )
}

export default Hero