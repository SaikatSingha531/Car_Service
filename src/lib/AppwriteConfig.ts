

import { Client, Account, TablesDB } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT as string) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID as string);                 // Your project ID

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export {client}
