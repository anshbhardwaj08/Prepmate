import { useEffect, useState } from "react";

import databaseService from "../../appwrite/database";

import CategoryForm from "../../components/admin/CategoryForm";
import CategoryCard from "../../components/admin/CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadCategories = async () => {
    try {
      const data = await databaseService.getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (data) => {
    try {
      await databaseService.createCategory(data);

      loadCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (data) => {
    try {
      await databaseService.updateCategory(
        selectedCategory.$id,
        data
      );

      setSelectedCategory(null);

      loadCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await databaseService.deleteCategory(id);

      loadCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <h1 className="mb-8 text-4xl font-bold text-white">
        Categories
      </h1>

      <CategoryForm
        onSubmit={
          selectedCategory
            ? updateCategory
            : addCategory
        }
        defaultValues={selectedCategory || {}}
        buttonText={
          selectedCategory
            ? "Update Category"
            : "Add Category"
        }
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {categories.map((category) => (
          <CategoryCard
            key={category.$id}
            category={category}
            onEdit={setSelectedCategory}
            onDelete={deleteCategory}
          />
        ))}

      </div>

    </div>
  );
};

export default Categories;
// const Categories = () => {
//   return (
//     <div className="text-white p-10">
//       Categories Page
//     </div>
//   );
// };

// export default Categories;