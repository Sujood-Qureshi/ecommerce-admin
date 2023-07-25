import {format} from "date-fns"
import React from 'react'
import CategoryClient from './components/CategoryClient'
import { CategoryColumn } from './components/column'
import prismadb from '@/lib/prismadb'


export default async function page() {
    const categories = await prismadb.category.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    })

    const formattedCategory: CategoryColumn[] = categories.map((item)=>({
        id: item.id,
        name: item.name,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryClient data={formattedCategory}/>
            </div>
        </div>
    )
}
