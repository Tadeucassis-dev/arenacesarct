const AUTH_STORAGE_KEY = 'arenacesar_admin_auth'
const PASSWORD_HASH_KEY = 'arenacesar_admin_password_hash'

const DEFAULT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'arenacesar2024'

export async function sha256(message: string): Promise<string> {
  if (typeof window === 'undefined') return message
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function getStoredPasswordHash(): Promise<string> {
  if (typeof window === 'undefined') return ''
  let hash = window.localStorage.getItem(PASSWORD_HASH_KEY)
  if (!hash) {
    hash = await sha256(DEFAULT_PASSWORD)
    window.localStorage.setItem(PASSWORD_HASH_KEY, hash)
  }
  return hash
}

export async function verifyPassword(password: string): Promise<boolean> {
  const inputHash = await sha256(password)
  const storedHash = await getStoredPasswordHash()
  return inputHash === storedHash
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return
  if (value) {
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true')
  } else {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export function logout(): void {
  setAuthenticated(false)
}
