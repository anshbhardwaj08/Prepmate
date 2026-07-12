import { useRef } from "react";

const ProfilePhoto = ({
    image,
    onUpload,
}) => {

    const fileRef = useRef();

    return (

        <div className="flex flex-col items-center rounded-2xl bg-slate-900 p-8">

            <img
                src={
                    image ||
                    "https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
                }
                alt="Profile"
                className="h-36 w-36 rounded-full object-cover border-4 border-blue-500"
            />

            <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Upload Photo
            </button>

            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                    onUpload(e.target.files[0])
                }
            />

        </div>

    );

};

export default ProfilePhoto;