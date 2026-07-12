const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-900 border border-slate-700 hover:border-slate-500 text-white",

    outline:
      "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white",
  };

  return (
    <button
      className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;