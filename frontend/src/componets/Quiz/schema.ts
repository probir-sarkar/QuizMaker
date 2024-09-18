import z from "zod";

export const quizSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        answers: z
          .array(
            z.object({
              answer: z.string().min(1, "Answer is required"),
              isCorrect: z.boolean()
            })
          )
          .min(2, "At least two answers are required")
      })
    )
    .min(1, "At least one question is required")
});

export type QuizInputs = z.infer<typeof quizSchema>;
