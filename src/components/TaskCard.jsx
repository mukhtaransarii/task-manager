import { useState } from "react"
import { useTasks } from "../contexts/TaskContext"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {
  CheckCircle,
  Circle,
  Edit2,
  Trash2,
  Clock,
  Tag,
  AlertCircle,
  Calendar,
  Save,
  X,
  Undo2
} from "lucide-react"

dayjs.extend(relativeTime)

export default function TaskCards() {
  const { tasks, setTasks } = useTasks()
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})

  const updateStatus = (id, status) => {
    setTasks(t =>
      t.map(task =>
        task.id === id 
          ? { 
              ...task, 
              status,
              completedAt: status === "completed" ? new Date().toISOString() : null
            } 
          : task
      )
    )
  }

  const startEdit = (task) => {
    setEditId(task.id)
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate || ""
    })
  }

  const saveEdit = (id) => {
    if (!editData.title?.trim()) return
    setTasks(t =>
      t.map(task =>
        task.id === id ? { 
          ...task, 
          ...editData,
          title: editData.title.trim(),
          description: editData.description?.trim() || "",
        } : task
      )
    )
    setEditId(null)
    setEditData({})
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditData({})
  }

  const deleteTask = (id) => {
    setTasks(t => t.filter(task => task.id !== id))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200"
      case "high": return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200"
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    return dayjs(dateString).format("MMM D, YYYY")
  }

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    return dayjs(dueDate).isBefore(dayjs(), 'day')
  }

  return (
    <div className="space-y-4 flex-1">
      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No tasks yet</h3>
          <p className="text-gray-500">Add a task to get started</p>
        </div>
      ) : (
        tasks.map(task => (
          <div
            key={task.id}
            className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md ${
              task.status === "completed" ? "opacity-75" : ""
            } ${
              isOverdue(task.dueDate) && task.status !== "completed" 
                ? "border-l-4 border-l-red-500" 
                : ""
            }`}
          >
            {/* Task Header */}
            <div className="flex justify-between items-start mb-4">
              {/* Status & Priority */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(task.id, 
                    task.status === "completed" ? "pending" : "completed"
                  )}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {task.status === "completed" ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-400 hover:text-green-500" size={24} />
                  )}
                </button>

                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)} flex items-center gap-1`}>
                    <AlertCircle size={12} />
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  {task.category && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 flex items-center gap-1">
                      <Tag size={12} />
                      {task.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1">
                {editId === task.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Save"
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Cancel"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(task)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Task Content */}
            <div className="mb-4">
              {editId === task.id ? (
                <div className="space-y-4">
                  <input
                    value={editData.title || ""}
                    onChange={e => setEditData({...editData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Task title"
                  />
                  <textarea
                    value={editData.description || ""}
                    onChange={e => setEditData({...editData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-20"
                    placeholder="Task description"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={editData.priority || "medium"}
                      onChange={e => setEditData({...editData, priority: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <input
                      type="date"
                      value={editData.dueDate || ""}
                      onChange={e => setEditData({...editData, dueDate: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className={`text-lg font-semibold mb-2 ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 mb-3 whitespace-pre-wrap">{task.description}</p>
                  )}
                </>
              )}
            </div>

            {/* Task Footer */}
            <div className="flex flex-wrap gap-2 justify-between items-center pt-4 border-t border-gray-100">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{dayjs(task.createdAt).fromNow()}</span>
                </div>
                
                {task.dueDate && (
                  <div className={`flex items-center gap-1 ${isOverdue(task.dueDate) && task.status !== "completed" ? "text-red-600 font-medium" : ""}`}>
                    <Calendar size={14} />
                    <span>
                      {isOverdue(task.dueDate) && task.status !== "completed" ? "Overdue: " : "Due: "}
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                )}

                {task.completedAt && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle size={14} />
                    <span>Completed {dayjs(task.completedAt).fromNow()}</span>
                  </div>
                )}
              </div>

              {/* Status Actions */}
              {editId !== task.id && task.status !== "completed" && (
                <button
                  onClick={() => updateStatus(task.id, "completed")}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle size={16} />
                  Mark Complete
                </button>
              )}

              {editId !== task.id && task.status === "completed" && (
                <button
                  onClick={() => updateStatus(task.id, "pending")}
                  className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Undo2 size={16} />
                  Reopen Task
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}