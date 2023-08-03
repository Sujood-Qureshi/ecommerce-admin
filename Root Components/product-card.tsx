import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Category, Colors, Image as image, Sizes } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Currency from './Currency';
import { Separator } from '@/components/ui/separator';
import AddToCartButton from './addtocart-button';

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

export default function ProductCard({ productData }: { productData: Product }) {
    return (
        <Card>
            <CardHeader>
                <div className='aspect-square rounded-xl bg-gray-100 relative h-48'>
                    <Link href={`/product/${productData.id}`}>
                        <Image
                            src={productData.images[0].url}
                            alt={productData.name}
                            fill
                            className='aspect-square object-contain rounded-md'
                        />
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2 '>
                    <Link href={`/product/${productData.id}`}>
                        <p className='font-semibold text-base text-gray-600 hover:text-gray-900 select-none'>{productData.name}</p>
                    </Link>
                    <Currency value={productData.price} />
                    <div className='flex justify-between'>
                        <p className='flex items-center gap-1'>{productData.color.color} <span className="h-6 w-6 rounded-full border" style={{ backgroundColor: productData.color.value }} /></p>
                        <p className='p-1 border border-gray-300 rounded-sm flex items-center justify-center w-fit capitalize aspect-square h-8'>{productData.size.value}</p>
                    </div>
                    <Separator />
                    <div className='flex justify-between'>
                        <p className='p-1 border border-gray-300 rounded-sm flex items-center justify-center w-fit text-xs'>{productData.category.name}</p>
                        <AddToCartButton data={productData}/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
