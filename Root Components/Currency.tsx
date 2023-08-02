import { formatter } from '@/lib/utils'
import React from 'react'

export default function Currency({value}:{value?: string | number }) {
    return (
        <p className='font-semibold '>
            {formatter.format(Number(value))}
        </p>
    )
}
