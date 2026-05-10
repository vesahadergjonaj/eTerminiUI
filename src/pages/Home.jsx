import { Link } from 'react-router-dom'

const features = [
  { icon: '🏥', title: 'Spitalet', desc: 'QKUK dhe spitalet tjera' },
  { icon: '🚔', title: 'Policia', desc: 'Dokumente, patentë shoferi' },
  { icon: '🏛️', title: 'Komunat', desc: 'Certifikata dhe dokumente' },
  { icon: '🏢', title: 'Ministritë', desc: 'Shërbime qeveritare' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Rezervo terminin tuaj<br />
          <span className="text-blue-600">pa pritje në radhë</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto mb-8">
          eTermini ju lejon të rezervoni termin online në çdo institucion publik dhe shëndetësor në Kosovë.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/institutions"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Shiko institucionet
          </Link>
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Regjistrohu falas
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-slate-800 mb-1">{f.title}</h3>
            <p className="text-slate-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Si funksionon?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { step: '1', title: 'Zgjidh institucionin', desc: 'Kërko dhe zgjidhni institucionin e dëshiruar' },
            { step: '2', title: 'Zgjidhni shërbimin', desc: 'Departamentin dhe shërbimin që ju nevojitet' },
            { step: '3', title: 'Rezervoni terminin', desc: 'Zgjidhni datën dhe orën e lirë dhe konfirmoni' },
          ].map((item) => (
            <div key={item.step}>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
