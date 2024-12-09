'use server'

import { prisma } from "@/prisma-client"
import { auth, currentUser } from "@clerk/nextjs/server"
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