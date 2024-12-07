import { AlignJustify } from "lucide-react";

export default function Nav() {
    return (
        <div className="flex justify-around  w-full items-center fixed shadow top-0 left-0 right-0 py-3 opacity-90 backdrop-blur-sm">
            <h1 className='font-extrabold drop-shadow text-blue-500'>HabitTrack</h1>
            <AlignJustify/>
        </div>
    )
}