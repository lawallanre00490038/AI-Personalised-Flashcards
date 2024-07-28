import React from 'react'
import {ModalForm} from './ModalForm'

const Navbar = () => {
  return (
    <nav className='px-10 py-2 h-[50px]'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Flashcards</h1>
        <div>
        <div className='transition-all font-bold py-2 px-4 rounded max-w-[200px]'>
          <ModalForm open ='Generate Flashcards' />
        </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar