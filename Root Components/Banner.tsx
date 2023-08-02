import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'


type BannerProps = {
    heading: String,
    images: String,
}
export default function Banner({ heading, images }: BannerProps) {
    return (
        <div className={cn('grid grid-cols-12 gap-5 sm:h-full h-[90%] grid-rows-2')}>
            <div className='relative col-span-full sm:row-span-full flex flex-col gap-4 h-full justify-center sm:items-start items-center w-full sm:col-start-2 sm:col-end-5 row-span-1'>
                <h1 className='text-3xl lg:text-5xl text-[#434242] font-bold leading-10 lg:leading-[4.6875rem] lg:tracking-[0.3rem] w-fit text-center sm:text-left uppercase mx-auto'>{heading}</h1>
                <Button className={cn('w-fit')}>
                    Shop Now
                </Button>
            </div>
            <div className='col-span-full h-full row-span-2  sm:col-start-6 sm:col-end-13 md:col-end-12 sm:items-center  items-start flex relative'>
                <Image
                src={`/${images}`}
                alt=''
                className='object-cover sm:mx-auto'
                fill
                />
            </div>
        </div>
    )
}
