// The following code defines a configuration object named 'conf' that retrieves environment variables using import.meta.env.
const conf = {
	// Retrieving the Appwrite URL environment variable and converting it to a string
	appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
	// Retrieving the Appwrite Project ID environment variable and converting it to a string
	appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
	// Retrieving the Appwrite Database ID environment variable and converting it to a string
	appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
	// Retrieving the Appwrite Collection ID environment variable and converting it to a string
	appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
	// Retrieving the Appwrite Bucket ID environment variable and converting it to a string
	appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
	tinyMCEApiKey : String(import.meta.env.VITE_TINYMCE_API_KEY),
  };
  
  // Exporting the 'conf' configuration object for use in other parts of the application
  export default conf;
  