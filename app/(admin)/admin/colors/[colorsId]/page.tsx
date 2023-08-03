import React from 'react'
import { ColorsForm } from './components/colors-form'
import prismadb from '@/lib/prismadb';
import { Colors } from '@prisma/client';

export default async function Page({ params }: { params: { colorsId: string } }) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    let colors: Colors | null = null;
    // Validate if productsforId matches ObjectId pattern
    if (objectIdPattern.test(params.colorsId)) {
        // Redirect to the home page if it's not a valid ObjectId
        // redirect('/'); // Replace this with your home page URL
        // return null; // Return null since we don't want to render anything on this page
        colors = await prismadb.colors.findFirst({
            where: {
                id: params.colorsId
            }
        })
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <div className='flex items-center justify-between'>
                    <ColorsForm intialData={colors} />
                </div>
            </div>
        </div>
    )
}
