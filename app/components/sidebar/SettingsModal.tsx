"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Modal from "../Modal";
import Button from "../Button";
import Input from "../input/Input";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import useSettingsModal from "@/hooks/useSettingsModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface Props {
  currentUser: User | null;
}

const SettingsModal = ({ currentUser }: Props) => {
  const router = useRouter();

  const settingsModal = useSettingsModal();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .patch("api/settings", data)
      .then(() => {
        toast.success("Profile updated");

        router.refresh();

        settingsModal.onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      isOpen={settingsModal.isOpen}
      onClose={() => settingsModal.onClose()}
    >
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-10">
          <div className="border-b border-gray-900/12 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900">Profile</h2>

            <p className="text-sm text-gray-600 font-light mt-1">
              Edit your public information.
            </p>

            <div className="flex flex-col gap-6 md:gap-8 mt-10">
              <Input
                id="name"
                type="text"
                label="Name"
                disabled={loading}
                register={register}
                errors={errors}
              />

              <Input
                id="email"
                type="email"
                label="Email"
                disabled={loading}
                register={register}
                errors={errors}
              />

              <div className="space-y-2">
                <label className="text-sm text-gray-900 leading-6 font-medium">
                  Photo
                </label>

                <div className="flex items-center gap-3">
                  <Image
                    className="object-cover rounded-full"
                    src={
                      image || currentUser?.image || "/assets/placeholder.jpeg"
                    }
                    width={48}
                    height={48}
                    alt="Avatar"
                  />

                  <CldUploadButton
                    onUpload={handleUpload}
                    uploadPreset="sxuwes5v"
                    options={{ maxFiles: 1 }}
                  >
                    <Button secondary type="button" disabled={loading}>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-6">
            <Button
              onClick={() => settingsModal.onClose()}
              disabled={loading}
              secondary
            >
              Cancel
            </Button>

            <Button ordinary type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
