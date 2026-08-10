import { Check } from 'lucide-react'

export default function WizardStepper({ steps, currentStep }) {
  const current = steps[currentStep]
  const progressPct = ((currentStep + 1) / steps.length) * 100

  return (
    <nav aria-label="Hapat e rezervimit" className="w-full">
      {/* Mobile: compact progress + label */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0">
              {currentStep + 1}
            </span>
            <span className="text-sm font-semibold text-slate-800 truncate">
              {current?.label}
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 shrink-0">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Desktop: full stepper */}
      <ol className="hidden sm:flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const isComplete = index < currentStep
          const isActive = index === currentStep

          return (
            <li key={step.key} className="flex-1 flex items-center">
              <div className="flex flex-col items-center text-center w-full">
                <div
                  className={[
                    'w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-colors border-2',
                    isComplete && 'bg-blue-600 border-blue-600 text-white',
                    isActive && 'bg-white border-blue-600 text-blue-700 ring-4 ring-blue-500/15',
                    !isComplete && !isActive && 'bg-white border-slate-200 text-slate-400',
                  ].filter(Boolean).join(' ')}
                >
                  {isComplete ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={[
                    'mt-2 text-[11px] sm:text-xs font-medium leading-tight',
                    isActive || isComplete ? 'text-slate-800' : 'text-slate-400',
                  ].join(' ')}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={[
                    'h-0.5 flex-1 mx-1 sm:mx-2 mb-7 rounded-full transition-colors',
                    index < currentStep ? 'bg-blue-600' : 'bg-slate-200',
                  ].join(' ')}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
