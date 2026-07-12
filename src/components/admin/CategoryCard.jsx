const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-2xl hover:-translate-y-0.5">
      {/* Thumbnail */}
      <div className="relative h-36 bg-slate-900/60 overflow-hidden">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Category tag pill */}
        <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/50 backdrop-blur-sm border border-white/10 text-slate-300 tracking-wide uppercase">
          {category.name}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h2 className="text-sm font-semibold text-white leading-snug truncate">
          {category.name}
        </h2>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
          {category.description || "No description provided."}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onEdit(category)}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-slate-400 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-400 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>

          <button
            onClick={() => onDelete(category.$id)}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-slate-400 hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-400 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;