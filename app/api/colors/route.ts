import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { color, value } = body;
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const isCategoryExist = await prismadb.colors.findFirst({
            where: {
                color: color
            }
        })
        if(isCategoryExist){
            return new NextResponse("Color is already exist", { status:401})
        }
        const size = await prismadb.colors.create({
            data:{
                color: color,
                value: value,
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log('COLOR_ERROR', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}