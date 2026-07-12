const ProfessionalInfo = ({ register }) => {
    return (
        <div className="space-y-5">

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Skills
                </label>
                <input
                    {...register("skills")}
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition"
                />
                <p className="text-xs text-slate-600">Separate skills with commas</p>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    GitHub URL
                </label>
                <input
                    {...register("github")}
                    placeholder="https://github.com/yourusername"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    LinkedIn URL
                </label>
                <input
                    {...register("linkedin")}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Bio
                </label>
                <textarea
                    rows={4}
                    {...register("bio")}
                    placeholder="Tell us about yourself, your experience and goals..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                />
            </div>

        </div>
    );
};

export default ProfessionalInfo;