import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params: {colorsId: string}}){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {color , value} = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!color){
            return new NextResponse("Color is required", {status: 401});
        }
        if(!value){
            return new NextResponse("Value is required", {status: 401});
        }
        if(!params.colorsId){
            return new NextResponse("Size ID is required", {status: 400})
        }
        const colors = await prismadb.colors.updateMany({
            where:{
                id: params.colorsId
            },
            data:{
                color: color,
                value: value,
            }
        })
        return NextResponse.json(colors)
    } catch (error) {
        console.log('COLOR_ERROR',error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
export async function DELETE(req: Request, {params}:{params: {colorsId: string}}){
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!params.colorsId){
            return new NextResponse("Size ID is required", {status: 400})
        }
        const colors = await prismadb.colors.deleteMany({
            where:{
                id: params.colorsId
            }
        })
        return NextResponse.json(colors)
    } catch (error) {
        console.log('COLORS_ERROR',error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
