// NextJS POST route for generating flashcards
// @req: Request
// This route is responsible for generating flashcards based on the user's survey data and school data
// The flashcards are then translated to the selected language
// The translated flashcards are returned as the response

import {db} from "@/utils/db";
import {
  flashcardGenerationChain,
  flashcardParser,
} from "@/helpers/flashcards";
import { translateText } from "@/helpers/ts";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  // This is a POST request, so we need to parse the request body
  const body = await req.json();

  const { count } = body;

  const schoolData = await db.aLXSchool.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const school = schoolData;

  if (!school) {
    return new Response("School data not found", { status: 404 });
  }

  const { studentClass, term, topic, language, studentDetails } = school;

  let flashcardsResponse = await flashcardGenerationChain.invoke({
    studentDetails,
    topic, 
    term,
    studentClass,
    count,
    format_instructions: flashcardParser.getFormatInstructions(),
  });


  // Translate the flashcards
  const translatedFlashcards = await Promise.all(
    flashcardsResponse.map(async (card: any) => {
      const translatedQuestion = await translateText({ text: card.question });
      const translatedOptions = await Promise.all(
        card.options.map(async (option: any) => {
          return await translateText({ text: option });
        })
      );
      const translatedAnswer = await translateText({ text: card.answer });

  

      return {
        ...card,
        question: translatedQuestion.result,
        options: translatedOptions.map((option) => option.result),
        answer: translatedAnswer.result,
      };
    })
  );
  revalidatePath("/", "layout");
  return Response.json(translatedFlashcards);
}
