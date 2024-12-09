import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarGroupContent, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "./ui/skeleton"
import { currentUser } from '@clerk/nextjs/server'

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Create",
        url: "/dashboard/create",
        icon: Plus,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export default async function DashBoardSidebar() {
    const user = await currentUser()
    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className="font-semibold text-blue-500 drop-shadow">HabitTrack</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex justify-between px-4">
                    <Suspense fallback={<Skeleton className={"w-[28px] h-[28px] rounded-full"}/>}>
                        <UserButton/>
                    </Suspense>
                    <Suspense fallback={<Skeleton  className={'w-[10px] h-1'}/>}>
                        <p className="font-medium">{user?.firstName || 'user'}</p>
                    </Suspense>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
