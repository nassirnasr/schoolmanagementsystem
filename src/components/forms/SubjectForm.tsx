"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchemas";
import prisma from "@/lib/prisma";

const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData = {},
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (type === "create") {
        await prisma.subject.create({
          data: {
            name: formData.name,
            // Add other fields as necessary
          },
        });
        toast.success("Subject created successfully!");
      } else if (type === "update") {
        await prisma.subject.update({
          where: { id: data.id },
          data: {
            name: formData.name,
            // Add other fields as necessary
          },
        });
        toast.success("Subject updated successfully!");
      }
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      setSubmissionError(error.message || "An unknown error occurred.");
      toast.error(error.message || "Failed to process the request.");
      console.error(error);
    }
  });

  const { teachers } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors.id}
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teachers")}
            defaultValue={data?.teachers}
          >
            {teachers?.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
      </div>

      {submissionError && <p className="text-red-500">{submissionError}</p>}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
