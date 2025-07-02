import { Button } from "./ui/button";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

interface InStep1Props {
  data: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  handleNext: (e: React.MouseEvent) => void;
  handleBack: (e: React.MouseEvent) => void;
}

const InStep1 = ({
  data,
  errors,
  setData,
  handleNext,
  handleBack,
}: InStep1Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-around h-[320px] w-[320px]">
      <Button
        type="button"
        onClick={handleBack}
        className="bg-white hover:bg-white cursor-pointer border border-gray-300 w-8 h-8 shadow-xl"
        aria-label="Go back"
      >
        <ChevronLeft size={30} strokeWidth={1} className="text-black" />
      </Button>

      <h1 className="font-bold text-black text-2xl">Log in</h1>
      <p className="text-gray-600 text-sm">
        Log in to enjoy your favorite dishes.
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

      <div className="space-y-1 mt-2 relative">
        <input
          type={showPassword ? "text" : "password"}
          required
          value={data.password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          className="border border-gray-400 focus:border-gray-500 p-2 w-full rounded-md pr-10"
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        )}

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button
        className="bg-[#18181B] hover:bg-gray-800 text-white hover:text-white border border-gray-400 transition-colors"
        type="button"
        onClick={handleNext}
      >
        Let's go!
      </Button>

      <div className="flex flex-row items-center justify-center gap-1 text-sm">
        <p>Don't have an account?</p>
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default InStep1;
