import dbConnect from "@lib/dbConnect";
import { verifyPassword } from "@services/api/userServices/passwordHandling";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        dbConnect();
        try {
          const result = await verifyPassword(email, password);
          console.log(result);
          return result;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);