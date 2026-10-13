import { useState } from 'react'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { isAuthenticated } from '@/services/adminAuth'

export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated())

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />
  }

  return <AdminDashboard onLogout={() => setAuthed(false)} />
}
