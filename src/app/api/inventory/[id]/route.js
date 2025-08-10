import Blood from "@/models/Blood";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const DELETE = async (request,{params})=>{
    const {id}= params;
    try {
       await connect();
       await Blood.findByIdAndDelete(id);
       return new NextResponse("Post deleted successfully",{status:200}) 
    } catch (error) {
        return new NextResponse("Database Error",{status:500})
    }
}