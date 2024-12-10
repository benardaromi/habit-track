import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getHabits } from "@/lib/data"
import { formatDistanceToNowStrict } from "date-fns"
import LogHabitButton from "@/components/log-habit-button"
import { CircularProgressWithLabel } from "@/lib/utils"


export default async function Dashboard() {
    const habits = await getHabits()

    return (
        <div className="grid md:grid-cols-3 gap-4 py-3 px-1.5">
            {habits.map((habit) => (
                <Card key={habit.habitId} className="border-none">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardDescription>{formatDistanceToNowStrict(new Date(habit.createdAt))}</CardDescription>
                            <CardDescription 
                                className={`font-semibold ${habit.category === 'health' ? 'text-green-500' 
                                    : habit.category.name === 'work'  ? 'text-orange-500' 
                                    : habit.category.name === 'fitness' ? 'text-blue-500' 
                                    : habit.category.name === 'school' ? 'text-yellow-500'   
                                    : habit.category.name === 'personal-development' ? 'text-purple-500' 
                                    : 'text-gray-500'
                                }`}>
                                    {(habit.category).toUpperCase()}
                            </CardDescription>
                        </div>
                        <Separator />
                        <CardTitle>{habit.name}</CardTitle>
                        <CardDescription>{habit.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col">
                            <div className="flex">
                                <CircularProgressWithLabel value={habit.progress} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <LogHabitButton habitId={habit.habitId}/>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}