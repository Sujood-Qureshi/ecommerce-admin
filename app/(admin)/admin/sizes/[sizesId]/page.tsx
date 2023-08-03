import React from 'react'
import { SizesForm } from './components/sizes-form'
import prismadb from '@/lib/prismadb';
import { Sizes } from '@prisma/client';

export default async function Page({ params }: { params: { sizesId: string } }) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    let sizes: Sizes | null = null;
    // Validate if productsforId matches ObjectId pattern
    if (objectIdPattern.test(params.sizesId)) {
        // Redirect to the home page if it's not a valid ObjectId
        // redirect('/'); // Replace this with your home page URL
        // return null; // Return null since we don't want to render anything on this page
        sizes = await prismadb.sizes.findFirst({
            where: {
                id: params.sizesId
            }
        })
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <div className='flex items-center justify-between'>
                    <SizesForm intialData={sizes} />
                </div>
            </div>
        </div>
    )
}
