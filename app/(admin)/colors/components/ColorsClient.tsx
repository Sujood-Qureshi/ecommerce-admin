import Link from 'next/link'
import Headings from '@/components/ui/Headings'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import React from 'react'
import SampleModal from '@/components/modals/sample-modal'
import { Category } from '@prisma/client'
import { ColorsColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'


interface ColorsClientProps {
    data: ColorsColumn[]
}
export default function ColorsClient({data}: ColorsClientProps) {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Headings title={`Colors (${data.length})`} description='Manage Colors for your products from here' />
                <Link href={`/colors/new`}>
                    <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Add New
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable searchKey='color' columns={columns} data={data}/>
        </>
    )
}
