import type { RegistrationEntry, RegistrationFormData, RegistrationStatus } from '@/types/registration'

const STORAGE_KEY = 'arenacesar_registrations'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function getAllRegistrations(): RegistrationEntry[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as RegistrationEntry[]) : []
  } catch {
    return []
  }
}

export function saveRegistration(data: RegistrationFormData): RegistrationEntry {
  const entries = getAllRegistrations()
  const entry: RegistrationEntry = {
    ...data,
    id: 'REG-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    timestamp: new Date().toISOString(),
    status: 'pendente',
  }
  entries.unshift(entry)
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }
  return entry
}

export function updateRegistrationStatus(id: string, status: RegistrationStatus): RegistrationEntry | null {
  const entries = getAllRegistrations()
  const index = entries.findIndex((e) => e.id === id)
  if (index === -1) return null
  entries[index] = {
    ...entries[index],
    status,
    statusUpdatedAt: new Date().toISOString(),
  }
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }
  return entries[index]
}

export function deleteRegistration(id: string): boolean {
  const entries = getAllRegistrations()
  const filtered = entries.filter((e) => e.id !== id)
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  }
  return filtered.length !== entries.length
}

export function getRegistrationById(id: string): RegistrationEntry | undefined {
  return getAllRegistrations().find((e) => e.id === id)
}

export function getRegistrationStats() {
  const entries = getAllRegistrations()
  return {
    total: entries.length,
    pendentes: entries.filter((e) => e.status === 'pendente').length,
    aprovados: entries.filter((e) => e.status === 'aprovado').length,
    rejeitados: entries.filter((e) => e.status === 'rejeitado').length,
  }
}
