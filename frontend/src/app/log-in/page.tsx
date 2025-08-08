"use client";
import React from "react";
import InStep from "@/components/instep";

const LogIn = () => {
  return (
    <div className="flex flex-row">
      <div className="flex w-[40%] h-screen justify-center mt-[13%]">
        <InStep />
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
