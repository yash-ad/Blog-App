//Lets build an authentication service for our App:-

import config from '../config/config';
import {Client,Account,ID} from "appwrite";

//Lets create a class:-
export class AuthService{
//Make a new property 
client = new Client();
account;
//Whenever the new object made ,a new constructor method to call itself.
constructor(){
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

this.account = new Account();
}

//Lets make an account:-
//For Signup (createAccount:-
//Because of promise return , we are here using async await
//using try...catch blocks is a good practice, 
//especially when dealing with asynchronous operations like network requests or interactions with external services, as they can potentially throw errors.
async createAccount({email, password, name}) {
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            // call another method
     return this.login({email,password})
        } else {
           return  userAccount;
        }
    } catch (error) {
        throw error;
    }
}
//For SignIn (login):-
async login({email,password}){
    try {
        return await this.account.createEmailSession(email, password); 
    } catch (error) {
      throw error  
    }
}
//For user (CurrentUser):-
async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
throw error;
    }

    return null;
}

// For Signout(logout):-
async logout() {
    try {
        await this.account.deleteSessions();
    } catch (error) {
throw error;
    }
}
}
//Because of we have created a 'class' we need a new object:-
const authService = new AuthService();
export default authService;