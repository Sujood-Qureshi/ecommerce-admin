import {format} from "date-fns"
import React from 'react'
import ColorsClient from './components/ColorsClient'
import { ColorsColumn } from './components/column'
import prismadb from '@/lib/prismadb'


export default async function page() {
    const colors = await prismadb.colors.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    })

    const formattedColors: ColorsColumn[] = colors.map((item)=>({
        id: item.id,
        color: item.color,
        value: item.value,
        createdAt : format(item.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ColorsClient data={formattedColors}/>
            </div>
        </div>
    )
}
