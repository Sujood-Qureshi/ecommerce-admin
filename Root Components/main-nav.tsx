"use client"
import { ProductsFor } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function MainNav({data}:{data: ProductsFor[]}) {
    const pathname = usePathname();

    const routes = data.map((route)=>({
        href: `/products/${route.id}`,
        label: route.name,
        active: pathname === `/products/${route.id}`
    }))
    return (
        <div className='flex gap-4'>
            {
                routes.map((route)=> (
                    <Link key={route.href} href={route.href} className={`${route.active ? "bg-gray-900 text-white " : "text-gray-700 hover:bg-gray-700 hover:text-white"} rounded-md px-3 py-2 text-base font-medium block`}>{route.label}</Link>
                ))
            }
            
        </div>
    )
}
