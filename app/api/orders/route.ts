import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { name } = body;
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const isCategoryExist = await prismadb.category.findFirst({
            where: {
                name: name,
            }
        })
        if(isCategoryExist){
            return new NextResponse("Category is already exist", { status:401})
        }
        const category = await prismadb.category.create({
            data:{
                name: name,
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log('CATEGORY_ERROR', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}