//conf is a configuration module that contains Appwrite's endpoint URL, project ID, database ID, collection ID, and bucket ID.
import conf from '../conf/conf';
//Client, ID, Databases, Storage, and Query are imported from the Appwrite SDK. 
import { Client, ID, Databases, Storage, Query } from "appwrite";

//Client is used to initialize the connection to Appwrite.
//ID is used for generating unique IDs
//Databases is for database operations
//Storage is for file storage operations.
//Query is used for querying documents.

//The Service class provides methods to create, update, delete, and retrieve posts, as well as to upload, delete, and get previews of files using Appwrite. 
export class Service {
    //A Client object is created and stored in this.client.
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

    ///1.Method to create a new post:-
    //createPost is an asynchronous method that creates a new document (post) in the specified collection.
    //It takes an object  with title, slug, content, featuredImage, status, and userId as arguments.
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            // It uses the createDocument method from Databases to create a new document with the provided data.
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

    ///2.Method to update an existing post:-
    //updatePost is an asynchronous method that updates an existing document (post) in the specified collection:-
    //It takes a slug and an object with title, content, featuredImage, and status as arguments.
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            //It uses the updateDocument method from Databases to update the document with the provided data.
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

    ///3.Method to delete a post:-
    //deletePost is an asynchronous method that deletes a document (post) from the specified collection.
    //It takes a slug as an argument.
    async deletePost(slug) {
        try {
            //It uses the deleteDocument method from Databases to delete the document.
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

    ///4.Method to get a single post by slug:-
    //getPost is an asynchronous method that retrieves a document (post) by its slug.
    async getPost(slug) {
        try {
            //It uses the getDocument method from Databases to get the document.
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

    ///5.Method to get multiple posts with optional query parameters
    //getPosts is an asynchronous method that retrieves multiple documents (posts) with optional query parameters.
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
           //It uses the listDocuments method from Databases to list the documents based on the provided queries.
           //The default query is to get documents where status is "active".
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

    ///6.Method to upload a file
    //uploadFile is an asynchronous method that uploads a file to the specified bucket.
    //It takes a file as an argument.
    async uploadFile(file) {
        try {
            //It uses the createFile method from Storage to upload the file with a unique ID:-
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

    ///7.Method to delete a file
    //deleteFile is an asynchronous method that deletes a file from the specified bucket.
   //It takes a fileId as an argument.
    async deleteFile(fileId) {
        try {
            //It uses the deleteFile method from Storage to delete the file.
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
            //If an error occurs, it logs the error and returns false; otherwise, it returns true.
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    ///8.Method to get a file preview:-
    //getFilePreview is a method that gets a preview of the specified file from the bucket.
    //It takes a fileId as an argument.
    getFilePreview(fileId) {
        //It uses the getFilePreview method from Storage to get the file preview.
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
