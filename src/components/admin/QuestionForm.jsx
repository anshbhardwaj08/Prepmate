import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import databaseService from "../../appwrite/database";
import { Button, Input } from "../common";

const QuestionForm = ({
  onSubmit,
  defaultValues = {},
  buttonText = "Add Question",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues,
  });
  const questionType = watch("type");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await databaseService.getCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl bg-slate-900 p-6"
    >
      <Input
        label="Question Title"
        placeholder="Explain Virtual DOM"
        register={register("title", {
          required: true,
        })}
      />

      <Input
        label="Description"
        placeholder="Optional"
        register={register("description")}
      />

      {/* Category */}

      <div>

        <label className="mb-2 block text-slate-300">
          Category
        </label>

        <select
          {...register("categoryId")}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >

          <option value="">
            Select Category
          </option>

          {categories.map((category) => (

            <option
              key={category.$id}
              value={category.$id}
            >
              {category.name}
            </option>

          ))}

        </select>

      </div>

      {/* Difficulty */}

      <div>

        <label className="mb-2 block text-slate-300">

          Difficulty

        </label>

        <select
          {...register("difficulty")}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >

          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>

        </select>

      </div>

      {/* Type */}

      <div>

        <label className="mb-2 block text-slate-300">

          Type

        </label>

        <select
          {...register("type")}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >

          <option value="descriptive">Descriptive</option>
            <option value="mcq">MCQ</option>
            <option value="coding">Coding</option>

        </select>

      </div>

      {questionType === "mcq" && (
          <div className="space-y-4 rounded-xl border border-slate-700 p-5">

              <h3 className="text-lg font-semibold text-white">
                  MCQ Options
              </h3>

              <Input
                  label="Option A"
                  register={register("options.0", {
                      required: true,
                  })}
              />

              <Input
                  label="Option B"
                  register={register("options.1", {
                      required: true,
                  })}
              />

              <Input
                  label="Option C"
                  register={register("options.2", {
                      required: true,
                  })}
              />

              <Input
                  label="Option D"
                  register={register("options.3", {
                      required: true,
                  })}
              />

              <div>

                  <label className="mb-2 block text-slate-300">
                      Correct Answer
                  </label>

                  <select
                      {...register("correctAnswer", {
                          required: true,
                      })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                  >
                      <option value="">
                          Select Correct Option
                      </option>

                      <option value="0">
                          Option A
                      </option>

                      <option value="1">
                          Option B
                      </option>

                      <option value="2">
                          Option C
                      </option>

                      <option value="3">
                          Option D
                      </option>

                  </select>

              </div>

          </div>
      )}

      {questionType === "descriptive" && (

          <Input
              label="Expected Answer"
              placeholder="Ideal Answer"
              register={register("expectedAnswer")}
          />

      )}

      <Button
        type="submit"
        className="w-full"
      >
        {buttonText}
      </Button>

    </form>
  );
};

export default QuestionForm;