import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { sendMessage } from "@/utils/sendMessage";

export const POST = async(request)=>{
    const {name,email,password,role}=await request.json();

        await connect();
        const hashedPassword = await bcrypt.hash(password,8)
        const newUser = new User(
            {
                name,
                email,
                password: hashedPassword,
                role
            }
        )
    try {
        await newUser.save()
        await sendMessage({name, email})
         return new NextResponse("User has been created",{
        status:201,
        newUser
    });
    } catch (error) {
        return new NextResponse(error.message,{
        status:500,
    }); 
    }
}