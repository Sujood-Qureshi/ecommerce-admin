
import NoProducts from '@/Root Components/no-products'
import ProductCard from '@/Root Components/product-card'
import getProducts from '@/actions/get-products'
import React from 'react'

export default async function page({ params, searchParams }: { params: { productForId: string }, searchParams: { colorId: string, sizeId: string, categoryId: string } }) {

    const products = await getProducts({ productForId: params.productForId, colorId: searchParams.colorId, sizeId: searchParams.sizeId, categoryId: searchParams.categoryId });

    return (
        <div>
            {products.length === 0 && <div className='flex items-center justify-center mx-auto lg:w-[80vw] w-screen h-screen'><NoProducts/></div>}
            <div className="p-4 flex flex-wrap gap-2  md:gap-4 lg:justify-normal justify-center">
                {/* <SideBarModal data={''}/> */}
                {products.map((product)=> <div key={product.id} className='w-64'><ProductCard productData={product}/></div>)}
            </div>
        </div>
    )
}
