'use server'

import { prisma } from "@/prisma-client"
import { auth, currentUser } from "@clerk/nextjs/server"
import { endOfWeek, startOfWeek } from "date-fns"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const formSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    goalType: z.string(),
    targetFrequency: z.coerce.number(),
    category: z.string(),
})

export async function recordHabit(formData) {
    // Get the authenticated user ID
    const { userId } = await auth()
    if(!userId) return { error: "Not authenticated" }

    // validate form data
    const validatedFormData = formSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        goalType: formData.get('goalType'),
        targetFrequency: formData.get('targetFrequency'),
        category: formData.get('category')
    })

    if(!validatedFormData.success) {
        return {error : 'Invalid Data!'}
    }

    const { name, 
        description, goalType, 
        targetFrequency, category 
    } = validatedFormData.data

    const userRecord = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!userRecord) {
        const userDetails = await currentUser()
        await prisma.user.create({
            data: {
                id: userId,
                email: userDetails.primaryEmailAddress.emailAddress ?? " no email",
                name: userDetails.firstName ?? 'Anonymous', 
            }
        })
    }

    try {
        // Check if the category exists
        let categoryRecord = await prisma.category.findUnique({
            where: { name: category }
        })

        if (!categoryRecord) {
            categoryRecord = await prisma.category.create({
                data: { name: category }
            });
        }

        // create new habit linked to user and category
        const newHabit = await prisma.habit.create({
            data: {
                userId: userId,
                name: name,
                description: description,
                goalType: goalType,
                targetFrequency: targetFrequency,
                categoryId: categoryRecord.id, // Link habit to category
            }
        })

        return { success: true, habit: newHabit };
        
    } catch (error) {
        console.error('Error recording habit:', error);
        return { error: 'Failed to record habit' };
    }
}


export async function logHabitCompletion( habitId) {
    // Get the authenticated user ID
    const { userId } = await auth()
    if(!userId) return { error: "Not authenticated" }

    try {
        // add completion record linked to habit and user
        await prisma.completion.create({
            data: {
                userId: userId,
                habitId: habitId,
            }
        })

        console.log('completion added')

        const [completionsThisWeek, habit] = await Promise.all([
            //  1.check if user has reached their target for the week.
            prisma.completion.count({
                where: {
                    habitId: habitId,
                    timestamp: {
                        gte: startOfWeek(new Date()),
                        lte: endOfWeek(new Date()),
                    }
                }
            }),
            // 2.
            prisma.habit.findUnique({
                where: { id: habitId }
            })
        ])

        if (completionsThisWeek >= habit.targetFrequency) {
            await prisma.habit.update({
                where: { id: habitId },
                data: { goalReached: true }
            })
        }

        console.log(`habit logged. ${completionsThisWeek} completions. ${habit.name}`)

        return { 
            success: true, 
            message: "Habit logged successfully!",
        }

    } catch (error) {
        return { error: 'Logging Habit Failed' }
    }
}