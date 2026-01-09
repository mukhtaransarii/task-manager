import { useState } from "react"
import { useTasks } from "../contexts/TaskContext"
import { Plus, Calendar, Tag, AlertCircle } from "lucide-react"

export default function TaskForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const { setTasks } = useTasks()

  const categories = ["Work", "Personal", "Shopping", "Health", "Learning", "Other"]

  const addTask = () => {
    if (!title.trim()) return

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "pending",
      createdAt: new Date().toISOString(),
      dueDate: dueDate || null,
      category: category || "General",
      completedAt: null,
    }

    setTasks(prev => [newTask, ...prev])
    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
    setCategory("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      addTask()
    }
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6  transition-all duration-300 hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Task</h2>
        <p className="text-gray-600 text-sm">Organize your work and life with clear tasks</p>
      </div>

      <div className="space-y-5">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            autoFocus
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Add details, notes, or instructions..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none h-24"
            rows="3"
          />
        </div>

        {/* Additional Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Priority Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <AlertCircle size={16} />
              Priority
            </label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="low" className="text-green-600">Low Priority</option>
              <option value="medium" className="text-yellow-600">Medium Priority</option>
              <option value="high" className="text-red-600">High Priority</option>
              <option value="urgent" className="text-purple-600">Urgent</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Calendar size={16} />
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Tag size={16} />
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Add Task Button */}
          <div className="flex items-end">
            <button
              onClick={addTask}
              disabled={!title.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Helper Text */}
        <div className="pt-2">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span className="font-medium">Tip:</span> Press Ctrl+Enter to quickly add task
            {dueDate && (
              <span className="ml-4">
                Due: {new Date(dueDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}