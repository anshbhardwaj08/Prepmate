const Badge = ({ children }) => {
  return (
    <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-slate-900/60 px-5 py-2 text-sm font-medium text-blue-300 backdrop-blur-md">
      {children}
    </div>
  );
};

export default Badge;