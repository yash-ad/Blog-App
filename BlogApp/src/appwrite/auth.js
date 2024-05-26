// Import necessary classes from the Appwrite SDK
import { Client, Account, ID } from "appwrite";

// Import configuration from a separate file
import conf from "../conf/conf.js";

// Log the configuration to the console for debugging purposes
console.log("Appwrite Configuration:", conf);

// Define and export an AuthService class to handle authentication
export class AuthService {
  // Initialize the client as an instance variable
  client = new Client();
  // Declare an account instance variable
  account;

  // Constructor to configure the Appwrite client and account instances
  constructor() {
    this.client
      // Set the API endpoint from the configuration
      .setEndpoint(conf.appwriteUrl)
      // Set the project ID from the configuration
      .setProject(conf.appwriteProjectId);
    // Initialize the account instance with the configured client
    this.account = new Account(this.client);
  }

  // Method to create a new user account
  async createAccount({ email, password, name }) {
    try {
      // Generate a unique ID for the new user
      const id = ID.unique();
      // Create the user account with the provided email, password, and name
      const userAccount = await this.account.create(id, email, password, name);
      if (userAccount) {
        // If the account creation is successful, log in the user
        return this.login({ email, password });
      } else {
        // Return the user account if creation was not fully successful
        return userAccount;
      }
    } catch (error) {
      // Throw any errors that occur during account creation
      throw error;
    }
  }

  // Method to log in a user with email and password
  async login({ email, password }) {
    try {
      // Create a session for the user with email and password
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      // Throw any errors that occur during login
      throw error;
    }
  }

  // Method to get the current logged-in user
  async getCurrentUser() {
    try {
      // Retrieve the current user's account details
      return await this.account.get();
    } catch (error) {
      // Log any errors that occur during retrieval
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    // Return null if an error occurs
    return null;
  }

  // Method to log out the current user
  async logout() {
    try {
      // Delete all sessions for the current user, effectively logging them out
      await this.account.deleteSessions();
    } catch (error) {
      // Log any errors that occur during logout
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

// Create a singleton instance of AuthService
const authService = new AuthService();

// Export the singleton instance for use in other parts of the application
export default authService;
