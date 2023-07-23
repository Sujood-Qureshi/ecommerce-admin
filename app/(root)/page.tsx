import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div  className="p-4">
            <p>admin dashbaord</p>
            <Button>click me</Button>
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}
