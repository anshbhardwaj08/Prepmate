const PersonalInfo = ({ register }) => {
    return (
        <div className="grid gap-6 md:grid-cols-2">

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    College
                </label>
                <input
                    {...register("college")}
                    placeholder="e.g. IIT Delhi"
                    className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Branch
                </label>
                <input
                    {...register("branch")}
                    placeholder="e.g. Computer Science"
                    className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Graduation Year
                </label>
                <input
                    type="number"
                    {...register("graduationYear")}
                    placeholder="e.g. 2026"
                    className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition"
                />
            </div>

        </div>
    );
};

export default PersonalInfo;