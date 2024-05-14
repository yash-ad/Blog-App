import config from '../config/config';
import { Client, Account, ID } from "appwrite";

/**
 * AuthService class handles authentication-related operations.
 */
class AuthService {
    // Initialize Appwrite client and account properties
    client = new Client();
    account;

    /**
     * Constructor to set up Appwrite client and account.
     */
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account();
    }

    /**
     * Creates a new account.
     * @param {Object} userData - User data (email, password, name)
     * @returns {Object} - User account data or error
     */
    async createAccount({ email, password, name }) {
        try {
            // Create a new account
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            // If account created successfully, login user
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            // Handle errors
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            // Handle errors
            throw error;
        }
    }

    /**
     * Retrieves current user data.
     * @returns {Object} - Current user data or null
     */

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    /**
     * Logs out the current user by deleting sessions.
     */
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            // Handle errors
            throw error;
        }
    }
}

// Create a new instance of AuthService
const authService = new AuthService();
// Export the instance
export default authService;
