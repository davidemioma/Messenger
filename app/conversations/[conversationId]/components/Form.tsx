"use client";

import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/hooks/useConverstion";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios
      .post("/api/messages", {
        ...data,
        conversationId,
      })
      .then(() => {
        toast.success("Message sent");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const onUpload = (result: any) => {
    axios
      .post("/api/messages", {
        image: result?.info?.secure_url,
        conversationId,
      })
      .then(() => {
        toast.success("Image sent");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="bg-white w-full flex items-center gap-2 lg:gap-4 py-4 px-4 lg:px-6 border-t">
      <CldUploadButton
        onUpload={onUpload}
        uploadPreset="sxuwes5v"
        options={{ maxFiles: 1 }}
      >
        <HiPhoto
          size={30}
          className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
        />
      </CldUploadButton>

      <form
        className="flex-1 w-full flex items-center gap-2 lg:gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MessageInput
          id="message"
          type="text"
          placeholder="Write a message"
          required
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 p-2 cursor-pointer rounded-full transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
