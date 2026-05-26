import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

import WizardStepper from '../components/booking/WizardStepper'
import StepCard from '../components/booking/StepCard'
import ServiceStep from '../components/booking/steps/ServiceStep'
import DoctorStep from '../components/booking/steps/DoctorStep'
import DateStep from '../components/booking/steps/DateStep'
import TimeSlotStep from '../components/booking/steps/TimeSlotStep'
import ConfirmStep from '../components/booking/steps/ConfirmStep'

import { createAppointment } from '../api/appointmentsApi'

const STEPS = [
  { key: 'service', label: 'Shërbimi' },
  { key: 'doctor',  label: 'Mjeku' },
  { key: 'date',    label: 'Data' },
  { key: 'slot',    label: 'Ora' },
  { key: 'confirm', label: 'Konfirmo' },
]

export default function BookAppointment() {
  const navigate = useNavigate()

  const [stepIndex, setStepIndex] = useState(0)
  const [service, setService] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [notes, setNotes] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [confirmation, setConfirmation] = useState(null)

  const canContinue = useMemo(() => {
    switch (STEPS[stepIndex].key) {
      case 'service': return Boolean(service)
      case 'doctor':  return Boolean(doctor)
      case 'date':    return Boolean(date)
      case 'slot':    return Boolean(slot)
      case 'confirm': return true
      default:        return false
    }
  }, [stepIndex, service, doctor, date, slot])

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0))

  // Reset downstream selections when an earlier step changes
  const handleServiceChange = (s) => {
    setService(s)
    setDoctor(null)
    setSlot('')
  }
  const handleDoctorChange = (d) => {
    setDoctor(d)
    setSlot('')
  }
  const handleDateChange = (d) => {
    setDate(d)
    setSlot('')
  }

  const submit = async () => {
    if (!doctor || !slot) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const { data } = await createAppointment({
        doctorId: doctor.id,
        appointmentDate: slot,
        notes: notes || null,
      })
      setConfirmation(data)
    } catch (err) {
      const status = err.response?.status
      const msg = err.response?.data?.message
      if (status === 409) {
        setSubmitError(msg || 'Ky termin u rezervua nga dikush tjetër. Zgjedh një orë tjetër.')
        setSlot('')
        setStepIndex(3)
      } else {
        setSubmitError(msg || 'Rezervimi dështoi. Provo përsëri.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmation) {
    return (
      <div className="min-h-[70vh] bg-slate-50 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 mt-4">Termini u rezervua!</h1>
          <p className="text-sm text-slate-500 mt-2">
            Përkujtuesi do të të dërgohet 24 orë para terminit.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-left text-sm text-slate-700">
            <div><span className="text-slate-400">Mjeku:</span> {confirmation.doctorFullName || doctor?.fullName}</div>
            <div><span className="text-slate-400">Data:</span> {new Date(confirmation.appointmentDate || slot).toLocaleString('sq-AL')}</div>
            <div><span className="text-slate-400">Statusi:</span> {confirmation.status}</div>
          </div>

          <div className="flex gap-2 mt-6">
            <Link
              to="/appointments"
              className="flex-1 inline-flex items-center justify-center h-11 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
            >
              Shiko terminet e mia
            </Link>
            <button
              onClick={() => {
                setConfirmation(null)
                setStepIndex(0)
                setService(null)
                setDoctor(null)
                setDate('')
                setSlot('')
                setNotes('')
              }}
              className="flex-1 h-11 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
            >
              Rezervo një tjetër
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentKey = STEPS[stepIndex].key
  const isLastStep = stepIndex === STEPS.length - 1

  return (
    <div className="min-h-[70vh] bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-slate-500 hover:text-slate-700 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Kthehu
          </button>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-2 tracking-tight">
            Rezervo një termin
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ndiq hapat për të zgjedhur shërbimin, mjekun dhe orën.
          </p>
        </div>

        <div className="mb-6">
          <WizardStepper steps={STEPS} currentStep={stepIndex} />
        </div>

        <StepCard
          title={
            currentKey === 'service' ? 'Zgjedh shërbimin' :
            currentKey === 'doctor'  ? 'Zgjedh mjekun' :
            currentKey === 'date'    ? 'Zgjedh datën' :
            currentKey === 'slot'    ? 'Zgjedh orën' :
                                       'Konfirmo rezervimin'
          }
          subtitle={
            currentKey === 'service' ? 'Cili shërbim ju nevojitet?' :
            currentKey === 'doctor'  ? `Mjekët e disponueshëm për ${service?.name || 'shërbimin e zgjedhur'}.` :
            currentKey === 'date'    ? 'Zgjedh ditën që të përshtatet më shumë.' :
            currentKey === 'slot'    ? 'Terminet e lira përditësohen në kohë reale.' :
                                       'Shiko detajet para se të konfirmosh.'
          }
          footer={
            <>
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0 || submitting}
                className="inline-flex items-center gap-1 h-10 px-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Mbrapa
              </button>

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue}
                  className="inline-flex items-center gap-1 h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Vazhdo <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Po rezervohet...
                    </>
                  ) : (
                    <>Konfirmo terminin</>
                  )}
                </button>
              )}
            </>
          }
        >
          {submitError && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {currentKey === 'service' && (
            <ServiceStep value={service} onChange={handleServiceChange} />
          )}
          {currentKey === 'doctor' && (
            <DoctorStep service={service} value={doctor} onChange={handleDoctorChange} />
          )}
          {currentKey === 'date' && (
            <DateStep value={date} onChange={handleDateChange} />
          )}
          {currentKey === 'slot' && (
            <TimeSlotStep
              doctorId={doctor?.id}
              date={date}
              durationMinutes={service?.durationMinutes || 30}
              value={slot}
              onChange={setSlot}
            />
          )}
          {currentKey === 'confirm' && (
            <ConfirmStep
              service={service}
              doctor={doctor}
              date={date}
              slot={slot}
              notes={notes}
              onNotesChange={setNotes}
            />
          )}
        </StepCard>
      </div>
    </div>
  )
}
