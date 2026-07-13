import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
import databaseService from "./database";

export class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client();

    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // Create Account
  async createAccount({ email, password, name }) {
  try {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (!userAccount) return null;

    const session = await this.login({ email, password });

    // ✅ Now passing name and email
    await databaseService.createUserProfile({
      userId: userAccount.$id,
      name,   // ← add this
      email,  // ← add this
    });

    return session;
  } catch (error) {
    throw error;
  }
}

// Create Account this was just for checking the flow of authentication 
// async createAccount({ email, password, name }) {
//   try {
//     // Step 1: Create Auth Account
//     const userAccount = await this.account.create(
//       ID.unique(),
//       email,
//       password,
//       name
//     );

//     console.log("User Account:", userAccount);

//     if (!userAccount) {
//       return null;
//     }

//     // Step 2: Login
//     const session = await this.login({
//       email,
//       password,
//     });

//     console.log("Session:", session);

//     // Step 3: Check Current User
//     const currentUser = await this.getCurrentUser();

//     console.log("Current User:", currentUser);

//     // Step 4: Create User Profile
//     const profile = await databaseService.createUserProfile({
//       userId: userAccount.$id,
//     });

//     console.log("Profile Created:", profile);

//     return session;

//   } catch (error) {
//     console.error("Signup Error:", error);
//     throw error;
//   }
// }
  // Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      throw error;
    }
  }

  // Current User
  async getCurrentUser() {
    try {
        const authUser = await this.account.get();

        const profile = await databaseService.getUserProfile(authUser.$id);

        return {
            ...profile,        // profile fields first (college, bio etc.)
            ...authUser,       // ✅ authUser second so authUser.$id always wins
            profileDocId: profile?.$id,  // ✅ store profile doc id separately
        };

    } catch (error) {
        return null;
    }
}

  // Logout
  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;