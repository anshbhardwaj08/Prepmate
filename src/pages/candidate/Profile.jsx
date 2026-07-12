import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database";
import ProfilePhoto from "../../components/profile/ProfilePhoto";
import PersonalInfo from "../../components/profile/PersonalInfo";
import ProfessionalInfo from "../../components/profile/ProfessionalInfo";
import ResumeUpload from "../../components/profile/ResumeUpload";
import { toast } from "react-hot-toast";

const Profile = () => {

    const { register, handleSubmit, reset } = useForm();
    const user = useSelector((state) => state.auth.userData);

    const [profileImage, setProfileImage]   = useState("");
    const [profileImageId, setProfileImageId] = useState("");
    const [resume, setResume]               = useState("");
    const [resumeId, setResumeId]           = useState("");
    const [saving, setSaving]               = useState(false);
    const [profileName, setProfileName]     = useState("");
    const [documentId, setDocumentId] = useState(null); // ← add this

    // ── load existing profile ────────────────────────────────────────────────
    useEffect(() => {
        // ── load profile ─────────────────────────────────────────────
const loadProfile = async () => {
    try {
        const profile = await databaseService.getUserProfile(user.$id);
        if (!profile) return;

        // ✅ Store the document $id so we always update the same doc
        setDocumentId(profile.$id);  // ← add this state

        reset({
            college:        profile.college        || "",
            branch:         profile.branch         || "",
            graduationYear: profile.graduationYear || "",
            skills:         profile.skills         || "",
            github:         profile.github         || "",
            linkedin:       profile.linkedin       || "",
            bio:            profile.bio            || "",
        });

        setProfileName(profile.name || user?.name || "");

        if (profile.profileImage) {
            setProfileImageId(profile.profileImage);
            setProfileImage(databaseService.getFileView(profile.profileImage).toString());
        }
        if (profile.resume) {
            setResumeId(profile.resume);
            setResume(databaseService.getFileUrl(profile.resume));
        }

    } catch (error) {
        console.error("Load profile error:", error);
    }
};  

        if (user) loadProfile();
    }, [user, reset]);

    // ── file uploads ─────────────────────────────────────────────────────────
    const uploadProfile = async (file) => {
        try {
            const uploaded = await databaseService.uploadFile(file);
            setProfileImageId(uploaded.$id);
            setProfileImage(databaseService.getFileView(uploaded.$id).toString());
        } catch (error) {
            console.error("Photo upload error:", error);
            toast.error("Failed to upload photo");
        }
    };

    const uploadResume = async (file) => {
        try {
            const uploaded = await databaseService.uploadFile(file);
            setResumeId(uploaded.$id);
            setResume(databaseService.getFileUrl(uploaded.$id));
        } catch (error) {
            console.error("Resume upload error:", error);
            toast.error("Failed to upload resume");
        }
    };

    // ── save profile ─────────────────────────────────────────────────────────
    const submit = async (data) => {
    try {
        setSaving(true);

        let docId = documentId;

        // ✅ Only create if we truly have no document yet
        if (!docId) {
            const newProfile = await databaseService.createUserProfile({
                userId: user.$id,
                name:   user?.name  || "",
                email:  user?.email || "",
            });
            docId = newProfile.$id;
            setDocumentId(docId); // ← save it so next save won't create again
        }

        const updatedData = {
            name:           user?.name          || "",
            college:        data.college        || "",
            branch:         data.branch         || "",
            graduationYear: data.graduationYear ? parseInt(data.graduationYear) : null,
            skills:         data.skills         || "",
            github:         data.github         || "",
            linkedin:       data.linkedin       || "",
            bio:            data.bio            || "",
            profileImage:   profileImageId      || "",
            resume:         resumeId            || "",
        };

        await databaseService.updateProfile(docId, updatedData);

        // ✅ Reset form with saved values so they persist after save
        reset({
            college:        data.college        || "",
            branch:         data.branch         || "",
           graduationYear: data.graduationYear ? String(data.graduationYear) : "", 
            skills:         data.skills         || "",
            github:         data.github         || "",
            linkedin:       data.linkedin       || "",
            bio:            data.bio            || "",
        });

        setProfileName(user?.name || "");
        toast.success("Profile updated successfully!");

    } catch (error) {
        console.error("Save error:", error.message);
        toast.error(`Failed: ${error.message}`);
    } finally {
        setSaving(false);
    }
};

    // ── completion % ─────────────────────────────────────────────────────────
    const completion = profileImage && resume ? 100 : profileImage || resume ? 70 : 40;

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* ── Hero Banner ── */}
            <div className="relative h-40 w-full overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="absolute -top-10 left-1/3 h-40 w-72 rounded-full bg-blue-600 opacity-20 blur-3xl" />
            </div>

            {/* ── Main content ── */}
            <div className="mx-auto max-w-4xl px-6 pb-16">

                {/* ── Avatar overlapping banner ── */}
                <div className="relative -mt-16 mb-6 flex items-end justify-between">
                    <div className="relative">
                        <div className="rounded-full border-4 border-slate-950 overflow-hidden shadow-2xl">
                            <ProfilePhoto image={profileImage} onUpload={uploadProfile} />
                        </div>
                    </div>
                    <div className="mb-2 text-right">
                        <h1 className="text-2xl font-bold text-white">
                            {profileName || user?.name || "Your Name"}
                        </h1>
                        <span className="mt-1 inline-block rounded-full bg-blue-600/20 px-3 py-0.5 text-xs font-semibold text-blue-400 border border-blue-600/30">
                            Candidate
                        </span>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                {/* ── Profile completion ── */}
                <div className="mb-8 rounded-2xl bg-slate-900 border border-slate-800 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-white">Profile Completion</p>
                        <span className="text-sm font-bold text-blue-400">{completion}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800">
                        <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
                            style={{ width: `${completion}%` }}
                        />
                    </div>
                    <div className="mt-3 flex gap-4 text-xs text-slate-400">
                        <span className={profileImage ? "text-green-400" : ""}>
                            {profileImage ? "✅" : "⬜"} Photo
                        </span>
                        <span className={resume ? "text-green-400" : ""}>
                            {resume ? "✅" : "⬜"} Resume
                        </span>
                        <span className="text-green-400">✅ Account</span>
                    </div>
                </div>

                {/* ── Form ── */}
                <form onSubmit={handleSubmit(submit)} className="space-y-6">

                    {/* Personal Info */}
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                        <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 text-sm">
                                👤
                            </div>
                            <h2 className="font-semibold text-white">Personal Information</h2>
                        </div>
                        <div className="p-6">
                            <PersonalInfo register={register} />
                        </div>
                    </div>

                    {/* Professional Info */}
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                        <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 text-sm">
                                💼
                            </div>
                            <h2 className="font-semibold text-white">Professional Details</h2>
                        </div>
                        <div className="p-6">
                            <ProfessionalInfo register={register} />
                        </div>
                    </div>

                    {/* Resume */}
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                        <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600/20 text-green-400 text-sm">
                                📄
                            </div>
                            <h2 className="font-semibold text-white">Resume</h2>
                        </div>
                        <div className="p-6">
                            <ResumeUpload resume={resume} onUpload={uploadResume} />
                        </div>
                    </div>

                    {/* Save button */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-900/30 transition hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60"
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <span className="relative">
                            {saving ? "⏳ Saving..." : "💾 Save Profile"}
                        </span>
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Profile;