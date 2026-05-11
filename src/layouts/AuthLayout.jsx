import { Outlet, Link } from 'react-router-dom'

const features = [
  'Pa pritje në radhë',
  'Konfirmim i menjëhershëm',
  '100% falas për qytetarët',
]

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 flex-col justify-between p-10 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-blue-700 font-bold text-base">eT</span>
            </div>
            <span className="text-white font-bold text-xl">
              e<span className="text-blue-300">Termini</span>
            </span>
          </Link>

          <h2 className="text-white text-3xl font-bold leading-snug mb-4">
            Rezervoni terminin tuaj në institucione publike të Kosovës
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed mb-10">
            Platformë zyrtare digjitale — shëndetësi, polici, komuna dhe ministri, të gjitha në një vend.
          </p>

          <div className="space-y-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/40 border border-blue-400/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-100 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom preview card */}
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/40 border border-blue-400/30 rounded-xl flex items-center justify-center text-lg">
                🏥
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">QKUK – Kardiologji</p>
                <p className="text-blue-300 text-xs">Termin i konfirmuar</p>
              </div>
              <span className="text-xs bg-green-400/20 text-green-300 border border-green-400/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                ✓ Konfirmuar
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Data', value: '15 Qer 2025' },
                { label: 'Ora', value: '10:30' },
                { label: 'Numri', value: '#042' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-lg px-2 py-2 text-center">
                  <p className="text-blue-300 text-xs mb-0.5">{item.label}</p>
                  <p className="text-white text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-blue-400 text-xs mt-5 text-center">
            © 2026 eTermini — Republika e Kosovës
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">eT</span>
          </div>
          <span className="text-slate-800 font-bold text-xl">
            e<span className="text-blue-600">Termini</span>
          </span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 w-full max-w-md p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
