import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { QuizInputs } from "./schema";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";


const AnsForm = ({ questionIndex }: { questionIndex: number }) => {
  const methods = useFormContext<QuizInputs>();
  const {
    register,
    formState: { errors },
    control
  } = methods;

  const {
    fields: answerFields,
    append,
    remove
  } = useFieldArray({
    control: methods.control,
    name: `questions.${questionIndex}.answers`
  });

  const addAnswer = () => {
    append({ answer: "", isCorrect: false });
  };

  const removeAnswer = (answerIndex: number) => {
    remove(answerIndex);
  };
  return (
    // <AnimatePresence>
    <div className="space-y-4">
      {/* <AnimatePresence> */}
      {answerFields?.map((answerField, answerIndex) => (
        <div
          key={answerIndex}
          className="flex space-x-2"
        >
          <Button isIconOnly color="danger" variant="light" className="mt-4" onClick={() => removeAnswer(answerIndex)}>
            <X />
          </Button>
          <Input
            type="text"
            label={`Answer ${answerIndex + 1}`}
            {...register(`questions.${questionIndex}.answers.${answerIndex}.answer`)}
            isInvalid={!!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.answer}
            errorMessage={errors.questions?.[questionIndex]?.answers?.[answerIndex]?.answer?.message}
            variant="underlined"
            isClearable
          />
          {/* <label className="flex items-center space-x-2"> */}
          <div className="pt-8">
            <Controller
              name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  isSelected={field.value}
                  onValueChange={field.onChange} // Use field.onChange for controlled behavior
                  isInvalid={!!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.isCorrect}
                >
                  Correct
                </Checkbox>
              )}
            />
          </div>
        </div>
      ))}
      {/* </AnimatePresence> */}

      <Button fullWidth type="button" size="lg" variant="bordered" radius="sm" onClick={addAnswer}>
        <Plus /> Add Answer
      </Button>
    </div>
    // </AnimatePresence>
  );
};

export default AnsForm;
