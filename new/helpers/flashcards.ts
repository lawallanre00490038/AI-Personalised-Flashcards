// Write a detailed comment about the purpose of this file
// This file contains the helper functions for generating flashcards for a student based on their learning peculiarities.
// flashcardParser is a StructuredOutputParser that validates the output of the flashcardGenerationChain.
// flashcardGenerationChain is a RunnableSequence that generates flashcards based on the user's survey data and school data.
// FLASHCARD_GENERATION_PROMPT_TEMPLATE is a template string that defines the prompt for generating flashcards.
// The flashcard schema defines the structure of the flashcard objects.

import { z } from "zod";
import "dotenv/config";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { OpenAI, ChatOpenAI } from "@langchain/openai";
import {
  PromptTemplate,
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";

const flashcardSchema = z.array(
  z.object({
    question: z.string().describe("The question for the flashcard"),
    answer: z.string().describe("The correct answer to the question"),
    options: z
      .array(
        z
          .string()
          .describe(
            "The option must not include any additional prefix e.g. A., B., C., D."
          )
      )
      .describe(
        "Must be an array of options. Array must contain exactly four (4) options. One of the options must be the `correct_answer` provided."
      )
      .length(4),
  })
);

const FLASHCARD_GENERATION_PROMPT_TEMPLATE = `You are an experienced teacher skilled at developing personalized learning materials.
Generate an array of {count} flashcard questions and answers tailored to help a student learn about a topic {topic} based on the following information about their learning detailsabout the student:

- Student Details: {studentDetails}
- Topic: {topic}
- Term: {term}
- Class: {studentClass}

Each object in the array should contain a question, answer, and options following a multiple-choice question-answering style.

The questions and answers should:
- Cover key concepts, terms, processes, and examples
- Incorporate the student's learning style and preferences
- Align with the student's cognitive preferences
- Range from basic to advanced levels

The output must be and strictly be an array in a JSON format specified below.
{format_instructions}
`;

export const flashcardParser =
  StructuredOutputParser.fromZodSchema(flashcardSchema);

export const flashcardGenerationChain = RunnableSequence.from([
  ChatPromptTemplate.fromTemplate(FLASHCARD_GENERATION_PROMPT_TEMPLATE),
  new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama3-8b-8192",
  }),
  flashcardParser,
]);
