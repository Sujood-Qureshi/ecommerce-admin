import ClientNavBar from "@/Root Components/ClientNavBar";

export default async function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ClientNavBar/>
            {children}
        </>
    )
}