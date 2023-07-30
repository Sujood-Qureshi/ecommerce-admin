"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Home, Menu, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prismadb from '@/lib/prismadb';
import { ProductsFor } from '@prisma/client';
import axios from 'axios';
export default function ClientNavBar() {
    const path = usePathname();
    const [SideBar, setSideBar] = useState(false);
    const [Routes, setroutes] = useState<ProductsFor[]>();

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const res = await axios.get('/api/categories');
                const data = res.data;
                setroutes(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchRoutes();
    }, [path, Routes])

    return (
        <nav className="bg-white shadow-md relative">
            <div className='relative bg-white z-[99]'>
                <div className="mx-auto max-w-[95%] px-2 sm:px-6 lg:px-8">
                    <div className="relative bg-white flex h-16 items-center justify-between lg:py-5">
                        {/* hamberger menu - start */}
                        <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                            <button onClick={() => setSideBar(!SideBar)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-black" aria-controls="mobile-menu" aria-expanded="false">
                                <Menu />
                            </button>
                        </div>
                        {/* hamberger menu - end */}

                        {/* big device navigation - start */}
                        <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href={'/admin'}>
                                    <Button variant={'outline'} className='mx-6'>
                                        <ShieldAlert className='mr-2 h-4 w-4' />
                                        Admin Page
                                    </Button>
                                </Link>
                            </div>
                            <div className="hidden lg:ml-6 lg:block">
                                <div className="flex space-x-4 relative">
                                    {Routes?.map((route) => {
                                        return <Link key={route.id} href={`/products/${route.id}`} className={`${path === `/products/${route.id}` ? "bg-gray-900 text-white " : "text-gray-700 hover:bg-gray-700 hover:text-white"} rounded-md px-3 py-2 text-base font-medium block`}>{route.name}</Link>
                                    })}
                                    {/* dropdown menu  */}
                                </div>
                            </div>
                        </div>
                        <Link href={'/'}>
                            <Button variant={'outline'} className='mx-6'>
                                <Home className='mr-2 h-4 w-4' />
                                Back to Home
                            </Button>
                        </Link>
                        <div className='border border-gray-500 rounded-full p-1'>
                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>
            {/* side bar  */}
            <div className={`lg:hidden absolute w-full bg-white z-50 ${SideBar ? "-translate-y-0 shadow-md" : "-translate-y-full"} transition-transform duration-300 ease-in-out`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {Routes?.map((route) => {
                        return <Link key={route.id} href={`/products/${route.id}`} className={`${path === `/products/${route.id}` ? "bg-gray-900 text-white " : "text-gray-700 hover:bg-gray-700 hover:text-white"} rounded-md px-3 py-2 text-base font-medium block`}>{route.name}</Link>
                    })}
                </div>
            </div>
        </nav>
    )
}
