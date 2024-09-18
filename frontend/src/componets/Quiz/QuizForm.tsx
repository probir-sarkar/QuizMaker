import { useForm, useFieldArray, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizInputs, quizSchema } from "./schema";
import AnsForm from "./AnsForm";
import { databases, ID } from "@/lib/appwrite";
import { useLoaderData } from "react-router-dom";
import { Models } from "appwrite";
import { Button, Input } from "@nextui-org/react";
import { X } from "lucide-react";

const QuizForm = () => {
  const user = useLoaderData() as Models.User<Models.Preferences>;
  const methods = useForm<QuizInputs>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      questions: [
        {
          question: "What is the capital of France?",
          answers: [
            { answer: "Paris", isCorrect: true },
            { answer: "London", isCorrect: false }
          ]
        }
      ]
    }
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = methods;

  const {
    fields: questionFields,
    append,
    remove: removeQuestion
  } = useFieldArray({
    control,
    name: "questions"
  });

  const addQuestion = () => {
    append({ question: "", answers: [{ answer: "", isCorrect: false }] });
  };

  const onSubmit: SubmitHandler<QuizInputs> = async (data) => {
    try {
      const result = await databases.createDocument(
        "quizzes", // databaseId
        "66e5939f00252ea7f160", // collectionId
        ID.unique(), // documentId
        { questions: JSON.stringify(data.questions), userId: user.$id }
      );

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white ">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {questionFields.map((questionField, questionIndex) => (
            <div key={questionField.id} className="mb-8 p-4 border rounded-md border-gray-200 relative">
              <Button
                isIconOnly
                color="danger"
                variant="light"
                className="absolute top-2 right-2"
                onClick={() => removeQuestion(questionIndex)}
              >
                <X />
              </Button>
              <h2 className="text-2xl font-bold mb-8">Question {questionIndex + 1}</h2>

              <div className="mb-4">
                <Input
                  type="text"
                  {...register(`questions.${questionIndex}.question`)}
                  label="Question"
                  isInvalid={!!errors.questions?.[questionIndex]?.question}
                  errorMessage={errors.questions?.[questionIndex]?.question?.message}
                  isClearable
                  isRequired
                  variant="underlined"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Answers</label>
                {/* Answers for each question */}
                <div className="space-y-4">
                  <AnsForm {...{ questionIndex }} />
                </div>
              </div>
            </div>
          ))}
          {/* Add/Remove Answer Buttons */}
          <div className="space-x-4">
            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Add Question
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700">
              Submit Quiz
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default QuizForm;
