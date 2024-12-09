import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getHabits } from "@/lib/data"


export default async function Dashboard() {
    const habits = await getHabits()
    return (
        <div className="grid md:grid-cols-4 py-3 px-1.5">
            {habits.map((habit) => (
                <Card key={habit.id}>
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardDescription>Target: {habit.goalType}</CardDescription>
                            <CardDescription 
                                className={`font-semibold ${habit.category.name === 'health' ? 'text-green-500' 
                                    : habit.category.name === 'work'  ? 'text-orange-500' 
                                    : habit.category.name === 'fitness' ? 'text-blue-500' 
                                    : habit.category.name === 'school' ? 'text-yellow-500'   
                                    : habit.category.name === 'personal-development' ? 'text-purple-500' 
                                    : 'text-gray-500'
                                }`}>
                                    {(habit.category.name).toUpperCase()}
                            </CardDescription>
                        </div>
                        <Separator />
                        <CardTitle>{habit.name}</CardTitle>
                        <CardDescription>{habit.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}