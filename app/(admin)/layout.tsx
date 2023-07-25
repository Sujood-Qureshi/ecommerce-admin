import DashboardNavbar from "@/components/DashboardNavbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"
export default async function layout({ children }: { children: React.ReactNode }) {
    const { userId } = auth()
    if (!userId) {
        redirect('/sign-in')
    }
    const existingUser = await prismadb.users.findFirst({
        where:{
            userId: userId,
        }
    })
    if (!existingUser) {
        await prismadb.users.create({
            data:{
                userId: userId,
            }
        })
    }
    const isUserAdmin = await prismadb.users.findFirst({
        where:{
            AND:[
                {
                    userId: userId
                },
                {
                    isAdmin: true
                }
            ]
        }
    })
    if(!isUserAdmin){
        redirect('/')
    }
    return (
        <div>
            <DashboardNavbar/>
            {children}
        </div>
    )
}