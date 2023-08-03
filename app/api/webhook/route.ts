import Stripe from 'stripe'
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import prismadb from '@/lib/prismadb'

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;
    let event: Stripe.Event;    

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
    } catch (err: any) {
        return new NextResponse(`webhook error: ${err.message}`, { status: 400 })
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponent = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country
    ]
    const addressString = addressComponent.filter((c) => c !== null).join(', ');
    if (event.type === 'checkout.session.completed') {
        const order = await prismadb.order.update({
            where: {
                id: session?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || '',
            },
            include: {
                orderItems: true
            }
        })
        const productIds = order.orderItems.map((orderItem) => orderItem.productId)
        await prismadb.products.updateMany({
            where: {
                id: {
                    in: [...productIds]
                }
            },
            data: {
                isArchived: true,
            }
        })
    }
    return new NextResponse(null,{status: 200})
}