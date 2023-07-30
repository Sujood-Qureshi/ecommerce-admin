"use client"
import * as z from "zod"
import { Colors } from '@prisma/client'
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
interface ColorsFormProps {
    intialData: Colors | null
}
const formSchema = z.object({
    color: z.string().min(1),
    value: z.string().min(4).regex(/^#/, { message: "String must be a valid hex code" })
})
type ColorsFormValues = z.infer<typeof formSchema>
export const ColorsForm: React.FC<ColorsFormProps> = ({ intialData }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const title = intialData ? "Edit Color" : "Create a Color"
    const description = intialData ? "Edit a Color" : "Create a new Color"

    const form = useForm<ColorsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: intialData || {
            color: '',
            value: ''
        }
    })
    const onUpdate = async (data: ColorsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/colors/${intialData?.id}`, data);
            router.refresh();
            router.push('/admin/colors')
            toast.success("Updated Successfully")

        } catch (error) {
            toast.error("Make sure you removed all the products using this Color")
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
    const onCreate = async (data: ColorsFormValues) => {
        try {
            setLoading(true);
            const response: AxiosResponse = await axios.post(`/api/colors`, data);
            router.refresh();
            router.push('/admin/colors')
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
                                            name="color"
                                            control={form.control}
                                            render={({ field }) => (<FormItem>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Color" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>)}
                                        />
                                        <FormField
                                            name="value"
                                            control={form.control}
                                            render={({ field }) => (<FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-x-4">
                                                        <Input disabled={loading} placeholder="Color Value" {...field} />
                                                        <div className="border p-4 rounded-full" style={{backgroundColor: field.value}}/>
                                                    </div>
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
                                            name="color"
                                            control={form.control}
                                            render={({ field }) => (<FormItem>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder="Color" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>)}
                                        />
                                        <FormField
                                            name="value"
                                            control={form.control}
                                            render={({ field }) => (<FormItem>
                                                <FormControl>
                                                <div className="flex items-center gap-x-4">
                                                        <Input disabled={loading} placeholder="Color Value" {...field} />
                                                        <div className="border p-4 rounded-full" style={{backgroundColor: field.value}}/>
                                                    </div>
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
