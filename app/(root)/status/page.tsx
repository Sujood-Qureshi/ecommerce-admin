"use client"
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";
import { Ban, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    const [status, setStatus] = useState(false)
    const removeAll = useCart((state) => state.removeAll);
    const searchParams = useSearchParams();
    useEffect(() => {
        if (searchParams.get('success')) {
            setStatus(true)
            removeAll()
        }
        if (searchParams.get('canceled')) {
            setStatus(false)
        }
    }, [searchParams, removeAll])
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <>
            {status ?
                <div className="overflow-y-auto overflow-x-hidden flex h-[90vh] justify-center items-center w-full bg-black/50">
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                <Check className="w-8 h-8 text-green-500 dark:text-green-400" />
                                <span className="sr-only">Success</span>
                            </div>
                            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Payment completed successfully</p>
                            <Link href={'/'}>
                                <Button>
                                    Back To Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div> : <div className="overflow-y-auto overflow-x-hidden flex h-[90vh] justify-center items-center w-full bg-black/50">
                    <div className=" p-4 w-full max-w-md h-full md:h-auto">
                        <div className=" p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                <Ban className="w-8 h-8 text-red-500 dark:text-red-400" />
                                <span className="sr-only">Error</span>
                            </div>
                            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Sorry something went wrong!</p>
                            <Link href={'/'}>
                                <Button>
                                    Back To Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            }</>)
}