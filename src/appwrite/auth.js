import { Client, Account } from 'appwrite';
import conf from '../conf/conf.js';

class Auth {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async signUp(email, password, name) {
    try {
      const response = await this.account.create('unique()', email, password, name);
      console.log('User signed up:', response);
      return response;
    } catch (error) {
      console.error('Error signing up:', error);
      console.log(error)
    }
  }

  async logIn(email, password) {
    try {
      const response = await this.account.createEmailPasswordSession(email, password);
      console.log('User logged in:', response);
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  async logOut() {
    try {
      const response = await this.account.deleteSession('current');
      console.log('User logged out:', response);
      return response;
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.account.get();
      console.log('Current user:', response);
      return response;
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  }
}

const auth = new Auth();
export default auth;
