import Link from 'next/link'
import Headings from '@/components/ui/Headings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import React from 'react'
import SampleModal from '@/components/modals/sample-modal'
import { Category } from '@prisma/client'
import { ProductsColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'


interface ProductsClientProps {
    data: ProductsColumn[]
}
export default function ProductsClient({data}: ProductsClientProps) {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Headings title={`Products (${data.length})`} description='Manage products of your store from here' />
                <Link href={`/admin/products/new`}>
                    <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Add New
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable searchKey='name' columns={columns} data={data}/>
        </>
    )
}
