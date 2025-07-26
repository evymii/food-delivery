"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";admin taldaa geh shig bollo
import axios from "axios";

const baseurl = "http://localhost:3001";

const signInSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type SignInFormData = yup.InferType<typeof signInSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: SignInFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // anh sursan fetch arga
      const response = await fetch(`${baseurl}/auth/log-in`, {
        // Changed from /auth/log-in to /user/log-in
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed with status ${response.status}`
        );
      }

      const responseData = await response.json();

      if (!responseData.token) {
        throw new Error("No token received");
      }

      localStorage.setItem("meow-test", responseData.token);
      router.push("/home");

      // axios shine arga
      // const postData = async () =>{
      // try {
      // const response = await axios.post("http://localhost:3001/auth/log-in"),{
      //   email: formData.email,
      //   password:formData.password

      // };

      router.push("/home");
      // }
      // }
    } catch (error) {
      console.error("Login error:", error);
      setApiError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col justify-around h-[320px] w-[320px]">
      <Button
        onClick={() => router.back()}
        className="bg-white hover:bg-white border border-gray-300 w-8 h-8 shadow-xl"
        aria-label="Go back"
      >
        <ChevronLeft size={30} strokeWidth={1} className="text-black" />
      </Button>

      <h1 className="font-bold text-black text-2xl">Log in</h1>
      <p className="text-gray-600 text-sm">
        Log in to enjoy your favorite dishes.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email address"
            className={`w-full p-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-400"
            } focus:border-gray-500`}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`w-full p-2 border rounded-md pr-10 ${
              errors.password ? "border-red-500" : "border-gray-400"
            } focus:border-gray-500`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {apiError && (
          <div className="p-2 text-sm text-red-600 bg-red-50 rounded-md">
            {apiError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-[#18181B] hover:bg-gray-800 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Let's go!"
          )}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-1 text-sm">
        <span>Don't have an account?</span>
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
