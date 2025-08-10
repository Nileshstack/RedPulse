import Blood from "@/models/Blood";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async(request)=>{
    const {bloodGroup,quantity,status,location,phone} =await request.json();
    await connect();
    const newBlood = new Blood(
        {
          bloodGroup,
          quantity,
          status,
          location,
          phone
        }
    )
    try {
        await newBlood.save()
        //send Message
         return new NextResponse("Blood Details has been Saved",{
        status:201,
        newBlood
    });
    } catch (error) {
        console.log(error)
         return new NextResponse(error.message,{
        status:500,
    });
    }
} 

export const GET = async (request)=>{
    try {
        await connect()
        const blood = await Blood.find()
        return new NextResponse(JSON.stringify(blood), {status:200});
    } catch (error) {
        return new NextResponse("Database Error", {status:500});
    }
}