"use client"
import qs from 'query-string'
import { Colors } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';



interface FilterProps {
    data: Colors[];
    name: string;
    valueKey: string;
}

export default function ColorFilter({ data, name, valueKey }: FilterProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const selectedValue = searchParams.get(valueKey)
    const clickHandler = (id: string) => {
        const current = qs.parse(searchParams.toString())
        const query = {
            ...current,
            [valueKey]: id,
        }
        if (current[valueKey] === id) {
            query[valueKey] = null
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true });
        router.push(url);
    }
    return (
        <div>
            <h3 className='text-lg font-semibold'>{name}</h3>
            <div className="flex items-center gap-2 flex-wrap">
                {data.map((filter) => (
                    <Button key={filter.id} onClick={() => clickHandler(filter.id)} variant={'outline'} className={cn('w-10 h-10 rounded-full shrink-0 grow-0', selectedValue === filter.id && "border-2 border-gray-600 p-1 shadow-xl")}
                        style={{ backgroundColor: filter.value }}
                    />
                ))}

            </div>
        </div>
    )
}
