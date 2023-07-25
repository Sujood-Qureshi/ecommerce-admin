import React from 'react'

interface headingsProps {
    title: string,
    description: string
}
export default function Headings({ title, description }: headingsProps) {
    return (
        <div>
            <h1 className='font-bold text-2xl'>{title}</h1>
            <p className='font-normal text-sm'>{description}</p>
        </div>
    )
}
