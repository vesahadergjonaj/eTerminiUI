// Placeholder catalog for services and doctors.
// Replace with API calls (e.g. GET /api/services, GET /api/doctors) when those endpoints exist.
// Doctor `id` values MUST match existing StaffMembers.Id in the database for booking to succeed.

import { Stethoscope, HeartPulse, Brain, Baby, Bone, Eye } from 'lucide-react'

export const services = [
  { id: 'general',     name: 'Konsultë e përgjithshme', description: 'Vizitë mjekësore standarde', icon: Stethoscope, durationMinutes: 30 },
  { id: 'cardiology',  name: 'Kardiologji',             description: 'Kontrolli i zemrës dhe enëve të gjakut', icon: HeartPulse, durationMinutes: 45 },
  { id: 'neurology',   name: 'Neurologji',              description: 'Sistemi nervor', icon: Brain, durationMinutes: 45 },
  { id: 'pediatrics',  name: 'Pediatri',                description: 'Kujdes për fëmijë', icon: Baby, durationMinutes: 30 },
  { id: 'orthopedics', name: 'Ortopedi',                description: 'Kockat dhe muskujt', icon: Bone, durationMinutes: 45 },
  { id: 'ophthalmology', name: 'Oftalmologji',          description: 'Shëndeti i syrit', icon: Eye, durationMinutes: 30 },
]

// NOTE: Replace these placeholder GUIDs with real StaffMembers.Id values from your DB.
export const doctors = [
  { id: '00000000-0000-0000-0000-000000000001', fullName: 'Dr. Arben Krasniqi', title: 'Mjek i përgjithshëm',  serviceIds: ['general'] },
  { id: '00000000-0000-0000-0000-000000000002', fullName: 'Dr. Albana Berisha', title: 'Kardiologe',           serviceIds: ['cardiology', 'general'] },
  { id: '00000000-0000-0000-0000-000000000003', fullName: 'Dr. Fatos Hoxha',    title: 'Neurolog',             serviceIds: ['neurology'] },
  { id: '00000000-0000-0000-0000-000000000004', fullName: 'Dr. Elira Gashi',    title: 'Pediatre',             serviceIds: ['pediatrics'] },
  { id: '00000000-0000-0000-0000-000000000005', fullName: 'Dr. Besnik Rama',    title: 'Ortoped',              serviceIds: ['orthopedics'] },
  { id: '00000000-0000-0000-0000-000000000006', fullName: 'Dr. Lirie Shala',    title: 'Oftalmologe',          serviceIds: ['ophthalmology', 'general'] },
]
