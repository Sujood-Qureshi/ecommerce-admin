"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn, formatter } from "@/lib/utils";
import { Category, Colors, Sizes } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import ColorFilter from "../color-filter";
import Filter from "../filter";
import useCart from "@/hooks/use-cart";
import CartItem from "../cart-item";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const SideCartModal = () => {
    const cart = useCart()
    const items = useCart((state)=> state.items);
    const removeAll = useCart((state)=> state.removeAll);
    const searchParams = useSearchParams();

    const totalPrice  = items.reduce((total, item)=>{
        return total + Number(item.price);
    },0)
    const onCheckout = async()=>{
        const response = await axios.post(`http://localhost:3000/api/checkout`,{
            productIds: items.map((item)=>item.id)
        })
        window.location = response.data.url
    }

    useEffect(()=>{
        if(searchParams.get('success')){
            toast.success("Payment completed successfully")
            removeAll()
        }
        if(searchParams.get('canceled')){
            toast.error("Something went wrong")
        }
    },[searchParams, removeAll])
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant={'outline'}>
                    <ShoppingCart className="sm:w-6 sm:h-6 sm:mr-3 h-3 w-3 mr-1" />
                    <p className="sm:text-lg font-semibold text-base">
                        {cart.items.length}
                    </p>
                </Button>
            </SheetTrigger>
            <SheetContent side={'right'}>
                <div className="flex h-full flex-col overflow-y-scroll scrollHidden">
                    <div className="flex-1 overflow-y-auto scrollHidden">
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                        </div>
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="flex flex-col gap-3 pb-6">
                                    {cart.items.map((item)=> <CartItem key={item.id} itemData={item}/> )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>{formatter.format(Number(totalPrice))}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    </div>
                    <div className="w-full">
                        <SheetClose asChild>
                            <Button onClick={onCheckout} className="mt-6 w-full">
                                Checkout
                            </Button>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}