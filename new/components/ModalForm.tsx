"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { submitStudentDetails } from "@/utils/SudmitSchoolDetails";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'


type InitialState = {
  message: string;
};


interface ModalFormProps {
  open: string
}

export function ModalForm( {open}: ModalFormProps ) {


  const { register, handleSubmit } = useForm();
  const router = useRouter()

  const [state, setState] = useState<InitialState>({ message: "" });

  const onSubmit = async (data: any) => {
    const result = await submitStudentDetails(state.message, data);
    setState({ message: result.message });

    if (result.status === 200) {
      console.log(result.status);
      alert('Details submitted successfully');
      window.location.href = '/flashcard';
    }
    
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 transition-all active:bg-blue-600 hover:bg-blue-700 text-white">{open}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Choose Your Class:</label>
            <select className="p-2 border rounded-md" {...register('selectedClass')} required>
              <option>Select Class</option>
              <option value="Primary 4">Primary 4</option>
              <option value="Primary 5">Primary 5</option>
              <option value="Primary 6">Primary 6</option>
            </select>
          </div>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Choose Your Term:</label>
            <select className="p-2 border rounded-md" {...register('selectedTerm')} required>
              <option>Select Term</option>
              <option value="FirstTerm">First Term</option>
              <option value="SecondTerm">Second Term</option>
              <option value="ThirdTerm">Third Term</option>
            </select>
          </div>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Choose Your Topic:</label>
            <select className="p-2 border rounded-md" {...register('selectedTopic')} required>
              <option>Select Topic</option>
              <option value="Teeth">Teeth</option>
              <option value="Weather">Weather</option>
              <option value="Nature">Nature</option>
              <option value="Atom">Atom</option>
            </select>
          </div>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Define student&apos;s situation:</label>
            <textarea className="p-2 border rounded-md" {...register('selectedDetails')} required>
            </textarea>
          </div>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Choose your Preferred Language:</label>
            <select className="p-2 border rounded-md" {...register('selectedLanguage')} required>
              <option>Select your Preferred Language</option>
              <option value="en">English</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
            </select>
          </div>
            <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
