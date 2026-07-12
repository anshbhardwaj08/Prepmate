import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CategoryForm = ({
  onSubmit,
  defaultValues = {},
  buttonText = "Add Category",
  isEditing = false,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-xl">
      <div className="mb-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isEditing
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              }
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              {isEditing ? "Edit category" : "New category"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEditing ? "Update the details below." : "Fill in the details to add a category."}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
            Category name
          </label>
          <input
            placeholder="e.g. React"
            {...register("name", { required: "Name is required" })}
            className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <input
            placeholder="e.g. Frontend interview questions"
            {...register("description")}
            className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
            Image URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              placeholder="https://..."
              {...register("image")}
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {buttonText}
              </>
            )}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="h-10 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 hover:text-slate-300 text-sm transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;