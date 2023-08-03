import { SideFilterModal } from '@/Root Components/Root modals/sidefilter-modal';
import ColorFilter from '@/Root Components/color-filter';
import Filter from '@/Root Components/filter';
import prismadb from '@/lib/prismadb'
import { Category, Colors, Sizes } from '@prisma/client';
import React from 'react'

const getSizes = async () => {
    const sizes = await prismadb.sizes.findMany({});
    return sizes
}
const getColors = async () => {
    const colors = await prismadb.colors.findMany({});
    return colors
}
const getCategories = async () => {
    const categories = await prismadb.category.findMany({});
    return categories
}
export default async function layout({ children }: { children: React.ReactNode }) {
    const sizes: Sizes[] = await getSizes();
    const colors: Colors[] = await getColors();
    const categories: Category[] = await getCategories();
    return (
        <section className='flex w-full'>
            <aside id="sidebar-multi-level-sidebar" className={`static w-72 h-screen transition-transform lg:translate-x-0 right-shadow  lg:block hidden`} aria-label="Sidebar">
                <div className="h-full relative px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col gap-7 pt-5">
                    <Filter valueKey='categoryId' name='Category' data={categories} />
                    <Filter valueKey='sizeId' name='Size' data={sizes} />
                    <ColorFilter valueKey='colorId' name='Color' data={colors} />
                    <div className="ml-3 flex h-7 w-fit items-center lg:hidden absolute right-2 top-4 border border-gray-800 rounded-md">
                    </div>
                </div>
            </aside>
            <main>
                <div className='my-4 mx-6'>
                    <SideFilterModal size={sizes} color={colors} category={categories}/>
                </div>
                {children}
            </main>
        </section>
    )
}