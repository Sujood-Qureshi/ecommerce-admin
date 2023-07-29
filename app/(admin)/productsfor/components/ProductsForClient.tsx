import Link from 'next/link'
import Headings from '@/components/ui/Headings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import React from 'react'
import SampleModal from '@/components/modals/sample-modal'
import { Category } from '@prisma/client'
import { ProductForColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'


interface ProductsForClientProps {
    data: ProductForColumn[]
}
export default function ProductsForClient({data}: ProductsForClientProps) {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Headings title={`Produts For (${data.length})`} description='Manage Products For functionality of your store from here' />
                <Link href={`/productsfor/new`}>
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
