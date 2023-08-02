import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prismadb from '@/lib/prismadb';
import { ProductsFor } from '@prisma/client';
import axios from 'axios';
import { SideBarModal } from './Root modals/sidebar-modal';
import MainNav from './main-nav';
import { SideCartModal } from './Root modals/sidecart-modal';


const getRoutes = async()=>{
    const routes = await prismadb.productsFor.findMany({})
    return routes;
}

export default async function ClientNavBar() {
    const fetchRoutes = await getRoutes();
    return (
        <nav className="bg-white shadow-md ">
            <div className=' bg-white z-[99]'>
                <div className="mx-auto max-w-[95%] px-2 sm:px-6 lg:px-8">
                    <div className=" bg-white flex h-16 items-center justify-between lg:py-5">
                        <SideBarModal data={fetchRoutes} />
                        <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href={'/'}>
                                    <Button variant={'outline'} className='mx-6'>
                                        <Store className='mr-2 h-4 w-4'/>
                                        Your Store
                                    </Button>
                                </Link>
                            </div>
                            <div className="hidden lg:ml-6 lg:block w-fit h-fit">
                                <div className="flex space-x-4 my-auto">
                                    <MainNav data={fetchRoutes}/>
                                </div>
                            </div>
                        </div>
                        <SideCartModal/>
                        <div className='border border-gray-500 rounded-full p-1 sm:ml-6 ml-1'>
                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
