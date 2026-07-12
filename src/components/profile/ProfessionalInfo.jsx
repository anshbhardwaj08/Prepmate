const ProfessionalInfo = ({
    register,
}) => {

    return (

        <div className="rounded-2xl bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold text-white">

                Professional Information

            </h2>

            <div className="space-y-6">

                <input
                    {...register("skills")}
                    placeholder="React, Node, MongoDB"
                    className="w-full rounded-lg bg-slate-950 p-4 text-white"
                />

                <input
                    {...register("github")}
                    placeholder="GitHub URL"
                    className="w-full rounded-lg bg-slate-950 p-4 text-white"
                />

                <input
                    {...register("linkedin")}
                    placeholder="LinkedIn URL"
                    className="w-full rounded-lg bg-slate-950 p-4 text-white"
                />

                <textarea
                    rows="5"
                    {...register("bio")}
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-lg bg-slate-950 p-4 text-white"
                />

            </div>

        </div>

    );

};

export default ProfessionalInfo;