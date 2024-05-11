
//Appwrite database,file upload and custom queries:-
import config from '../config/config';
import { Client, Databases, ID,Storage,Query } from "appwrite";


//Lets create a class called 'AppWriteService':-
export class AppWriteService{
//Make a new property 
client = new Client();
databases;
bucket;

constructor(){
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
}

//For creating post or document:-
async createPost({title,slug,content,featuredImage,status,userId}){
try {
    return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
            status,
            userId,
        }

    )
} catch (error) {
   console.log("Appwrite service :: createPost :: error" ,error); 
}
}

//For updating post or document:-
async updatePost(slug, {title, content, featuredImage, status}){
    try {
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,

            }
        )
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error", error);
    }
}

//For deleting post or document:-
async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        
        )
        return true
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error", error);
        return false
    }
}

//For get post or document:-
async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        
        )
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error);
        return false
    }
}

//For get posts or documents:-
async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
            

        )
    } catch (error) {
        console.log("Appwrite service :: getPosts :: error", error);
        return false
    }
}

 ///file upload services below:-


 //For uploading the file:-
 async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error", error);
        return false
    }
}


 //For deleting the file:-
async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error);
        return false
    }
}

//For previewing the file:-
getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
}


}


const appWriteService = new AppWriteService();
export default appWriteService;