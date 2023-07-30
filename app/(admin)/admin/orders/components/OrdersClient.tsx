import Link from 'next/link'
import Headings from '@/components/ui/Headings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import React from 'react'
import SampleModal from '@/components/modals/sample-modal'
import { Category } from '@prisma/client'
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
