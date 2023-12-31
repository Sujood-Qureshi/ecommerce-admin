"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Home, Menu, ShieldAlert } from 'lucide-react';
import { Button } from './ui/button';
export default function NavBar() {
  const path = usePathname();
  const [SideBar, setSideBar] = useState(false);

  useEffect(() => {
  }, [path])
  const routes = [
    {
      href: '/admin/productsfor',
      label: 'Products For',
      active: path === '/admin/productsfor',
    },
    {
      href: '/admin/categories',
      label: 'Categories',
      active: path === '/admin/categories',
    },
    {
      href: '/admin/sizes',
      label: 'Sizes',
      active: path === '/admin/sizes',
    },
    {
      href: '/admin/colors',
      label: 'Colors',
      active: path === '/admin/colors',
    },
    {
      href: '/admin/products',
      label: 'Products',
      active: path === '/admin/products',
    },
    {
      href: '/admin/orders',
      label: 'Orders',
      active: path === '/admin/orders',
    }
  ];
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
                  {routes.map((route) => {
                    return <Link key={route.href} href={route.href} className={`${route.active ? "bg-gray-900 text-white " : "text-gray-700 hover:bg-gray-700 hover:text-white"} rounded-md px-3 py-2 text-base font-medium block`}>{route.label}</Link>
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
          {routes.map((route) => {
            return <Link key={route.href} href={route.href} className={`${route.active ? "bg-gray-900 text-white " : "text-gray-700 hover:bg-gray-700 hover:text-white"} rounded-md px-3 py-2 text-base font-medium block`}>{route.label}</Link>
          })}
        </div>
      </div>
    </nav>
  )
}
