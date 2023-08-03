import { Overview } from '@/components/overview'
import Headings from '@/components/ui/Headings'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import { formatter } from '@/lib/utils'
import { CreditCard, DollarSign, Package } from 'lucide-react'
import React from 'react'

const totalRevenue = async()=>{
    const paidOrder = await prismadb.order.findMany({
        where:{
            isPaid: true,
        },
        include:{
            orderItems:{
                include:{
                    product: true,
                }
            }
        }
    });
    const grandTotal = paidOrder.reduce((total, order)=>{
        const orderTotal = order.orderItems.reduce((orderSum, item)=>{
            return orderSum = item.product.price;
        },0)
        return total = orderTotal
    },0);
    return grandTotal;
}

interface GraphData{
    name: string,
    total: number
}
const graphRevenue = async()=>{
    const paidOrder = await prismadb.order.findMany({
        where:{
            isPaid: true,
        },
        include:{
            orderItems:{
                include:{
                    product: true,
                }
            }
        }
    });
    const monthlyRevenue: {[key: number]: number} = {};
    for (const order of paidOrder) {
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;
        for (const item of order.orderItems) {
            revenueForOrder += Number(item.product.price)
        }
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
    }
    const graphData: GraphData[] = [
        {name: "Jan", total: 0},
        {name: "Feb", total: 0},
        {name: "Mar", total: 0},
        {name: "Apr", total: 0},
        {name: "May", total: 0},
        {name: "Jun", total: 0},
        {name: "Jul", total: 0},
        {name: "Aug", total: 0},
        {name: "Sep", total: 0},
        {name: "Oct", total: 0},
        {name: "Nov", total: 0},
        {name: "Dev", total: 0},
    ];
    for (const month in monthlyRevenue){
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }
    return graphData;
}
const totalSales = async()=>{
    const salesCount = await prismadb.order.count({
        where:{
            isPaid: true,
        }
    })
    return salesCount
}
const totalProducts = async()=>{
    const productsCount = await prismadb.products.count({
        where:{
            isArchived: false
        }
    })
    return productsCount
}
export default async function page() {
    const getTotalRevenue = await totalRevenue();
    const getTotalSales = await totalSales();
    const getTotalProducts = await totalProducts();
    const getgraphRevenue = await graphRevenue();
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <Headings title='Dashboard' description='Overview of your store'/>
                <Separator/>
                <div className='grid gap-4 grid-cols-3'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Revenue
                            </CardTitle>
                            <DollarSign className='h-4 w-4 text-muted-foreground'/>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                {formatter.format(Number(getTotalRevenue))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Sales
                            </CardTitle>
                            <CreditCard className='h-4 w-4 text-muted-foreground'/>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                +{getTotalSales}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Products
                            </CardTitle>
                            <Package className='h-4 w-4 text-muted-foreground'/>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                {getTotalProducts}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className='col-span-4'>
                    <CardHeader>
                        <CardTitle>
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='pl-2'>
                        <Overview data={getgraphRevenue}/>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}
