// Import necessary modules
import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Service class for handling database operations and file uploads
export class Service {
    // Initialize Appwrite client, databases, and bucket objects
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        // Set Appwrite endpoint and project ID
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        // Initialize Databases object with the client
        this.databases = new Databases(this.client);
        // Initialize Storage object with the client
        this.bucket = new Storage(this.client);
    }

    // Method to create a new post
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            // Create a new document in the specified collection
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // Method to update an existing post
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            // Update an existing document in the specified collection
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // Method to delete a post
    async deletePost(slug) {
        try {
            // Delete a document from the specified collection
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Method to get a single post by slug
    async getPost(slug) {
        try {
            // Retrieve a document from the specified collection
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Method to get multiple posts with optional query parameters
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            // List documents from the specified collection with optional queries
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // Method to upload a file
    async uploadFile(file) {
        try {
            // Create a new file in the specified bucket
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

    // Method to delete a file
    async deleteFile(fileId) {
        try {
            // Delete a file from the specified bucket
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // Method to get a file preview
    getFilePreview(fileId) {
        // Get a preview of the specified file from the bucket
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

// Create a singleton instance of the Service
const service = new Service();

// Export the singleton instance as default
export default service;
