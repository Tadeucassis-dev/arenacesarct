export function calcularIdade(dataNascimento: string): number {
  if (!dataNascimento) return 0
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  if (isNaN(nascimento.getTime())) return 0
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mesAtual = hoje.getMonth()
  const mesNascimento = nascimento.getMonth()
  if (mesNascimento > mesAtual || (mesNascimento === mesAtual && nascimento.getDate() > hoje.getDate())) {
    idade--
  }
  return idade
}

export function apenasNumeros(v: string): string {
  return v.replace(/\D/g, '')
}

export function formatarWhatsApp(v: string): string {
  const numeros = apenasNumeros(v).slice(0, 11)
  if (numeros.length <= 2) return numeros
  if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
}
