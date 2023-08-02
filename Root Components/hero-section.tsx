"use client"
import React, { useState } from 'react'
import Banner from './Banner'
import { cn } from '@/lib/utils'

type bannerType = {
    heading: String,
    images: String,
}[]

export default function HeroSection() {
    const [currentIndex, setcurrentIndex] = useState(0)
    const banners: bannerType =
        [
            {
                heading: "Step up your style with our trendy collections",
                images: "assets/Group-hero-3.png"
            },
            {
                heading: "Match up the trend with our collections",
                images: "assets/Group-hero-4.png"
            }
        ]
    return (
        <section className={cn('relative overflow-y-hidden h-[90vh]')}>
            <div className='h-full transition-all duration-300 ease-linear relative' 
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}>
                {banners.map((items, index) => (
                    <div key={index} className='h-full'>
                        <Banner images={items.images} heading={items.heading} />
                    </div>
                ))}
            </div>
            <div className='sm:bottom-[10%] bottom-[5%] absolute z-10 right-[15%] flex sm:gap-3 items-center'>
                <p onClick={() => setcurrentIndex(0)} className={`border p-8 rounded-full w-8 h-8 text-4xl flex justify-center items-center cursor-pointer transition-all duration-150 ease-linear ${currentIndex === 0 ? " bg-black text-white border-black sm:scale-100 scale-75 " : "sm:scale-75 scale-50 bg-[#EFEDED] text-black hover:bg-white hover:text-black border-white"} `}>1</p>
                <p onClick={() => setcurrentIndex(1)} className={`border p-8 rounded-full w-8 h-8 text-4xl flex justify-center items-center cursor-pointer transition-all duration-150 ease-linear ${currentIndex === 1 ? " bg-black text-white border-black sm:scale-100 scale-75 " : "sm:scale-75 scale-50 bg-[#EFEDED] text-black hover:bg-white hover:text-black border-white"} `}>2</p>
            </div>
        </section>
    )
}
