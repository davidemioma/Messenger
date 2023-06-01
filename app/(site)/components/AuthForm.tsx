"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import AuthSocialBtn from "./AuthSocialBtn";
import Button from "../../components/Button";
import Input from "../../components/input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type TaskProps = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();

  const session = useSession();

  const [task, setTask] = useState<TaskProps>("LOGIN");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (task === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          }).then((callback) => {
            if (callback?.error) {
              toast.error("Invalid credentials!");
            }

            if (callback?.ok) {
              toast.success("Login successful");

              router.push("/users");
            }
          })
        )
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setLoading(false));
    }

    if (task === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Login successful");

            router.push("/users");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setLoading(false));
    }
  };

  const socialHandler = (action: string) => {
    setLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Login successful");

          router.push("/users");
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false));
  };

  const toggleTask = useCallback(() => {
    task === "LOGIN" ? setTask("REGISTER") : setTask("LOGIN");
  }, [task]);

  return (
    <div className="w-full sm:max-w-md sm:mx-auto mt-6">
      <div className="bg-white px-4 py-6 sm:px-8 sm:rounded-lg shadow">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {task === "REGISTER" && (
            <Input
              id="name"
              type="text"
              label="Name"
              disabled={loading}
              required
              register={register}
              errors={errors}
            />
          )}

          <Input
            id="email"
            type="email"
            label="Email Address"
            disabled={loading}
            required
            register={register}
            errors={errors}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            disabled={loading}
            required
            register={register}
            errors={errors}
          />

          <Button ordinary fullWidth type="submit" disabled={loading}>
            {task === "LOGIN" ? "Login" : "Register"}
          </Button>
        </form>

        <div className="my-6">
          <div className="relative">
            <div className="absolute -top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <span className="bg-white px-2 text-gray-500 text-sm">
                Or continue with
              </span>
            </div>

            <div className="border-t border-gray-300" />
          </div>
        </div>

        <div className="flex gap-2">
          <AuthSocialBtn
            Icon={BsGithub}
            onClick={() => socialHandler("github")}
          />

          <AuthSocialBtn
            Icon={BsGoogle}
            onClick={() => socialHandler("google")}
          />
        </div>

        <div className="flex justify-center gap-2 px-2 text-sm text-gray-500 mt-6">
          <div>
            {task === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>

          <button className="underline" onClick={toggleTask}>
            {task === "LOGIN" ? "Create an account" : "login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
