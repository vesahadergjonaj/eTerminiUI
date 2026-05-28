export default function FilterTabs({ tabs, value, onChange }) {
  return (
    <div className="flex gap-1 bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
      {tabs.map((tab) => {
        const active = value === tab.key
        return (
          <button
            key={tab.label}
            onClick={() => onChange(tab.key)}
            className={[
              'flex-1 text-sm py-2 px-3 rounded-xl font-medium transition-all',
              active
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50',
            ].join(' ')}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span
                className={[
                  'ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full',
                  active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500',
                ].join(' ')}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
