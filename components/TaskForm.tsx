"use client";
import { useState } from 'react';
import { Loader2, PlusCircle } from 'lucide-react';
import  { createTask, TaskStatus } from '@/lib/actions/task.actions';
const TaskForm = () => {
    const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
       await createTask(title, 'todo');
      setTitle('');
      setStatus('todo');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };
  return (
     <section>
      <h2 className="text-slate-900 dark:text-white text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="rounded-xl shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-end gap-4 p-4 sm:p-6">
            <label className="flex flex-col w-full flex-1">
              <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Task Title</p>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-base font-normal leading-normal" 
                placeholder="e.g., Design the new login page" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
            </label>
            <label className="flex flex-col w-full md:w-48">
              <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Status</p>
              <select 
                className="form-select flex w-full min-w-0 flex-1 appearance-none resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 p-3 text-base font-normal leading-normal"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                disabled={isLoading}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex w-full md:w-auto items-center justify-center whitespace-nowrap rounded-lg h-12 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-6 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  <span>Create Task</span>
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="px-4 sm:px-6 pb-4">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}

export default TaskForm