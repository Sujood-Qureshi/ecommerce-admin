"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Category, Colors, Sizes } from "@prisma/client";
import { Filter as Filterr } from "lucide-react";
import { useEffect, useState } from "react";
import ColorFilter from "../color-filter";
import Filter from "../filter";

export const SideFilterModal = ({ size, color, category }: { size: Sizes[], color: Colors[], category: Category[] }) => {
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
                <Button variant={'outline'} className={cn("lg:hidden")}>
                    <Filterr />
                    Filter
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
                <aside className="mt-6">
                    <div className='flex flex-col gap-4'>
                        <Filter valueKey='categoryId' name='Category' data={category} />
                        <Filter valueKey='sizeId' name='Size' data={size} />
                        <ColorFilter valueKey='colorId' name='Color' data={color} />
                    </div>
                </aside>
                <div className="flex justify-end w-full">
                    <SheetClose asChild>
                        <Button className="mt-6">
                            Close
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}