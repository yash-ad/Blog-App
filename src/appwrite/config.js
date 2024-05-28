// Import configuration and necessary classes from Appwrite SDK
import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Define Service class to interact with Appwrite services
export class Service {
    // Initialize client, databases, and bucket instances
    client = new Client();
    databases;
    bucket;
    
    // Constructor to configure Appwrite client and services
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        // Initialize databases and bucket with the configured client
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //1.Method to create a new post in the database
    async createPost({ title,slug, content, featuredImage, status, userId }) {
        try {
            // Create a document in the specified database collection
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    //2.Method to update an existing post in the database
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            // Update the document with the specified slug
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    //3.Method to delete a post from the database.
    async deletePost(slug) {
        try {
            // Delete the document with the specified slug
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true; // Return true if deletion is successful
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false; // Return false if deletion fails
        }
    }

    // Method to retrieve a post from the database by its slug
    async getPost(slug) {
        try {
            // Retrieve the document with the specified slug
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false; // Return false if retrieval fails
        }
    }

    // Method to retrieve posts from the database based on queries
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            // List documents from the database collection based on queries
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false; // Return false if retrieval fails
        }
    }

    // Method to upload a file to the storage bucket
    async uploadFile(file) {
        try {
            // Create a file in the specified bucket with a unique ID
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false; // Return false if upload fails
        }
    }

    // Method to delete a file from the storage bucket
    async deleteFile(fileId) {
        try {
            // Delete the file with the specified ID from the bucket
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true; // Return true if deletion is successful
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false; // Return false if deletion fails
        }
    }

    // Method to get a preview of a file from the storage bucket
    // filePreview doesn't return a promise. So, we are not making an async function for it. Instead, directly calling it.
    seeFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

// Create a singleton instance of the Service class
const service = new Service();

// Export the singleton instance for use in other parts of the application
export default service;
