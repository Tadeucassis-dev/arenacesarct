import type { RegistrationFormData, RegistrationResponse } from '@/types/registration'

const API_URL = import.meta.env.VITE_API_URL as string | undefined
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE !== 'false'

export async function submitRegistration(data: RegistrationFormData): Promise<RegistrationResponse> {
  if (MOCK_MODE || !API_URL) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Cadastro realizado com sucesso no modo MOCK.',
          id: 'MOCK-' + Date.now(),
          timestamp: new Date().toISOString(),
        })
      }, 1200)
    })
  }

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
}
