"use client";
import React, { useState } from "react";
import InStep1 from "@/components/loginstep1";
import { useRouter } from "next/navigation";

type DataProps = {
  email: string;
  password: string;
};

type ErrorProps = {
  email?: string;
  password?: string;
};

const LogIn = () => {
  const [data, setData] = useState<DataProps>({
    email: "",
    password: "",
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

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    let validationErrors: ErrorProps = {};

    if (step === 1) {
      validationErrors = validateStep1();
    }
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      if (step < 1) {
        setStep(step + 1);
      } else {
        console.log("Logged in:", data);
        router.push("/home");

        // Here you would typically send the data to your backend
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateStep1 = (): ErrorProps => {
    const newErrors: ErrorProps = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email.trim()) {
      newErrors.email = "Мэйл хаягаа оруулна уу!";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Мэйл хаягаа зөв оруулна уу!";
    }
    if (!data.password) {
      newErrors.password = "Нууц үгээ оруулна уу";
    } else if (data.password.length < 6) {
      newErrors.password = "Нууц үгээ зөв оруулна уу!";
    }

    return newErrors;
  };

  return (
    <div className="flex flex-row">
      <div className="flex w-[40%] h-screen justify-center mt-[13%]">
        {step === 1 && (
          <InStep1
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

export default LogIn;
