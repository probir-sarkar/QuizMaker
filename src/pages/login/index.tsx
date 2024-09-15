import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";

import z from "zod";
import { ID } from "appwrite";
import { account } from "@/lib/appwrite";
import { useState } from "react";

const inputSchema = z.object({
  email: z.string().email({ message: "Invalid email" })
});
type Inputs = z.infer<typeof inputSchema>;
const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const hadUserId = Boolean(userId);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema)
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const sessionToken = await account.createEmailToken(ID.unique(), data.email);
      const userId = sessionToken.userId;
      setUserId(userId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      {!hadUserId ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16 max-w-sm mx-auto ">
          <Input
            type="email"
            label="Email"
            {...register("email")}
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
          <Button fullWidth type="submit">
            Submit
          </Button>
        </form>
      ) : (
        <OtpForm userId={userId} />
      )}
    </main>
  );
};

export default LoginPage;

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" })
});
type OtpInputs = z.infer<typeof otpSchema>;
const OtpForm = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OtpInputs>({
    resolver: zodResolver(otpSchema)
  });
  const onSubmit: SubmitHandler<OtpInputs> = async (data) => {
    try {
      const session = await account.createSession(userId, data.otp);
      console.log(session);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16 max-w-sm mx-auto ">
        <Input
          type="number"
          label="OTP"
          {...register("otp")}
          isInvalid={Boolean(errors.otp)}
          errorMessage={errors.otp?.message}
        />
        <Button fullWidth type="submit">
          Submit
        </Button>
      </form>
    </main>
  );
};
