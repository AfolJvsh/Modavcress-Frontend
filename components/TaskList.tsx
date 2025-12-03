"use client";

import { Loader2 } from "lucide-react";
import EditTaskModal from "./EditTaskModal";
import TaskItem from "./TaskItem";
import {
  deleteTask,
  getAllTasks,
  Task,
  TaskStatus,
  updateTask
} from "@/lib/actions/task.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export default function TaskList() {
  const queryClient = useQueryClient();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Track previous tasks to detect new ones
  const prevTasks = useRef<Task[]>([]);

  const onNewTask = (task: Task) => {
    alert(`New task added: ${task.title}`);
  };

  // Fetch tasks via React Query
  const {
    data: tasks = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
    refetchInterval: 5000, // Poll every 5s
    refetchOnWindowFocus: true,
  });

  // Detect new tasks
  useEffect(() => {
    if (prevTasks.current.length > 0 && tasks.length > prevTasks.current.length) {
      const newItems = tasks.filter(
        (t) => !prevTasks.current.some((p) => p.id === t.id)
      );
      if (newItems.length > 0) {
        onNewTask(newItems[0]);
      }
    }
    prevTasks.current = tasks;
  }, [tasks]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(id);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus: TaskStatus =
      task.status === "done" ? "todo" : "done";

    await updateTask(task.id, task.title, newStatus);
    
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  if (isLoading) {
    return (
      <section>
        <h2 className="text-slate-900 dark:text-white text-xl sm:text-[22px] font-bold px-4 pb-3 pt-5">
          Your Tasks
        </h2>
        <div className="flex justify-center items-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <h2 className="text-slate-900 dark:text-white text-xl sm:text-[22px] font-bold px-4 pb-3 pt-5">
          Your Tasks
        </h2>
        <div className="text-center p-12">
          <p className="text-red-600 dark:text-red-400">
            {(error as Error).message}
          </p>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ["tasks"] })}
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
        <h2 className="text-slate-900 dark:text-white text-xl sm:text-[22px] font-bold px-4 pb-3 pt-5">
          Your Tasks
        </h2>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 p-4">
          {tasks.length === 0 ? (
            <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400">
                No tasks yet. Create your first task above!
              </p>
            </div>
          ) : (
            tasks.map((task) => (
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
        onSave={() =>
          queryClient.invalidateQueries({ queryKey: ["tasks"] })
        }
      />
    </>
  );
}
