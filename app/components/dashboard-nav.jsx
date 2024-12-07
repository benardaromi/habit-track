import { UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export default function DashBoardNav() {
    return (
        <div className="flex justify-around  w-full items-center fixed shadow top-0 left-0 right-0 py-3 opacity-90 backdrop-blur-sm">
            <h1 className='font-bold drop-shadow text-blue-500'>Dashboard</h1>
            <Suspense fallback={<Skeleton className={"w-[28px] h-[28px] rounded-full"}/>}>
                <UserButton/>
            </Suspense>
        </div>
    )
}