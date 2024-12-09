import { recordHabit } from "@/lib/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import SubmitButton from "./submit-button";

export default function CreateHabitForm() {
    return (
        <form action={recordHabit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a New Habit</h2>
            <p className="text-gray-600 mb-6">Set a goal to increase or reduce a habit.</p>
            
            {/* Habit Name */}
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <Input type="text" name="name" className="w-full p-2 mt-1 border border-gray-300 rounded focus:border-indigo-500 focus:ring focus:ring-indigo-200" placeholder="e.g., Exercise" />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-gray-700">Description (Optional)</label>
                <textarea name="description" className="w-full p-2 mt-1 border border-gray-300 rounded focus:border-indigo-500 focus:ring focus:ring-indigo-200" placeholder="Describe your habit..."></textarea>
            </div>

            {/* Goal Type */}
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="goalType">Goal Type</label>
                <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                    <Input type="radio" name="goalType" value="increase" className="form-radio text-indigo-600" />
                    <span className="ml-2 text-gray-700">Increase</span>
                </label>
                <label className="flex items-center">
                    <Input type="radio" name="goalType" value="reduce" className="form-radio text-indigo-600" />
                    <span className="ml-2 text-gray-700">Reduce</span>
                </label>
                </div>
            </div>

            {/* Target Frequency */}
            <div className="mb-4">
                <label className="block text-gray-700">Target Frequency (times per week)</label>
                <Input type="number" name="targetFrequency" className="w-full p-2 mt-1 border border-gray-300 rounded focus:border-indigo-500 focus:ring focus:ring-indigo-200" placeholder="e.g., 3" />
            </div>

            {/* Category */}
            <div className="mb-6">
                <label className="block text-gray-700">Category</label>
                <Select className="w-full p-2 mt-1" name="category">
                    <SelectTrigger>
                        <SelectValue placeholder="select category"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='health'>Health</SelectItem>
                        <SelectItem value='work'>Work</SelectItem>
                        <SelectItem value='personal-development'>Personal Development</SelectItem>
                        <SelectItem value='fitness'>Fitness</SelectItem>
                        <SelectItem value='school'>School</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Submit Button */}
            <SubmitButton/>
        </form>
    )
}