interface TurmaParaVerificacao {
  id: string
  codigo: string
  nome: string
  horario: string
}

interface ConflitoHorario {
  tipo: 'horario'
  turmaA: { codigo: string; nome: string }
  turmaB: { codigo: string; nome: string }
  blocoConflitante: string
}

interface PreRequisitoFaltante {
  tipo: 'pre-requisito'
  turma: { codigo: string; nome: string }
  preRequisito: string
}

export type Problema = ConflitoHorario | PreRequisitoFaltante


function extrairBlocos(horario: string): string[] {
  return horario.split(' ')
}


function blocosColidem(blocoA: string, blocoB: string): boolean {
  const diaTurnoA = blocoA.slice(0, 2)
  const diaTurnoB = blocoB.slice(0, 2)
  if (diaTurnoA !== diaTurnoB) return false

  const horariosA = blocoA.slice(2).split('')
  const horariosB = blocoB.slice(2).split('')
  return horariosA.some(h => horariosB.includes(h))
}

export function verificarConflitosDeHorario(turmas: TurmaParaVerificacao[]): ConflitoHorario[] {
  const conflitos: ConflitoHorario[] = []

  for (let i = 0; i < turmas.length; i++) {
    for (let j = i + 1; j < turmas.length; j++) {
      const blocosA = extrairBlocos(turmas[i].horario)
      const blocosB = extrairBlocos(turmas[j].horario)

      for (const blocoA of blocosA) {
        for (const blocoB of blocosB) {
          if (blocosColidem(blocoA, blocoB)) {
            conflitos.push({
              tipo: 'horario',
              turmaA: { codigo: turmas[i].codigo, nome: turmas[i].nome },
              turmaB: { codigo: turmas[j].codigo, nome: turmas[j].nome },
              blocoConflitante: blocoA,
            })
          }
        }
      }
    }
  }

  return conflitos
}