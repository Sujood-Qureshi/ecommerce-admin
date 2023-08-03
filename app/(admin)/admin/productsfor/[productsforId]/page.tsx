import React from 'react'
import { ProductForForm } from './components/productsfor-form'
import prismadb from '@/lib/prismadb';
import { ProductsFor } from '@prisma/client';

export default async function Page({ params }: { params: { productsforId: string } }) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    let productsfor: ProductsFor | null = null;
    // Validate if productsforId matches ObjectId pattern
    if (objectIdPattern.test(params.productsforId)) {
        // Redirect to the home page if it's not a valid ObjectId
        // redirect('/'); // Replace this with your home page URL
        // return null; // Return null since we don't want to render anything on this page
        productsfor = await prismadb.productsFor.findFirst({
            where: {
                id: params.productsforId
            }
        })
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <div className='flex items-center justify-between'>
                    <ProductForForm intialData={productsfor} />
                </div>
            </div>
        </div>
    )
}
