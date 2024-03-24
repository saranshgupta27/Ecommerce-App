import Link from "next/link";
import React, { useState } from "react";
import styles from "~/components/forms/forms.module.css";
import { useAuth } from "~/utils/AuthContext";
import { classNames } from "~/utils/class-name.util";
import { fetchMockedApi } from "~/utils/fetchMockedApi";
import VerifyForm from "./VerifyForm";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [verifyView, setVerifyView] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const renderInputField = (id: string, type: string, placeholder: string) => (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-zinc-800"
        style={{ textTransform: "capitalize" }}
      >
        {id}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={formData[id as keyof typeof formData]}
        onChange={handleChange}
        className="rounded-md border border-solid border-stone-300 px-3 py-2"
      />
      {errors[id] && <span className="text-red-500">{errors[id]}</span>}
    </div>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      return await handleSignup();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data: FormData): Record<string, string | null> => {
    const errors: Record<string, string | null> = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  const handleSignup = async () => {
    const { email, password, name } = formData;
    const requestBody: LoginRequestBody = { email, password, name };

    try {
      const { success, message } = await fetchMockedApi(
        "/api/signup",
        "POST",
        requestBody,
      );
      if (success) {
        return setVerifyView(true);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log("An error occurred while signing up");
    }
  };

  const onVerify = async (verificationCode: string) => {
    const { email, name } = formData;
    const requestBody: LoginRequestBody = {
      email,
      name,
      verificationCode,
    };

    try {
      const { success, message, user } = await fetchMockedApi(
        "/api/verifyEmail",
        "POST",
        requestBody,
      );
      if (success && user) {
        login(user);
        return (window.location.href = "/interests");
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while signing up");
    }
  };

  if (verifyView) {
    return <VerifyForm email={formData.email} onVerify={onVerify} />;
  }

  return (
    <div
      className={classNames(
        styles.formContainer,
        "mt-10 flex flex-col rounded-3xl border border-solid border-stone-300 bg-white px-14 pt-10 text-base",
      )}
    >
      <div
        className="mb-8 self-center font-semibold text-black"
        style={{ fontSize: "2rem" }}
      >
        Create your account
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {renderInputField("name", "text", "Enter")}
        {renderInputField("email", "email", "Enter")}
        {renderInputField("password", "password", "Enter")}
        <button
          type="submit"
          className="mt-2 items-center justify-center rounded-md border border-solid border-black bg-black py-4.5 text-center font-medium uppercase tracking-wider text-white"
        >
          Create account
        </button>
      </form>
      <div
        className={classNames(
          styles.button,
          "mt-12 flex gap-3.5 self-center max-md:mt-10",
        )}
      >
        <div className="grow text-zinc-800">Have an Account?</div>
        <Link
          href={"/login"}
          className="font-medium uppercase tracking-wider text-black"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
