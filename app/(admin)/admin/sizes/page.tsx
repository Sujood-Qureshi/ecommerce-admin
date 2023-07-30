import {format} from "date-fns"
import React from 'react'
import SizesClient from './components/SizesClient'
import { SizesColumn } from './components/column'
import prismadb from '@/lib/prismadb'


export default async function page() {
    const sizes = await prismadb.sizes.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    })

    const formattedSizes: SizesColumn[] = sizes.map((item)=>({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SizesClient data={formattedSizes}/>
            </div>
        </div>
    )
}
