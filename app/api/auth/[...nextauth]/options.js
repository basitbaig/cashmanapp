import { connectMongoDB } from "@/dblib/dbmongo";
import User from "@/model/user";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProviders from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProviders({
            type: "credentials",
            credentials: {
                email: {
                    label: "Email", type: "email", placeholder: "user@example.com"                    
                },
                password: {
                    label: "Password", type: "password"
                }
            },
            async authorize(credentials, req){
                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email, isactive: true });

                    if (!user) {
                        throw new Error("Invalid Email or Password!");
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        throw new Error("Invalid Email or Password!");
                    }
                    if (user) {                        
                        return user;
                    } else {
                        return null;
                    }

                } catch (error) {
                    console.log("Error:", error);
                }
            },        
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },    

};