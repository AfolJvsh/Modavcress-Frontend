import { Bell, Settings, CheckSquare } from 'lucide-react';
const Header = () => {
  return (
     <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3 bg-white dark:bg-background-dark/50 sticky top-0 z-10 backdrop-blur-sm">
      <div className="flex items-center gap-4 text-slate-900 dark:text-white">
        <div className="size-6 text-primary">
          <CheckSquare className="w-6 h-6" />
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Task Manager</h2>
      </div>
      <div className="flex flex-1 justify-end gap-2 sm:gap-4">
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <Bell className="w-5 h-5" />
        </button>
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <Settings className="w-5 h-5" />
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User avatar image"></div>
      </div>
    </header>
  )
}

export default Header