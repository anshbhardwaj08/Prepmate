import { useEffect, useState } from "react";
import databaseService from "../../appwrite/database";
import CategoryForm from "../../components/admin/CategoryForm";
import CategoryCard from "../../components/admin/CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await databaseService.getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const addCategory = async (data) => {
    try {
      await databaseService.createCategory(data);
      loadCategories();
    } catch (error) { console.log(error); }
  };

  const updateCategory = async (data) => {
    try {
      await databaseService.updateCategory(selectedCategory.$id, data);
      setSelectedCategory(null);
      loadCategories();
    } catch (error) { console.log(error); }
  };

  const deleteCategory = async (id) => {
    try {
      await databaseService.deleteCategory(id);
      loadCategories();
    } catch (error) { console.log(error); }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Page header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
              Content Management
            </p>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Categories
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Manage the categories used across your content.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {categories.length} {categories.length === 1 ? "category" : "categories"}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">

          {/* Sticky form */}
          <div className="lg:sticky lg:top-8">
            <CategoryForm
              onSubmit={selectedCategory ? updateCategory : addCategory}
              defaultValues={selectedCategory || {}}
              buttonText={selectedCategory ? "Update category" : "Add category"}
              isEditing={!!selectedCategory}
              onCancel={() => setSelectedCategory(null)}
            />
          </div>

          {/* Cards grid */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-56 rounded-2xl border border-white/5 bg-white/[0.03] animate-pulse" />
                ))}
              </div>
            ) : categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-dashed border-white/10 text-center px-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-400">No categories yet</p>
                <p className="text-xs text-slate-600 mt-1">Create your first category using the form.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.$id}
                    category={category}
                    onEdit={setSelectedCategory}
                    onDelete={deleteCategory}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Categories;