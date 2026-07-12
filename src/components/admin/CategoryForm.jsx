import { useForm } from "react-hook-form";
import { Button, Input } from "../common";
import { useEffect } from "react";
const CategoryForm = ({
  onSubmit,
  defaultValues = {},
  buttonText = "Add Category",
}) => {
  const {
  register,
  handleSubmit,
  reset,
} = useForm();

useEffect(() => {
  reset(defaultValues);
}, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl bg-slate-900 p-6"
    >
      <Input
        label="Category Name"
        placeholder="React"
        register={register("name", {
          required: "Category name is required",
        })}
      />

      <Input
        label="Description"
        placeholder="Frontend Interview Questions"
        register={register("description")}
      />

      <Input
        label="Image URL"
        placeholder="https://..."
        register={register("image")}
      />

      <Button type="submit" className="w-full">
        {buttonText}
      </Button>
    </form>
  );
};

export default CategoryForm;