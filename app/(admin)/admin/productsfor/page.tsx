import {format} from "date-fns"
import React from 'react'
import ProductsForClient from './components/ProductsForClient'
import { ProductForColumn } from './components/column'
import prismadb from '@/lib/prismadb'


export default async function page() {
    const productsFor = await prismadb.productsFor.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    })

    const formattedProductFor: ProductForColumn[] = productsFor.map((item)=>({
        id: item.id,
        name: item.name,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductsForClient data={formattedProductFor}/>
            </div>
        </div>
    )
}
