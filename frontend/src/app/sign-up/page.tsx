"use client";
import React, { useState } from "react";
import UpStep1 from "@/components/signupstep1";
import UpStep2 from "@/components/signupstep2";
import { useRouter } from "next/navigation";

type DataProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ErrorProps = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const [data, setData] = useState<DataProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorProps>({});
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    let validationErrors: ErrorProps = {};

    if (step === 1) {
      validationErrors = validateStep1();
    } else if (step === 2) {
      validationErrors = validateStep2();
    }

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      if (step < 2) {
        setStep(step + 1);
      } else {
        console.log("user submitted:", data);
        // Redirect to login page
        router.push("/log-in");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateStep2 = (): ErrorProps => {
    const newErrors: ErrorProps = {};
    if (!data.password) {
      newErrors.password = "Нууц үгээ оруулна уу";
    } else if (data.password.length < 6) {
      newErrors.password = "Нууц үг хамгийн багадаа 6 тэмдэгттэй байх ёстой !";
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Таны оруулсан нууц үг таарахгүй байна!";
    }
    return newErrors;
  };

  const validateStep1 = (): ErrorProps => {
    const newErrors: ErrorProps = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = "Мэйл хаягаа оруулна уу!";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Мэйл хаягаа зөв оруулна уу!";
    }
    return newErrors;
  };

  return (
    <div className="flex flex-row">
      <div className="flex w-[40%] h-screen justify-center mt-[13%]">
        {step === 1 && (
          <UpStep1
            data={data}
            errors={errors}
            setData={setData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {step === 2 && (
          <UpStep2
            data={data}
            errors={errors}
            setData={setData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
      </div>
      <div className="flex w-[60%] h-screen items-center">
        <img
          src="/images/signinuppic.png"
          alt="sign in up pic"
          className="w-240 h-220"
        />
      </div>
    </div>
  );
};

export default SignUp;
