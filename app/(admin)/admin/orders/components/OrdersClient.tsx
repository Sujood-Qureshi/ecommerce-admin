import Headings from '@/components/ui/Headings'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { OrdersColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'


interface OrdersClientProps {
    data: OrdersColumn[]
}
export default function OrdersClient({data}: OrdersClientProps) {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Headings title={`Orders (${data.length})`} description='Manage orders of your store from here' />
            </div>
            <Separator />
            <DataTable searchKey='products' columns={columns} data={data}/>
        </>
    )
}
