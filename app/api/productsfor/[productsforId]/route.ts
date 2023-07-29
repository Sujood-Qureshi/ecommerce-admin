import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params: {productsforId: string}}){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {name} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!name){
            return new NextResponse("Name is required", {status: 401});
        }
        if(!params.productsforId){
            return new NextResponse("Category ID is required", {status: 400})
        }
        const category = await prismadb.productsFor.updateMany({
            where:{
                id: params.productsforId
            },
            data:{
                name: name,
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log('CATEGORY_ERROR',error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
export async function DELETE(req: Request, {params}:{params: {productsforId: string}}){
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!params.productsforId){
            return new NextResponse("Category ID is required", {status: 400})
        }
        const category = await prismadb.productsFor.deleteMany({
            where:{
                id: params.productsforId
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log('CATEGORY_ERROR',error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
