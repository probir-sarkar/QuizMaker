import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";

import z from "zod";
import { ID } from "appwrite";
import { account } from "@/lib/appwrite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema)
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const sessionToken = await account.createEmailToken(ID.unique(), data.email);
      const userId = sessionToken.userId;
      setUserId(userId);
      toast.success("OTP sent successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send OTP");
    }
  };
  return (
    <main className="min-h-dvh flex flex-col  items-center justify-center">
      <div className="max-w-md w-full shadow-md p-6 border border-gray-50 rounded-md ">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-8">
          Please enter your email to log in or create an account. You will receive a one-time password (OTP) to
          continue.
        </p>
        {!hadUserId ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto ">
            <Input
              type="email"
              label="Email"
              {...register("email")}
              isInvalid={Boolean(errors.email)}
              errorMessage={errors.email?.message}
            />
            <Button fullWidth isLoading={isSubmitting} size="lg" type="submit">
              Send OTP
            </Button>
          </form>
        ) : (
          <OtpForm userId={userId} />
        )}
      </div>
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<OtpInputs>({
    resolver: zodResolver(otpSchema)
  });
  const onSubmit: SubmitHandler<OtpInputs> = async (data) => {
    try {
      const session = await account.createSession(userId, data.otp);
      if (session) {
        toast.success("Logged in successfully");
        return navigate("/");
      }
      throw new Error("Invalid OTP");
    } catch (err) {
      console.log(err);
      toast.error("Invalid OTP");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16 max-w-sm mx-auto ">
      <Input
        type="text"
        label="OTP"
        {...register("otp")}
        isInvalid={Boolean(errors.otp)}
        errorMessage={errors.otp?.message}
      />
      <Button fullWidth isLoading={isSubmitting} color="primary" size="lg" type="submit">
        Send OTP
      </Button>
    </form>
  );
};
