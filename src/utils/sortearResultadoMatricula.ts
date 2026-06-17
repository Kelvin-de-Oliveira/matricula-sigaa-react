import type { Turma } from '../context/MatriculaContext'

export type StatusDisciplina = 'matriculado' | 'indeferido'

export interface ResultadoDisciplina {
  turma: Turma
  status: StatusDisciplina
  motivoIndeferimento?: string
}

const MOTIVOS_INDEFERIMENTO = [
  'Turma lotada — não há mais vagas disponíveis',
  'Conflito de horário identificado pelo sistema acadêmico',
  'Pendência documental junto à coordenação do curso',
]

export function sortearResultadoMatricula(turmas: Turma[]): ResultadoDisciplina[] {
  return turmas.map(turma => {
    const deferida = Math.random() > 0.3 // ~70% de chance de deferimento

    if (deferida) {
      return { turma, status: 'matriculado' as const }
    }

    const motivo = MOTIVOS_INDEFERIMENTO[Math.floor(Math.random() * MOTIVOS_INDEFERIMENTO.length)]
    return { turma, status: 'indeferido' as const, motivoIndeferimento: motivo }
  })
}