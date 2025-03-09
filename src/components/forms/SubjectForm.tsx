"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchemas";
import { createSubject } from "@/lib/serverActions";
import { toast } from "react-toastify";
import InputField from "../InputField";

const SubjectForm = ({ type, data }: { type: "create" | "update"; data?: any; }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    console.log("Form Data:", formData);
    try {
      const result = await createSubject({ success: false, error: false }, formData);
      console.log("Create Subject Result:", result);
      if (result.success) {
        toast.success("Subject created successfully!");
      } else {
        // If the server returned an error message, display it.
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.error("Error creating subject:", error);
      toast.error(error.message || "An error occurred while creating the subject.");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>
      <div className="flex flex-wrap gap-4 justify-between">
        <InputField
          label="Subject name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name?.message}
        />
      </div>
      <button className="p-2 bg-blue-400 text-white rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
