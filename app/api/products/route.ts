import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
        images, } = body;
    console.log('this is a body of products route.ts ', body);
    try {
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
            return new NextResponse("Image is required", { status: 400 })
        }
        const product = await prismadb.products.create({
            data: {
                name: name,
                categoryId: categoryId,
                price: price,
                isFeatured: isFeatured,
                isArchived: isArchived,
                colorId: colorId,
                sizeId: sizeId,
                productForId: productForId,
            }
        })
        for (const image of images) {
            await prismadb.image.create({
                data: {
                    url: image.url,
                    productId: product.id,
                },
            });
        }
        return NextResponse.json(product)
    } catch (error) {
        console.log('PRODUCTS_POST_ERROR', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const id = searchParams.get('id') || undefined;
        const productForId = searchParams.get('productForId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        const product = await prismadb.products.findMany({
            where: {
                id: id,
                categoryId: categoryId,
                colorId: colorId,
                sizeId: sizeId,
                productForId: productForId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log('PRODUCTS_GET_ERROR', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}