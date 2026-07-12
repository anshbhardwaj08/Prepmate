const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-xl bg-slate-900 p-6 text-white">

      <h2 className="text-xl font-bold">
        {category.name}
      </h2>

      <p className="mt-3 text-slate-400">
        {category.description}
      </p>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => onEdit(category)}
          className="rounded bg-blue-600 px-4 py-2"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(category.$id)}
          className="rounded bg-red-600 px-4 py-2"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default CategoryCard;