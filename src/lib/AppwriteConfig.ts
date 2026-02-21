

import { Client, Account, TablesDB, Databases, Storage ,  ID , Query } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT as string) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID as string);   

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const bucket = new Storage(client);
export const databases = new Databases(client);

export {client , ID , Query}
