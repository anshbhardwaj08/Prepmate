const PersonalInfo = ({
    register,
}) => {

    return (

        <div className="rounded-2xl bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold text-white">

                Personal Information

            </h2>

            <div className="grid gap-6 md:grid-cols-2">

                <input
                    {...register("college")}
                    placeholder="College"
                    className="rounded-lg bg-slate-950 p-4 text-white"
                />

                <input
                    {...register("branch")}
                    placeholder="Branch"
                    className="rounded-lg bg-slate-950 p-4 text-white"
                />

                <input
                    type="number"
                    {...register("graduationYear")}
                    placeholder="Graduation Year"
                    className="rounded-lg bg-slate-950 p-4 text-white"
                />

            </div>

        </div>

    );

};

export default PersonalInfo;