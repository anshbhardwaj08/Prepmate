import { useForm } from "react-hook-form";
import databaseService from "../../appwrite/database";
import { Button, Input } from "../common";

const ProfileForm = ({
  profile,
  setEditing,
  refreshProfile,
}) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      college: profile?.college || "",
      branch: profile?.branch || "",
      graduationYear: profile?.graduationYear || "",
    },
  });

  const updateProfile = async (data) => {
    try {
      await databaseService.updateUserProfile(
        profile.$id,
        data
      );

      await refreshProfile();

      setEditing(false);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-slate-900 p-8">

      <h1 className="mb-8 text-3xl font-bold text-white">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit(updateProfile)}
        className="space-y-5"
      >

        <Input
          label="College"
          placeholder="Your College"
          register={register("college")}
        />

        <Input
          label="Branch"
          placeholder="Computer Science"
          register={register("branch")}
        />

        <Input
          label="Graduation Year"
          type="number"
          placeholder="2028"
          register={register("graduationYear", {
            valueAsNumber: true,
          })}
        />

        <div className="flex gap-4">

          <Button
            type="submit"
            className="w-full"
          >
            Save
          </Button>

          <Button
            type="button"
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>

        </div>

      </form>

    </div>
  );
};

export default ProfileForm;