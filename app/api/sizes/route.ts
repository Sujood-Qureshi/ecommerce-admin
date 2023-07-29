import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, value } = body;
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const isCategoryExist = await prismadb.sizes.findFirst({
            where: {
                name: name
            }
        })
        if(isCategoryExist){
            return new NextResponse("Size is already exist", { status:401})
        }
        const size = await prismadb.sizes.create({
            data:{
                name: name,
                value: value,
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log('CATEGORY_ERROR', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}