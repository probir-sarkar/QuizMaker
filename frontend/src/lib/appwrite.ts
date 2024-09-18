import { Client, Account, ID,Databases } from "appwrite";

const client = new Client();
const databases = new Databases(client);


client.setEndpoint("https://cloud.appwrite.io/v1").setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

export { client, account, databases, ID }