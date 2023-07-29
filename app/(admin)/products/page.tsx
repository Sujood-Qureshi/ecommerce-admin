import {format} from "date-fns"
import React from 'react'
import ProductsClient  from './components/ProductsClient'
import { ProductsColumn } from './components/column'
import prismadb from '@/lib/prismadb'
import { formatter } from "@/lib/utils"


export default async function page() {
    const products = await prismadb.products.findMany({
        orderBy:{
            createdAt: 'desc'
        },
        include:{
            category: true,
            size: true,
            color: true,
            productFor: true,
        }
    })

    const formattedProducts: ProductsColumn[] = products.map((item)=>({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price),
        category: item.category.name,
        size: item.size.name,
        color: item.color.color,
        productfor: item.productFor.name,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductsClient data={formattedProducts}/>
            </div>
        </div>
    )
}
