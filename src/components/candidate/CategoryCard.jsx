import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {

    const navigate = useNavigate();

    return (

        <div className="rounded-xl bg-slate-900 p-6 text-white">

            <h2 className="text-2xl font-bold">

                {category.name}

            </h2>

            <p className="mt-3 text-slate-400">

                {category.description}

            </p>

            <button
                className="mt-6 rounded bg-blue-600 px-5 py-2"
                onClick={() =>
                    navigate(`/dashboard/interview/${category.$id}`)
                }
            >
                Start Interview
            </button>

        </div>

    );

};

export default CategoryCard;