import { Check } from 'lucide-react'

export default function WizardStepper({ steps, currentStep }) {
  return (
    <nav aria-label="Hapat e rezervimit" className="w-full">
      <ol className="flex items-center justify-between gap-2">
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
