const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;