import {NextAuthOptions, Session} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import {connectToDBWithMongoClient} from "@/lib/mongodb/db";

export interface ExtendedSession extends Session {
    user_id: string;
}

// This would initiate the MongoDB connection and cache the client and database.
const clientPromise = connectToDBWithMongoClient();

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: "prompt_forge",
        collections: {
            Users: "users",
            Accounts: "accounts",
            Sessions: "sessions",
        },
    }),
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            return true;
        },
        async session({session, user, token}) {
            const user_id = user.id as string;
            return {user_id, ...session};
        },
    }
};