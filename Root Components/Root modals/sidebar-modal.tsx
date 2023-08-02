"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Colors, ProductsFor, Sizes } from "@prisma/client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const SideBarModal = ({ data }: { data: ProductsFor[] }) => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null;
    }

    const routes = data.map((route) => ({
        href: `/products/${route.id}`,
        label: route.name,
        active: pathname === `/products/${route.id}`
    }))
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant={'ghost'} className={cn("lg:hidden")}>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
                <aside className="mt-6">
                    <div className='flex flex-col gap-4'>
                        {
                            routes.map((route) => (
                                <SheetClose asChild key={route.href}>
                                    <Link href={route.href} className={`${route.active ? "bg-gray-900 text-white " : "text-gray-700 hover:bg-gray-700 hover:text-white"} rounded-md px-3 py-2 text-base font-medium block`}>{route.label}</Link>
                                </SheetClose>
                            ))
                        }

                    </div>
                </aside>
            </SheetContent>
        </Sheet>
    )
}