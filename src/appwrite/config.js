import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createEvent({ title, description, date, location, image, hostUserId, isVirtual, registrationLink, tags }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        ID.unique(),
        {
          title,
          description,
          date,
          location,
          image,
          hostUserId,
          isVirtual,
          registrationLink,
          tags,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createEvent :: error", error);
    }
  }

  async updateEvent(id, { title, description, date, location, image, isVirtual, registrationLink, tags }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        id,
        {
          title,
          description,
          date,
          location,
          image,
          isVirtual,
          registrationLink,
          tags,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateEvent :: error", error);
    }
  }

  async deleteEvent(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteEvent :: error", error);
      return false;
    }
  }

  async getEvent(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: getEvent :: error", error);
      return false;
    }
  }

  async getEvents(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getEvents :: error", error);
      return false;
    }
  }

  async createRegistration({ eventId, userId, registrationDate, status }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteRegistrationsCollectionId,
        ID.unique(),
        {
          eventId,
          userId,
          registrationDate,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createRegistration :: error", error);
    }
  }

  async getRegistrations(queries) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteRegistrationsCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getRegistrations :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
