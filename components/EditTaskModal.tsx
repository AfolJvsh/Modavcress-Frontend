"use client";

import { Task, TaskStatus, updateTask } from '@/lib/actions/task.actions';
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react';


const EditTaskModal = ({ 
  task, 
  onClose, 
  onSave 
}: { 
  task: Task | null; 
  onClose: () => void; 
  onSave: () => void;
}) => {
     const [title, setTitle] = useState(task?.title || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !title.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
     await updateTask(task.id, title, status);
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  if (!task) return null;

  return (
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-md w-full border border-slate-200 dark:border-slate-800">
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Edit Task</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="flex flex-col">
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Task Title</p>
                <input 
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 text-base font-normal leading-normal" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                />
              </label>
              <label className="flex flex-col">
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
              {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
              <div className="flex gap-3 justify-end pt-2">
                <button 
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default EditTaskModal