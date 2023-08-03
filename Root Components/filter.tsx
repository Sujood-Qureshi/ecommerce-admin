"use client"
import qs from 'query-string'
import { Category, Colors, Sizes } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';



interface FilterProps {
    data: (Sizes | Colors | Category)[];
    name: string;
    valueKey: string;
}

export default function Filter({ data, name, valueKey }: FilterProps) {
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
            <div className="py-2 space-y-2 ml-5 flex flex-col">
                {data.map((filter) => (
                    <Button key={filter.id} onClick={() => clickHandler(filter.id)} variant={'outline'} className={cn('min-w-fit', selectedValue === filter.id && "bg-gray-800 text-white")}>
                        {
                            // @ts-ignore                        
                            filter.name
                        }
                    </Button>
                ))}

            </div>
        </div>
    )
}
