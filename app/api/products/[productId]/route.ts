import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params: {productId: string}}){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {
            name,
            price,
            isFeatured,
            isArchived,
            productForId,
            categoryId,
            sizeId,
            colorId,
            images } = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if (!price) {
            return new NextResponse("Price is required", { status: 400 })
        }
        if (!productForId) {
            return new NextResponse("productForID is required", { status: 400 })
        }
        if (!categoryId) {
            return new NextResponse("CategoryId is required", { status: 400 })
        }
        if (!sizeId) {
            return new NextResponse("SizeId is required", { status: 400 })
        }
        if (!colorId) {
            return new NextResponse("ColorId is required", { status: 400 })
        }
        if (!images || !images.length) {
            return new NextResponse("Name required", { status: 400 })
        }
        if(!params.productId){
            return new NextResponse("Category ID is required", {status: 400})
        }
        await prismadb.products.update({
            where:{
                id: params.productId
            },
            data:{
                name: name,
                price: price,
                categoryId: categoryId,
                colorId: colorId,
                sizeId: sizeId,
                images:{
                    deleteMany:{

                    }
                },
                isFeatured: isFeatured,
                isArchived: isArchived
            }
        });
        const product = await prismadb.products.update({
            where:{
                id: params.productId
            },
            data:{
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:{url: string})=> image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log('PRODUCT_PATCH_ERROR',error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
export async function DELETE(req: Request, {params}:{params: {productId: string}}){
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!params.productId){
            return new NextResponse("Product ID is required", {status: 400})
        }
        const product = await prismadb.products.deleteMany({
            where:{
                id: params.productId
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log('PRODUCT_DELETE_ERROR',error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
