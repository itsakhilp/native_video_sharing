import { Account, Client, ID, Avatars, Databases,Query } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.akhil.aora',
    projectId: '6627aa02db06c18dc9ba',
    databaseId: '6627ac32146c049952ef',
    userCollectionId: '6627ac4e8e7c83b0d589',
    videoCollectionId: '6627ac8760370935a5d8',
    storageId: '6627aeed5457d619e747'
}

const { storageId, videoCollectionId, userCollectionId, databaseId, projectId, platform, endpoint } = config;



// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)


export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }
        )
        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailSession(email, password)
        return session;
    }
    catch (error) {
        throw new Error(error);
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]

        )
        if (!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
          databaseId,
         videoCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(7)]
        );
    
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
          databaseId,
         videoCollectionId,
          [Query.search('title',query)]
        );
    
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
          databaseId,
         videoCollectionId,
          [Query.equal('creator',userId)]
        );
    
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}
