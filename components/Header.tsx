'use client';

import { Bell, Settings, CheckSquare, Moon, Sun, Monitor, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const { theme, setTheme, themes, systemTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        {/* Settings Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 py-2 z-50">
              <p className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Theme
              </p>
              
              {/* Light Mode */}
              <button
                onClick={() => {
                  setTheme('light');
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Sun className="w-4 h-4" />
                <span>Light</span>
                {theme === 'light' && <Check className="w-4 h-4 ml-auto text-primary" />}
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => {
                  setTheme('dark');
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Moon className="w-4 h-4" />
                <span>Dark</span>
                {theme === 'dark' && <Check className="w-4 h-4 ml-auto text-primary" />}
              </button>

              {/* System Mode */}
              <button
                onClick={() => {
                  setTheme('system');
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Monitor className="w-4 h-4" />
                <span>System</span>
                {theme === 'system' && <Check className="w-4 h-4 ml-auto text-primary" />}
              </button>
            </div>
          )}
        </div>

        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User avatar image"></div>
      </div>
    </header>
  );
};

export default Header;