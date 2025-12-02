"use client";
import { Loader2 } from "lucide-react";
import EditTaskModal from "./EditTaskModal";
import TaskItem from "./TaskItem";
import { deleteTask, getAllTasks, Task,  TaskStatus, updateTask } from "@/lib/actions/task.actions";
import { useEffect, useState } from "react";

const TaskList = () => {
const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
       const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';
    try {
     await updateTask(task.id, task.title, newStatus);
      setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  if (isLoading) {
    return (
      <section>
        <h2 className="text-slate-900 dark:text-white text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your Tasks</h2>
        <div className="flex justify-center items-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="text-slate-900 dark:text-white text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your Tasks</h2>
        <div className="text-center p-12">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={fetchTasks}
            className="mt-4 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-slate-900 dark:text-white text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your Tasks</h2>
        <div className="flex flex-col gap-3">
          {tasks.length === 0 ? (
            <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400">No tasks yet. Create your first task above!</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onEdit={setEditingTask}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))
          )}
        </div>
      </section>
      <EditTaskModal 
        task={editingTask} 
        onClose={() => setEditingTask(null)} 
        onSave={fetchTasks}
      />
    </>
  );
}
export default TaskList