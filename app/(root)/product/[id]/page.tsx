import Gallery from '@/Root Components/Gallery';
import ProductCard from '@/Root Components/product-card';
import getProducts from '@/actions/get-products'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatter } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
    const product = await getProducts({ id: params.id });
    const suggestedProducts = await getProducts({ categoryId: product[0].category.id })
    return (
        <div>
            <div className="pt-6 grid grid-cols-6 gap-5 lg:grid-rows-2 lg:grid-cols-12">
                <div className="md:mx-auto mt-6 max-w-2xl sm:px-6 max-h-[80vh]  grow-0 mx-4 aspect-square col-span-6">
                    <Gallery imageData={product[0].images} />
                </div>

                <div className="mx-auto md:max-w-2xl lg:max-w-xl xl:max-w-3xl px-4 pb-16 pt-10 sm:px-6 lg:col-span-5 col-span-6 row-span-2">
                    <div className="lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product[0].name}</h1>
                    </div>

                    <div className="mt-4 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{formatter.format(Number(product[0].price))}</p>

                        <div className="mt-10">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                <div className="mt-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                            <p aria-hidden="true" className="h-8 w-8 rounded-full border border-black border-opacity-10" style={{ backgroundColor: product[0].color.value }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                </div>
                                <div className="mt-4">
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        <div className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                            <span id="size-choice-1-label" className='capitalize'>{product[0].size.value}</span>

                                            <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Button link={'#'} text={'Add to bag'}/> */}
                            <Button variant='default' className='mt-4'>
                                <ShoppingCart className='h-6 w-6 mr-2' />
                                Add to cart
                            </Button>
                        </div>
                    </div>

                    <div className="py-10 lg:border-gray-200 lg:pb-16">
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    <li className="text-gray-400"><span className="text-gray-600">Hand cut and sewn locally</span></li>
                                    <li className="text-gray-400"><span className="text-gray-600">Dyed with our proprietary colors</span></li>
                                    <li className="text-gray-400"><span className="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
                                    <li className="text-gray-400"><span className="text-gray-600">Ultra-soft 100% cotton</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator />
            <div className='my-20 px-10 xl:px-0 mx-auto overflow-x-hidden max-w-7xl'>
                <h2 className='mx-auto w-fit font-semibold text-3xl'>Related Products</h2>
                <div className='flex gap-8 overflow-x-scroll scrollHidden py-20 mx-auto'>
                    {suggestedProducts.map((product) => (<ProductCard key={product.id} productData={product} />))}
                </div>
            </div>
        </div>
    )
}
