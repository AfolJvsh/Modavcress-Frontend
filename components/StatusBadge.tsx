import { TaskStatus } from "@/lib/actions/task.actions";

const StatusBadge = ({ status } : {status: TaskStatus}) => {
    const statusConfig = {
    inprogress: { color: 'bg-blue-500', textColor: 'text-blue-500', label: 'In Progress' },
    todo: { color: 'bg-slate-400 dark:bg-slate-500', textColor: 'text-slate-500 dark:text-slate-400', label: 'To Do' },
    done: { color: 'bg-green-500', textColor: 'text-green-500', label: 'Done' }
  };

  const config = statusConfig[status];
  return (
     <div className="flex items-center flex gap-2">
      <div className={`size-2.5 rounded-full ${config.color}`}></div>
      <span className={`text-xs font-semibold uppercase tracking-wider ${config.textColor}`}>{config.label}</span>
    </div>
  )
}

export default StatusBadge