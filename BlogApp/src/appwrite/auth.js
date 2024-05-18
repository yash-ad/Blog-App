// Import necessary modules
import conf from '../conf/conf';
import { Client, Account ,ID} from "appwrite";

// AuthService class for handling authentication
export class AuthService {
    // Initialize Appwrite client and account objects
    client = new Client();
    account;

    constructor() {
        // Set Appwrite endpoint and project ID
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        // Initialize Account object with the client
        this.account = new Account(this.client);      
    }

    // Method to create a new account
    async createAccount({email, password, name}) {
        try {
            // Create a new account using email, password, and name
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            // If account creation is successful, attempt login
            if (userAccount) {
                return this.login({email, password});
            } else {
                return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Method to login with email and password
    async login({email, password}) {
        try {
            console.log("Attempting to log in with email:", email);
            console.log("Account object:", this.account); // Check if the Account object is properly initialized
            // Create a new session using email and password
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful. Session:", session);
            return session;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    // Method to get current user details
    async getCurrentUser() {
        try {
            // Retrieve current user details from Appwrite
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    // Method to logout user
    async logout() {
        try {
            // Delete all active sessions to logout user
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

// Create a singleton instance of the AuthService
const authService = new AuthService();

// Export the singleton instance as default
export default authService;
