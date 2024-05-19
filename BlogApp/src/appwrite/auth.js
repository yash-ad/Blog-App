// Import necessary modules
import conf from '../conf/conf';
import { Client, Account ,ID} from "appwrite"; //Imported from Appwrite SDK (Software Development Kit):-
//Client is used to initialize the connection to Appwrite.
//Account is used for managing user accounts.
//ID is used for generating unique IDs.




//AuthService is a class that manages authentication-related operations.
//The AuthService class provides methods to create a new user account, log in, get details of the currently logged-in user, and log out:-
export class AuthService {
 //A Client object is created and stored in this.client.
    client = new Client();
    account;

    constructor() {
        // Set Appwrite endpoint and project ID
        this.client
        //setEndpoint sets the Appwrite API endpoint using the URL from the configuration.
            .setEndpoint(conf.appwriteUrl)
            //setProject sets the Appwrite project ID from the configuration.
            .setProject(conf.appwriteProjectId);
//An Account object is initialized with the client and stored in this.account.
        this.account = new Account(this.client);      
    }

    ///1.Method to create a new account:-

    //createAccount is an asynchronous method that creates a new user account.
    //It takes an object with email, password, and name as arguments.
    async createAccount({email, password, name}) {
        try {
            // Create a new account using email, password, and name:-
            //ID.unique() generates a unique ID for the new account.
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            //If account creation is successful, it calls the login method to log the user in and returns the session.
            if (userAccount) {
                return this.login({email, password});
            } else {
                return  userAccount;
            }
            //If account creation fails , it throws an error:-
        } catch (error) {
            throw error;
        }
    }

    ///2.Method to login with email and password:-
    //login is an asynchronous method that logs a user in using their email and password.
    async login({email, password}) {
        try {
            //Debugging
            console.log("Attempting to log in with email:", email);
            //Check if the Account object is properly initialized
            console.log("Account object:", this.account);
            // Create a new session using email and password
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful. Session:", session);
            return session;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    ///3.Method to get current user details:-
    //getCurrentUser is an asynchronous method that retrieves details of the currently logged-in user.
    async getCurrentUser() {
        try {
            //It uses the 'get' method of the Account object.
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    ///4.Method to logout user:-
    //logout is an asynchronous method that logs out the user.
    async logout() {
        try {
            //It deletes all active sessions for the user using deleteSessions.
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
