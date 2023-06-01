"use client";

import React, { useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import Input from "../../components/input/Input";
import Select from "@/app/components/input/Select";
import useGroupChatModal from "@/hooks/useGroupChatModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface Props {
  users: User[];
}

const GroupChatModal = ({ users }: Props) => {
  const router = useRouter();

  const groupChatModal = useGroupChatModal();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        toast.success("Group created");

        groupChatModal.onClose();

        router.refresh();
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
      isOpen={groupChatModal.isOpen}
      onClose={() => groupChatModal.onClose()}
    >
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-10">
          <div className="border-b border-gray-900/12 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>

            <p className="text-sm text-gray-600 font-light mt-1">
              Create a chat with more than 2 people.
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

              <Select
                value={members}
                label="Members"
                options={users?.map((user) => ({
                  value: user?.id,
                  label: user?.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-6">
            <Button
              onClick={() => groupChatModal.onClose()}
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

export default GroupChatModal;
