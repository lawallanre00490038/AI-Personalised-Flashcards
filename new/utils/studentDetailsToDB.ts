"use server"

import {db} from '@/utils/db'

export const newSchool = async (schoolResponses:any) => {
    try {
      const school = await db.school.create({
          data: {
              studentClass: schoolResponses.selectedClass,
              term: schoolResponses.selectedTerm,
              topic: schoolResponses.selectedTopic,
              language: schoolResponses.selectedLanguage,
              studentDetails: schoolResponses.selectedDetails
          }
      }); 
        return school;
    } catch (error) {
        console.error('Error creating school:', error);
        throw error;
    }
    
}