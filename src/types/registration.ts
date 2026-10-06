export interface AlunoData {
  nomeCompleto: string
  dataNascimento: string
  termoResponsavel: boolean
  nomeResponsavel: string
  idade?: number
  escola: string
  serieAno: string
  bairro: string
  cidade: string
}

export interface ResponsavelData {
  nomeCompleto: string
  grauParentesco: string
  whatsapp: string
  email?: string
}

export interface InformacoesAdicionaisData {
  praticaFutevolei: 'sim' | 'nao'
  outroEsporte?: string
  observacoes?: string
}

export interface RegistrationFormData extends AlunoData, ResponsavelData, InformacoesAdicionaisData {
  termoResponsavel: boolean
}

export interface RegistrationResponse {
  success: boolean
  message: string
  id?: string
  timestamp?: string
}
