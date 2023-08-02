"use client"
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/use-cart'
import { Category, Colors, Image as image, Sizes } from '@prisma/client'
import { ShoppingCart } from 'lucide-react'
import React, { MouseEventHandler } from 'react'

interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    size: Sizes;
    color: Colors;
    images: image[];
}


export default function AddToCartButton({data}:{data: Product}) {
    const cart = useCart()
    const onAddtoCart:  MouseEventHandler<HTMLButtonElement> = (event) =>{
        event.stopPropagation();
        cart.addItem(data)
    }

    return (
        <Button onClick={onAddtoCart} variant='outline'>
            <ShoppingCart className='h-4 w-4 mr-2' />
            Add to cart
        </Button>
    )
}
