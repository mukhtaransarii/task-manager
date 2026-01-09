import TaskForm from "../components/TaskForm.jsx"
import TaskCard from "../components/TaskCard.jsx"

export default function Home() {
  return (
    <div className="flex flex-col gap-6 md:flex-row p-6">
      <TaskForm />
      <TaskCard />
    </div>
  )
}