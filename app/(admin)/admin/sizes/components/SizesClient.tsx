import Link from 'next/link'
import Headings from '@/components/ui/Headings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import React from 'react'
import { SizesColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'


interface SizesClientProps {
    data: SizesColumn[]
}
export default function SizesClient({data}: SizesClientProps) {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Headings title={`Sizes (${data.length})`} description='Manage Sizes for your products from here' />
                <Link href={`/admin/sizes/new`}>
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
