const ResumeUpload = ({
    resume,
    onUpload,
}) => {

    return (

        <div className="rounded-2xl bg-slate-900 p-8">

            <h2 className="mb-5 text-2xl font-bold text-white">

                Resume

            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    onUpload(e.target.files[0])
                }
                className="block w-full text-white"
            />

            {resume && (

                <a
                    href={resume}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-blue-400"
                >
                    View Uploaded Resume
                </a>

            )}

        </div>

    );

};

export default ResumeUpload;