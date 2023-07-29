import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params: {sizesId: string}}){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {name, value} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!name){
            return new NextResponse("Name is required", {status: 401});
        }
        if(!value){
            return new NextResponse("Value is required", {status: 401});
        }
        if(!params.sizesId){
            return new NextResponse("Size ID is required", {status: 400})
        }
        const size = await prismadb.sizes.updateMany({
            where:{
                id: params.sizesId
            },
            data:{
                name: name,
                value: value,
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log('SIZES_ERROR',error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
export async function DELETE(req: Request, {params}:{params: {sizesId: string}}){
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!params.sizesId){
            return new NextResponse("Size ID is required", {status: 400})
        }
        const size = await prismadb.sizes.deleteMany({
            where:{
                id: params.sizesId
            }
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log('SIZES_ERROR',error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
