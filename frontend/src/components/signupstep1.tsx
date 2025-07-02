import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

import Link from "next/link";

interface UpStep1Props {
  data: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  handleNext: (e: React.MouseEvent) => void;
  handleBack: (e: React.MouseEvent) => void;
}

const UpStep1 = ({
  data,
  errors,
  setData,
  handleNext,
  handleBack,
}: UpStep1Props) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col justify-around h-[280px] w-[320px]">
      <Button
        type="button"
        onClick={handleBack}
        className="bg-white hover:bg-white cursor-pointer border border-gray-300 w-8 h-8 shadow-xl"
        aria-label="Go back"
      >
        <ChevronLeft size={30} strokeWidth={1} className="text-black" />
      </Button>

      <h1 className="font-bold text-black text-2xl">Create your account</h1>
      <p className="text-gray-600 text-sm">
        Sign up to explore your favorite dishes.{" "}
      </p>

      <div className="space-y-1">
        <input
          type="email"
          required
          value={data.email}
          onChange={handleEmailChange}
          placeholder="Enter your email address"
          className="border border-gray-400 focus:border-gray-500 p-2 w-full rounded-md"
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-xs italic">
            {errors.email}
          </p>
        )}
      </div>

      <Button
        className="bg-[#18181B] hover:bg-gray-800 text-white hover:text-white border border-gray-400 transition-colors"
        type="button"
        onClick={handleNext}
      >
        Let's go!
      </Button>

      <div className="flex flex-row items-center justify-center gap-1 text-sm">
        <p>Already have an account?</p>
        <Link href="/log-in" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default UpStep1;
