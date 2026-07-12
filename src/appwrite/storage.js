import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client;
  storage;

  constructor() {
    this.client = new Client();

    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

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

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        conf.bucketId,
        fileId
      );
    } catch (error) {
      throw error;
    }
  }

  getFileUrl(fileId) {
    return this.storage.getFileView(
      conf.bucketId,
      fileId
    );
  }
}

const storageService = new StorageService();

export default storageService;