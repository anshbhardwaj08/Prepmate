import conf from "../conf/conf";
import {
    Client,
    Databases,
    Storage,
    ID,
    Query,
} from "appwrite";

export class DatabaseService {

    client;
    database;
    storage;

    constructor(){

        this.client = new Client();

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);

    }
    async createUserProfile({
  userId,
  role = "candidate",
}) {
  try {
    return await this.database.createDocument(
      conf.appwriteDatabaseId,
      conf.usersCollectionId,
      ID.unique(),
      {
        userId,
        role,
      }
    );
  } catch (error) {
    throw error;
  }
}

//     async getUserProfile(userId) {
//   try {
//     const response = await this.database.listDocuments(
//       conf.appwriteDatabaseId,
//       conf.usersCollectionId,
//       [Query.equal("userId", userId)]
//     );

//     return response.documents[0] || null;
//   } catch (error) {
//     throw error;
//   }
// }
async updateUserProfile(documentId, data) {
  try {
    return await this.database.updateDocument(
      conf.appwriteDatabaseId,
      conf.usersCollectionId,
      documentId,
      data
    );
  } catch (error) {
    throw error;
  }
}
async createCategory(data) {
  try {
    return await this.database.createDocument(
      conf.appwriteDatabaseId,
      conf.categoriesCollectionId,
      ID.unique(),
      data
    );
  } catch (error) {
    throw error;
  }
}

async getCategories() {
  try {
    const response = await this.database.listDocuments(
      conf.appwriteDatabaseId,
      conf.categoriesCollectionId
    );

    return response.documents;
  } catch (error) {
    throw error;
  }
}

async updateCategory(documentId, data) {
  try {
    return await this.database.updateDocument(
      conf.appwriteDatabaseId,
      conf.categoriesCollectionId,
      documentId,
      data
    );
  } catch (error) {
    throw error;
  }
}

async deleteCategory(documentId) {
  try {
    return await this.database.deleteDocument(
      conf.appwriteDatabaseId,
      conf.categoriesCollectionId,
      documentId
    );
  } catch (error) {
    throw error;
  }
}
// Create Question
async createQuestion(data) {
    try {
        return await this.database.createDocument(
            conf.appwriteDatabaseId,
            conf.questionsCollectionId,
            ID.unique(),
            data
        );
    } catch (error) {
        throw error;
    }
}

// Get Questions
async getQuestions() {
    try {
        const response = await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.questionsCollectionId
        );

        return response.documents;
    } catch (error) {
        throw error;
    }
}

// Update Question
async updateQuestion(documentId, data) {
    try {
        return await this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.questionsCollectionId,
            documentId,
            data
        );
    } catch (error) {
        throw error;
    }
}

// Delete Question
async deleteQuestion(documentId) {
    try {
        await this.database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.questionsCollectionId,
            documentId
        );
    } catch (error) {
        throw error;
    }
}
async getQuestionsByCategory(categoryId) {
  try {
    const response = await this.database.listDocuments(
      conf.appwriteDatabaseId,
      conf.questionsCollectionId,
      [
        Query.equal("categoryId", categoryId)
      ]
    );

    return response.documents;
  } catch (error) {
    throw error;
  }
}
// ---------------- RESULTS ----------------

async createResult({
  interviewId,
  userId,
  score,
  communication,
  technicalKnowledge,
  problemSolving,
  feedback,
  strengths,
  weaknesses,
  suggestions,
  category,
}) {
  try {
    return await this.database.createDocument(
      conf.appwriteDatabaseId,
      conf.resultsCollectionId,
      ID.unique(),
      {
        interviewId,
        userId,
        score,
        communication,
        technicalKnowledge,
        problemSolving,
        feedback,
        strengths,
        weaknesses,
        suggestions: Array.isArray(suggestions)
    ? suggestions.map(s =>
        typeof s === "object"
            ? `${s.title}|${s.link}`
            : String(s)
      )
    : [],
        category,
      }
    );
  } catch (error) {
    throw error;
  }
}

async getResult(resultId) {
  try {
    return await this.database.getDocument(
      conf.appwriteDatabaseId,
      conf.resultsCollectionId,
      resultId
    );
  } catch (error) {
    throw error;
  }
}

async getUserResults(userId) {

    try {

        const response =
            await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.resultsCollectionId,
                [
                    Query.equal("userId", userId),
                    Query.orderDesc("$createdAt"),
                ]
            );

        return response.documents;

    } catch (error) {

        throw error;

    }

}
async getTotalCategories() {

    const response =
        await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.categoriesCollectionId
        );

    return response.total;

}

async getTotalQuestions() {

    const response =
        await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.questionsCollectionId
        );

    return response.total;

}
async getUsers() {
    try {
        const response = await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.usersCollectionId
        );

        return response.documents;

    } catch (error) {
        throw error;
    }
}
// ---------------- STORAGE ----------------

async uploadFile(file) {

    try {

        return await this.storage.createFile(
            conf.bucketId,
            ID.unique(),
            file
        );

    } catch (error) {

        throw error;

    }

}

// async uploadFile(file) {
//     try {
//         return await this.storage.createFile(
//             conf.bucketId,
//             ID.unique(),
//             file
//         );
//     } catch (error) {
//         console.error("Upload Error:", error);
//         console.error("Message:", error.message);
//         console.error("Code:", error.code);
//         console.error("Type:", error.type);
//         throw error;
//     }
// }
getFileUrl(fileId) {

    return this.storage.getFileView(
        conf.bucketId,
        fileId
    );

}

getFileView(fileId) {

    return this.storage.getFileView(
        conf.bucketId,
        fileId
    ).toString();

}
// update profile
async updateProfile(documentId, data) {

    try {

        return await this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.usersCollectionId,
            documentId,
            data
        );

    } catch (error) {

        console.log(error);
    console.log(error.message);
    console.log(error.response);

    }

}
async getUserProfile(userId) {

    try {

        const response =
            await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.usersCollectionId,
                [
                    Query.equal("userId", userId),
                ]
            );

        return response.documents[0];

    } catch (error) {

        throw error;

    }

}
async getAllUsers() {
    try {
        const response = await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.usersCollectionId
        );

        return response.documents;
    } catch (error) {
        throw error;
    }
}
async getTotalResults() {
    const response = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.resultsCollectionId
    );

    return response.total;
}

async getAverageScore() {
    const response = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.resultsCollectionId
    );

    if (response.documents.length === 0) return 0;

    const total = response.documents.reduce(
        (sum, item) => sum + Number(item.score),
        0
    );

    return Math.round(total / response.documents.length);
}

async getResults() {
    const response = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.resultsCollectionId
    );

    return response.documents;
}
async deleteResult(resultId) {

    try {

        await this.database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.resultsCollectionId,
            resultId
        );

    } catch (error) {

        throw error;

    }

}
}

const databaseService = new DatabaseService();

export default databaseService;