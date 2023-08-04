"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { CreditCard } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function BuyNow({id}:{id:string}) {
    const onCheckout = async(productId: string)=>{
        const items = [productId]
        const response = await axios.post(`/api/checkout`,{
            productIds: items.map((item)=>item)
        })
        window.location = response.data.url
    }
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <Button onClick={()=>onCheckout(id)} variant='default' className='mt-4'>
            <CreditCard className='h-6 w-6 mr-2'/>
            Buy Now
        </Button>
    )
}
