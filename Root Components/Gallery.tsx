"use client"
import { Image as image } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Gallery({imageData}:{imageData: image[]}) {
    const [CurrentImage, setcurrentImage] = useState(imageData[0].url);
    return (
        <div>
            <div className='w-full h-3/4 border border-gray-800 rounded-md lg:p-4 p-1 aspect-square relative'>
                <Image
                src={CurrentImage}
                alt='image'
                fill
                className="h-full w-full object-contain object-center rounded-md bg-gray-100"
                />
            </div>
            <div className='flex items-center py-3 gap-2'>
                {imageData.map((image)=> <div key={image.id} onClick={()=> setcurrentImage(image.url)} className=' w-1/5 aspect-square border border-gray-800 rounded-md lg:p-4 p-1 relative cursor-pointer'>
                <Image
                src={image.url}
                alt='image'
                fill
                className="h-full w-full object-cover object-center rounded-md bg-gray-100"
                />
                </div>)}
            </div>
        </div>
    )
}
