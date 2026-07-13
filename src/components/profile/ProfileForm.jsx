import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import databaseService from "../../appwrite/database";

const ProfileForm = ({ profile, setEditing, refreshProfile }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            college:        profile?.college        || "",
            branch:         profile?.branch         || "",
            graduationYear: profile?.graduationYear || "",
        },
    });

    const updateProfile = async (data) => {
        try {
            // ✅ profile.$id here is the document ID — correct since
            // database.js now uses userId as document ID, they're the same
            await databaseService.updateUserProfile(profile.$id, data);
            toast.success("Profile updated!");
            await refreshProfile();
            setEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="mx-auto max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 p-8">
            <h1 className="mb-8 text-2xl font-bold text-white">Edit Profile</h1>

            <form onSubmit={handleSubmit(updateProfile)} className="space-y-5">

                <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                        College
                    </label>
                    <input
                        placeholder="Your College"
                        {...register("college")}
                        className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                        Branch
                    </label>
                    <input
                        placeholder="Computer Science"
                        {...register("branch")}
                        className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                        Graduation Year
                    </label>
                    <input
                        type="number"
                        placeholder="2028"
                        {...register("graduationYear", { valueAsNumber: true })}
                        className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium transition-all"
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="flex-1 h-10 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 text-sm transition-all"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ProfileForm;