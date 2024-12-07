import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashBoardSidebar from "@/components/dashboard-sidebar"
import { UserButton } from "@clerk/nextjs"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"


export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <DashBoardSidebar />
            <main className="p-6 px-8 w-dvw">
                <div className="flex items-center justify-between w-full">
                    <SidebarTrigger />
                    <Suspense fallback={<Skeleton className={"w-[28px] h-[28px] rounded-full"}/>}>
                        <UserButton/>
                    </Suspense>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}
