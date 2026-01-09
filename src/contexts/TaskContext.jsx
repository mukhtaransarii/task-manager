import { createContext, useContext } from "react"
import usePersist from "../hooks/usePersist"

const TaskContext = createContext(null)

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = usePersist("tasks", [])

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext)