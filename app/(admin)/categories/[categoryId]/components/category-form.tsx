"use client"
import * as z from "zod"
import { Category } from '@prisma/client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Headings from "@/components/ui/Headings"
import { Separator } from "@/components/ui/separator"
import toast from "react-hot-toast"
import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
interface CategoryFormProps {
    intialData: Category | null
}
const formSchema = z.object({
    name: z.string().min(3)
})
type CategoryFormValues = z.infer<typeof formSchema>
export const CategoryForm: React.FC<CategoryFormProps> = ({ intialData }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const title = intialData ? "Edit Category" : "Create a Category"
    const description = intialData ? "Edit a Category" : "Create a new Category"

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: intialData || {
            name: ''
        }
    })
    const onUpdate = async (data: CategoryFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/categories/${intialData?.id}`, data);
            router.refresh();
            router.push('/categories')
            toast.success("Updated Successfully")

        } catch (error) {
            toast.error("Make sure you removed all the products using this category")
        } finally {
            setLoading(false);
        }
    }
    interface ErrorResponse {
        response: AxiosResponse;
    }

    const isErrorResponse = (error: any): error is ErrorResponse => {
        return error.response !== undefined;
    };
    const onCreate = async (data: CategoryFormValues) => {
        try {
            setLoading(true);
            const response: AxiosResponse = await axios.post(`/api/categories`, data);
            router.refresh();
            router.push('/categories')
            toast.success(`Created Successfully.`);
        } catch (error) {
            if (isErrorResponse(error)) {
                toast.error(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                toast.error('An error occurred.');
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex justify-center items-center w-full h-[80vh]">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {title}
                    </CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                    <CardContent>
                        {intialData ?
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 w-full">
                                    <div className="grid grid-cols-3 gap-8 mt-6">
                                        <FormField
                                            name="name"
                                            control={form.control}
                                            render={({ field }) => (<FormItem>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Category Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>)}
                                        />
                                    </div>
                                    <Button disabled={loading} className="ml-auto" type="submit">Save Changes</Button>
                                </form>
                            </Form>
                            :
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onCreate)} className="space-y-8 w-full">
                                    <div className="grid grid-cols-3 gap-8 mt-6">
                                        <FormField
                                            name="name"
                                            control={form.control}
                                            render={({ field }) => (<FormItem>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Category Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>)}
                                        />
                                    </div>
                                    <Button disabled={loading} className="ml-auto" type="submit">Create</Button>
                                </form>
                            </Form>
                        }
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}
