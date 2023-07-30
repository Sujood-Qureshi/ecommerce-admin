import React from 'react'
import { ProductsForm } from './components/products-form'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { Products, Image, Category, Colors, Sizes, ProductsFor } from '@prisma/client';

export default async function Page({ params }: { params: { productId: string } }) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    let product: Products & { images: Image[] } | null = null;
    if (objectIdPattern.test(params.productId)) {
        product = await prismadb.products.findFirst({
            where: {
                id: params.productId
            },
            include:{
                images: true,
            }
        })
    }
    const categories: Category[] = await prismadb.category.findMany()
    const colors: Colors[] = await prismadb.colors.findMany()
    const sizes: Sizes[] = await prismadb.sizes.findMany()
    const productfor: ProductsFor[] = await prismadb.productsFor.findMany()
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <div className='flex items-center justify-between'>
                    <ProductsForm colors={colors} sizes={sizes} categories={categories} productfor={productfor} intialData={product} />
                </div>
            </div>
        </div>
    )
}
