"use client"

import React from 'react'
import * as z from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const formSchema = z.object({
    name: z.string().min(3),
})

export default function SampleModal() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: '',
        }
    })
    const onSubmit = async(values: z.infer<typeof formSchema>) =>{
        console.log('onSubmit called', values);
    }
    return (
        <div>
            <div className='space-y-4 py-4 pb-2'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name='name'
                        render={({field})=>(<FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='example form' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>)}
                        />
                        <div className='pt-6 space-x-6 flex items-center justify-end w-full'>
                            <Button type='submit'>Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
