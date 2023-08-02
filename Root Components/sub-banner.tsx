import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'


type SubBannerProps = {
    heading: String,
    para: String,
    link: String,
    imagePath: String,
    male: Boolean,
}
export default function SubBanner({ heading, para, link, imagePath, male }: SubBannerProps) {
    return (
        <div className={`col-span-6 sm:flex-row flex-col flex rounded-md pt-4 pl-4 ${male ? "bg-slate-50" : "bg-[#F9E7E6]"} `}>
            <div className='flex flex-col justify-evenly gap-4 lg:gap-0'>
                <h4 className='font-semibold text-lg text-black '>{heading}</h4>
                <p className='font-normal text-base text-gray-600 '>{para}</p>
                <Button variant={'default'} className={cn('w-fit')}>
                    Explore Now
                </Button>
            </div>
            <div className='relative w-full sm:max-h-96 h-60'>
                <Image
                    src={`/${imagePath}`}
                    alt=''
                    fill
                    className=' mx-auto object-contain'
                />
            </div>
        </div>
    )
}
