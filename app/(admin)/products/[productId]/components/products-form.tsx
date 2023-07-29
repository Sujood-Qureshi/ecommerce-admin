"use client"
import * as z from "zod"
import { Category, Colors, Image, Products, ProductsFor, Sizes } from '@prisma/client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Headings from "@/components/ui/Headings"
import { Separator } from "@/components/ui/separator"
import toast from "react-hot-toast"
import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ImageUpload from "@/components/ui/image-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
interface ProductsFormProps {
    intialData: Products & {
        images: Image[]
    } | null;
    categories: Category[];
    colors: Colors[];
    sizes: Sizes[];
    productfor: ProductsFor[];
}
const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    productForId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})
type ProductsFormValues = z.infer<typeof formSchema>
export const ProductsForm: React.FC<ProductsFormProps> = ({ intialData, categories, colors, sizes, productfor }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const title = intialData ? "Edit Product" : "Create a Product"
    const description = intialData ? "Edit a product" : "Create a new product"

    const form = useForm<ProductsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: intialData ? {
            ...intialData,
            price: parseFloat(String(intialData?.price))
        } : {
            name: '',
            images: [],
            price: 0,
            categoryId: '',
            colorId: '',
            sizeId: '',
            productForId:'',
            isFeatured: false,
            isArchived: false
        }
    })
    const onUpdate = async (data: ProductsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/products/${intialData?.id}`, data);
            router.refresh();
            router.push('/products')
            toast.success("Updated Successfully")

        } catch (error) {
            toast.error("something went wrong")
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
    const onCreate = async (data: ProductsFormValues) => {
        console.log('this is from onCreate function ',data);
        try {
            setLoading(true);
            const response: AxiosResponse = await axios.post(`/api/products`, data);
            router.refresh();
            router.push('/products')
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
                                    <FormField
                                        name="images"
                                        control={form.control}
                                        render={({ field }) => (<FormItem>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value.map((image) => image.url)}
                                                    disable={loading}
                                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>)}
                                    />
                                    <div className="grid grid-cols-3 gap-8 mt-6">
                                        <FormField
                                            name="name"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Name</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder="eg. Polo Tshirt" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="price"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Price</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} placeholder="eg. 9.99" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="categoryId"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Category</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a category"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="colorId"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Color</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a Color"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {colors.map((color) => (
                                                                <SelectItem key={color.id} value={color.id}>
                                                                    {color.color}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="sizeId"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Size</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a size"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {sizes.map((size) => (
                                                                <SelectItem key={size.id} value={size.id}>
                                                                    {size.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="productForId"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product For</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a product for"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {productfor.map((productforlist) => (
                                                                <SelectItem key={productforlist.id} value={productforlist.id}>
                                                                    {productforlist.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="isFeatured"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            Featured
                                                        </FormLabel>
                                                        <FormDescription>
                                                            this product will appear on the homepage
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="isArchived"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            Archived
                                                        </FormLabel>
                                                        <FormDescription>
                                                            this product will not appear on store
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>)}
                                        />
                                    </div>
                                    <Button disabled={loading} className="ml-auto" type="submit">Save Changes</Button>
                                </form>
                            </Form>
                            :
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onCreate)} className="space-y-8 w-full">
                                    <FormField
                                        name="images"
                                        control={form.control}
                                        render={({ field }) => (<FormItem>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value.map((image) => image.url)}
                                                    disable={loading}
                                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>)}
                                    />
                                    <div className="grid grid-cols-3 gap-8 mt-6">
                                        <FormField
                                            name="name"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Name</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder="eg. Polo Tshirt" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="price"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Price</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} placeholder="eg. 9.99" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="categoryId"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Category</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a category"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="colorId"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Color</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a Color"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {colors.map((color) => (
                                                                <SelectItem key={color.id} value={color.id}>
                                                                    {color.color}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="sizeId"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Size</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a size"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {sizes.map((size) => (
                                                                <SelectItem key={size.id} value={size.id}>
                                                                    {size.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="productForId"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product For</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a product for"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {productfor.map((productforlist) => (
                                                                <SelectItem key={productforlist.id} value={productforlist.id}>
                                                                    {productforlist.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="isFeatured"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            Featured
                                                        </FormLabel>
                                                        <FormDescription>
                                                            this product will appear on the homepage
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>)}
                                        />
                                        <FormField
                                            name="isArchived"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            Archived
                                                        </FormLabel>
                                                        <FormDescription>
                                                            this product will not appear on store
                                                        </FormDescription>
                                                    </div>
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
