const SectionHeading = ({
  title,
  subtitle,
  center = true,
}) => {
  return (
    <div
      className={`mb-16 ${
        center ? "text-center" : ""
      }`}
    >
      <h2 className="text-4xl font-black text-white md:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeading;