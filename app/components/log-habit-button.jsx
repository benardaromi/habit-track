'use client'


import { Button } from "@mui/material"
import { logHabitCompletion } from "@/lib/actions"
import { useState } from "react"

export default function LogHabitButton({ habitId }) {
    const [loading, setLoading] = useState(false)

    const handleLogCompletion = async () => {
        setLoading(true)
        try {
            await logHabitCompletion(habitId) 
        } catch (error) {
            throw error
        }  finally {
            setLoading(false)
        }
    }

    return (
        <Button 
            onClick={handleLogCompletion} 
            className={'w-full'}
        >
            {loading ? 'Logging...' : 'Log'}
        </Button>
    )
}