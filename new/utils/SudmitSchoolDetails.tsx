"use server";

import { newSchool } from "@/utils/studentDetailsToDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const submitStudentDetails = async (prevState: string, formData: any)  => {

    const selectedClass = formData["selectedClass"];
    const selectedTerm = formData["selectedTerm"];
    const selectedTopic = formData["selectedTopic"]
    const selectedLanguage = formData["selectedLanguage"]
    const selectedDetails = formData["selectedDetails"]
    
    let survey;

    try {
      survey = await newSchool({
        selectedClass,
        selectedTerm,
        selectedTopic,
        selectedLanguage,
        selectedDetails,
      });
      console.log(survey);
    } catch (error) {
      throw new Error("Error submitting student details");
    }

  revalidatePath("/", "layout");

  redirect("/flashcard");
};

