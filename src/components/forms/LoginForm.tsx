import Link from "next/link";
import React, { useState } from "react";
import styles from "~/components/forms/forms.module.css";
import { routes } from "~/constants/routes";
import { useAuth, type User } from "~/utils/AuthContext";
import { classNames } from "~/utils/class-name.util";
import { fetchMockedApi } from "~/utils/fetchMockedApi";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});

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

  const handleLogin = async () => {
    const { email, password } = formData;
    const requestBody = { email, password };

    try {
      const { success, user } = await fetchMockedApi(
        "/api/login",
        "POST",
        requestBody,
      );
      if (success && user) {
        login(user as User);
      } else {
        alert("login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      return await handleLogin();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data: FormData): Record<string, string | null> => {
    const errors: Record<string, string | null> = {};
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
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

  return (
    <div
      className={classNames(
        styles.formContainer,
        "mt-10 flex flex-col rounded-3xl border border-solid border-stone-300 bg-white px-14 pt-10 text-base",
      )}
    >
      <div
        className="self-center font-semibold text-black"
        style={{ fontSize: "2rem" }}
      >
        Login
      </div>
      <div
        className="mb-3 mt-9 text-center text-2xl"
        style={{ fontWeight: 500 }}
      >
        Welcome back to ECOMMERCE
      </div>
      <div className="mb-8 text-center text-base">
        The next gen business marketplace
      </div>
      <form onSubmit={handleSubmit} className="mb-0 flex flex-col gap-8">
        {renderInputField("email", "email", "Enter")}
        {renderInputField("password", "password", "Enter")}
        <button
          type="submit"
          className="mb-7 mt-2 items-center justify-center rounded-md border border-solid border-black bg-black py-4.5 text-center font-medium uppercase tracking-wider text-white"
        >
          Login
        </button>
      </form>
      <hr style={{ border: "1px solid #C1C1C1" }} />
      <div className="mb-13 flex gap-3.5 self-center pt-12">
        <div className="text-zinc-800">{"Don't have an account?"}</div>
        <Link
          href={routes.SIGNUP}
          className="font-medium uppercase tracking-wider text-black"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
