import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

// const corsHeaders = {

// }

export async function POST(req: Request){
    const  {productIds} = await req.json();
    if(!productIds || productIds.length === 0){
        return new NextResponse("Product IDs is required", {status:400})
    }
    const products = await prismadb.products.findMany({
        where:{
            id:{
                in: productIds
            }
        }
    })
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    products.forEach((product)=>{
        line_items.push({
            quantity: 1,
            price_data:{
                currency: 'INR',
                product_data:{
                    name: product.name
                },
                unit_amount: Number(product.price) * 100
            }
        })
    })
    const order = await prismadb.order.create({
        data:{
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string)=> ({
                    product:{
                        connect:{
                            id: productId
                        }
                    }
                }))
            }
        }
    })
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
            enabled: true
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/checkout?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/checkout?canceled=1`,
        metadata:{
            orderId: order.id
        }
    })
    return NextResponse.json({url: session.url})
}