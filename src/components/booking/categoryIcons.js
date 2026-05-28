import {
  Stethoscope,
  IdCard,
  Shield,
  Car,
  Building2,
  HelpCircle,
} from 'lucide-react'

const map = [
  { match: /shëndet/i,        Icon: Stethoscope, tone: 'bg-rose-50 text-rose-700' },
  { match: /civile|dokument/i, Icon: IdCard,     tone: 'bg-indigo-50 text-indigo-700' },
  { match: /polic/i,           Icon: Shield,     tone: 'bg-blue-50 text-blue-700' },
  { match: /trafik|rrugor/i,   Icon: Car,        tone: 'bg-amber-50 text-amber-700' },
  { match: /komun/i,           Icon: Building2,  tone: 'bg-emerald-50 text-emerald-700' },
]

export function getCategoryVisual(name) {
  const found = map.find((m) => m.match.test(name || ''))
  return found || { Icon: HelpCircle, tone: 'bg-slate-100 text-slate-700' }
}
