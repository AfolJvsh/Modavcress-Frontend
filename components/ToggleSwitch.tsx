
const ToggleSwitch = ({ 
  checked, 
  onChange 
}: { 
  checked: boolean; 
  onChange: (checked: boolean) => void;
}) => {
    return(

        <label className="relative inline-flex cursor-pointer items-center">
      <input 
        className="peer sr-only" 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)}
        />
      <div className="peer h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 dark:after:border-slate-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
    </label>
    )
}

export default ToggleSwitch