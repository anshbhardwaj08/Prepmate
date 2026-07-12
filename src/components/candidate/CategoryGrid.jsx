import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {

    return (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {categories.map(category => (

                <CategoryCard
                    key={category.$id}
                    category={category}
                />

            ))}

        </div>

    );

};

export default CategoryGrid;