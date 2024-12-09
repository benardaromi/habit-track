'use server'

import { prisma } from "@/prisma-client"
import { auth } from "@clerk/nextjs/server"

export async function getHabits() {
    const { userId } = await auth()

    if(!userId) return { error: 'User not Authenticated!'}

    const habits = await prisma.habit.findMany({
        where: {
            userId : userId
        },
        include: {
            category: true
        }
    })

    // console.log(habits)

    return habits
}