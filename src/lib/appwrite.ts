import { Client, Account, ID } from "appwrite";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66e558b3002507b869cb");

const account = new Account(client);

export { client, account, ID }