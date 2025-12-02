import { Task } from '@/lib/actions/task.actions';
import {  MoreVertical, Edit, Trash2 } from 'lucide-react';
const TaskMenu = ({ 
  task, 
  onEdit, 
  onDelete 
}: { 
  task: Task; 
  onEdit: (task: Task) => void; 
  onDelete: (id: number) => void;
}) => {
  return (
   <div className="relative group">
      <button className="flex items-center justify-center size-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50">
        <MoreVertical className="w-5 h-5" />
      </button>
      <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-slate-800 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 focus:outline-none z-10 hidden group-hover:block group-focus-within:block">
        <div className="py-1">
          <button 
            onClick={() => onEdit(task)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full text-left"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Task</span>
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full text-left"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskMenu