const ProfileCard = ({ user, profile, setEditing }) => {

    return (

        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 p-8 text-white">

            <h1 className="text-3xl font-bold">

                {user?.name}

            </h1>

            <p className="mt-2">

                {user?.email}

            </p>

            <div className="mt-8 space-y-3">

                <p>

                    <strong>College:</strong>

                    {" "}

                    {profile?.college || "Not Added"}

                </p>

                <p>

                    <strong>Branch:</strong>

                    {" "}

                    {profile?.branch || "Not Added"}

                </p>

                <p>

                    <strong>Graduation Year:</strong>

                    {" "}

                    {profile?.graduationYear || "Not Added"}

                </p>

                <p>

                    <strong>Resume:</strong>

                    {" "}

                    {

                        profile?.resume

                        ?

                        "Uploaded"

                        :

                        "Not Uploaded"

                    }

                </p>

            </div>

            <button

                onClick={() => setEditing(true)}

                className="mt-8 rounded-lg bg-blue-600 px-5 py-3"

            >

                Edit Profile

            </button>

        </div>

    );

};

export default ProfileCard;