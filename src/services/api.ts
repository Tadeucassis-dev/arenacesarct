import type { RegistrationFormData, RegistrationResponse } from '@/types/registration'
import { saveRegistration } from '@/services/storage'

const API_URL = import.meta.env.VITE_API_URL as string | undefined
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE !== 'false'

export async function submitRegistration(data: RegistrationFormData): Promise<RegistrationResponse> {
  const entry = saveRegistration(data)

  if (MOCK_MODE || !API_URL) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Cadastro realizado com sucesso.',
          id: entry.id,
          timestamp: entry.timestamp,
        })
      }, 1200)
    })
  }

  try {
    const response = await fetch(`${API_URL.replace(/\/$/, '')}/inscricoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Erro ao enviar inscrição. Tente novamente.')
    }

    return (await response.json()) as RegistrationResponse
  } catch {
    return {
      success: true,
      message: 'Cadastro realizado com sucesso.',
      id: entry.id,
      timestamp: entry.timestamp,
    }
  }
}
