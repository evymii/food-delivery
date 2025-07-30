import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

interface UpStep2Props {
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

const UpStep2 = ({
  data,
  errors,
  setData,
  handleNext,
  handleBack,
}: UpStep2Props) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
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

      <h1 className="font-bold text-black text-2xl">
        Create a strong password
      </h1>
      <p className="text-gray-600 text-sm">
        Create a strong password with letters, numbers.{" "}
      </p>

      <div className="space-y-1 mt-2">
        <input
          type="password"
          required
          value={data.password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          className="border border-gray-400 focus:border-gray-500 p-2 w-full rounded-md"
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        )}
      </div>

      <div className="space-y-1 mt-2">
        <input
          type="password"
          required
          value={data.confirmPassword}
          onChange={handlePasswordConfirmChange}
          placeholder="Confirm password"
          className="border border-gray-400 focus:border-gray-500 p-2 w-full rounded-md"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby="password-match-error"
          autoComplete="confirm-password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div className=" flex flex-row gap-2">
        <input type="checkbox" />
        <p className=" text-gray-500">Show password</p>
      </div>

      <Button
        className="bg-[#18181B] hover:bg-gray-800 text-white hover:text-white border border-gray-400 transition-colors"
        type="button"
        onClick={handleNext}
      >
        Let&apos;s go!
      </Button>

      <div className="flex flex-row items-center justify-center gap-1 text-sm">
        <p>Already have an account?</p>
        <button
          className="text-blue-600 hover:underline cursor-pointer focus:outline-none"
          tabIndex={0}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default UpStep2;
