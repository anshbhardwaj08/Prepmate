const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),

    appwriteProjectId:
       String(import.meta.env.VITE_APPWRITE_PROJECT_ID),

    appwriteDatabaseId:
       String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

    usersCollectionId:
        String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),

    interviewsCollectionId:
        String(import.meta.env.VITE_APPWRITE_INTERVIEWS_COLLECTION_ID),

    resultsCollectionId:
        String(import.meta.env.VITE_APPWRITE_RESULTS_COLLECTION_ID),

    questionsCollectionId:
        String(import.meta.env.VITE_APPWRITE_QUESTIONS_COLLECTION_ID),

    categoriesCollectionId:
        String(import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID),

    bucketId:
        String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;