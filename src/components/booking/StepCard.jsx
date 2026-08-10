export default function StepCard({ title, subtitle, children, footer }) {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-sm overflow-hidden">
      <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 border-b border-slate-100">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <div className="px-4 sm:px-6 py-5 sm:py-6">{children}</div>
      {footer && (
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2 sm:gap-3">
          {footer}
        </div>
      )}
    </div>
  )
}
