import Nav from "@/components/nav";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-8 grid items-center w-dvw">
      <div className="flex flex-col w-full relative">
        <Nav/>
        <div className="flex flex-col w-full py-8 space-y-4">
          <h1 className="font-extrabold text-gray-800 text-lg md:text-xl text-center">Where every habit <span className="text-rose-400">counts,</span> and every streak <span className="text-blue-400">matters</span></h1>
          <div className="flex flex-col ring-1 ring-inset p-2 rounded ring-gray-900/10 -m-2">
            <div className="bg-blue-200 min-h-[18rem] flex">
              <div className="h-full w-1/4">
                
              </div>
              <div className="h-full w-3/4">
                
              </div>
            </div>
          </div>
          <Link href={'/dashboard'} className="relative m-auto bg-blue-400 text-white shadow-md p-2 px-4 rounded">Get Started</Link> 
          <div className="bg-slate-100 p-2 shadow rounded">
            <h1 className="font-semibold">Create Habits</h1>
            <p className="text-pretty">Record habits, determine the frequencies and watch your data grow!</p>
          </div>
          <div className="bg-slate-100 p-2 shadow rounded">
            <h1 className="font-semibold">Analytics</h1>
            <p className="text-pretty">Gain insights, personalized from your data</p>
          </div>
          <div className="bg-slate-100 p-2 shadow rounded">
            <h1 className="font-semibold">Track your progress</h1>
            <p className="text-pretty">Monitor your progress by maintaining logging streaks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
