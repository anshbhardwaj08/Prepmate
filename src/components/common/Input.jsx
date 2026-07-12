const Input = ({
  label,
  type = "text",
  placeholder = "",
  register,
  error,
}) => {
  return (
    <div className="mb-5">

      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default Input;