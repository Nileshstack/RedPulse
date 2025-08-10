import User from "@/models/User";

import NextAuth from "next-auth";
import bcrypt from 'bcryptjs'  
import  CredentialsProvider from 'next-auth/providers/credentials'
import connect from "@/utils/db";



const handler = NextAuth({
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"credentials",
            async authorize(credentials){
                await connect()
                try{
                    const user = await User.findOne({email: credentials.email})
                    console.log("Fetched user from DB:", user);
                    if(user){
                        const isPasswordCorrect= await bcrypt.compare(credentials.password, user.password) 
        
                        if(isPasswordCorrect && credentials.role === user.role){
                            return {
                                id: user._id.toString(),
                                name: user.name,
                                email: user.email,
                                role: user.role,
                            };
                        }
                        else{
                            throw new Error ("Wrong Credentials!") 
                        }
                    }else{
                    throw new Error("User not found")
                }
                }catch (error) {
  console.error("Authorize error:", error);
  throw error;
}
            }
        })
    ],
    callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
     pages:{
        error:"/validate/login"
    }
})
export {handler as GET, handler as POST}