import ClientNavBar from "@/Root Components/ClientNavBar";
import Footer from "@/Root Components/Footer";

export default async function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ClientNavBar/>
            {children}
            <Footer/>
        </>
    )
}