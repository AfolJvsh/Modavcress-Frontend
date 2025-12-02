import { Task } from '@/lib/actions/task.actions';
import StatusBadge from './StatusBadge';
import TaskMenu from './TaskMenu';
import ToggleSwitch from './ToggleSwitch';
const TaskItem = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: { 
  task: Task; 
  onEdit: (task: Task) => void; 
  onDelete: (id: number) => void;
  onToggleStatus: (task: Task) => void;
}) => {
  const textStyle = task.status === 'done' 
    ? "text-slate-500 dark:text-slate-400 text-base font-medium line-through truncate"
    : "text-slate-800 dark:text-slate-200 text-base font-medium truncate";

  return (
      <div className="flex items-center justify-between rounded-xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <StatusBadge status={task.status} />
        <p className={textStyle}>{task.title}</p>
      </div>
      <div className="flex items-center gap-4">
        <ToggleSwitch 
          checked={task.status === 'done'} 
          onChange={() => onToggleStatus(task)}
        />
        <TaskMenu task={task} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  )
}

export default TaskItem

