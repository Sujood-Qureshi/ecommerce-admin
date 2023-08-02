"use client"
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { formatter } from '@/lib/utils';
import { Category, Colors, Image as image, Sizes } from '@prisma/client';
import Image from 'next/image';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Toast } from 'react-hot-toast';

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
export default function CartItem({ itemData }: { itemData: Product }) {
    const cart = useCart();

    const onRemove = (id: string) =>{
        cart.removeItem(id);
    }
    return (
        <li className="flex">
            <div className="h-24 w-24 relative flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                    src={itemData.images[0].url}
                    alt='product image'
                    fill
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            {itemData.name}
                        </h3>
                        <p className="ml-4">{formatter.format(Number(itemData.price))}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{
                        itemData.color.color
                    }</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500 capitalize">{itemData.size.value}</p>

                    <div className="flex">
                        <Button onClick={()=>{onRemove(itemData.id)}} variant={'ghost'} className="font-medium">
                            Remove
                        </Button >
                    </div>
                </div>
            </div>
        </li>
    )
}
