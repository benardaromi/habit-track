'use server'

import { prisma } from "@/prisma-client"
import { auth } from "@clerk/nextjs/server"
import { startOfWeek, endOfWeek } from "date-fns";

export async function getHabits() {
    const { userId } = await auth();

    if (!userId) {
        return { error: 'User not Authenticated!' };
    }

    // Step 1: Fetch all habits and include the category and targetFrequency
    const habits = await prisma.habit.findMany({
        where: {
            userId: userId,
        },
        include: {
            category: true,
        }
    });

    // Step 2: Fetch completion counts and calculate progress for each habit
    const habitsWithProgress = await Promise.all(
        habits.map(async (habit) => {
            const completionsCount = await prisma.completion.count({
                where: {
                    habitId: habit.id,
                    timestamp: {
                        gte: startOfWeek(new Date()),
                        lte: endOfWeek(new Date()), 
                    }
                }
            });

            // Calculate progress based on completions and target frequency
            const progress = (completionsCount / habit.targetFrequency) * 100;

            return {
                habitId: habit.id,
                name: habit.name,
                description: habit.description,
                category: habit.category.name,
                targetFrequency: habit.targetFrequency,
                completionsCount,
                createdAt: habit.createdAt,
                progress: Math.round(Math.min(progress, 100)),
            };
        })
    );
    console.log(habitsWithProgress)
    return habitsWithProgress
}