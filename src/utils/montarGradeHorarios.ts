interface TurmaParaGrade {
  id: string
  codigo: string
  nome: string
  horario: string
}

export interface SlotGrade {
  turma: { codigo: string; nome: string } | null
}

// dias: 2=Seg, 3=Ter, 4=Qua, 5=Qui, 6=Sex, 7=Sáb
const DIAS = ['2', '3', '4', '5', '6', '7'] as const
const TURNOS = ['M', 'T', 'N'] as const

// matutino/vespertino têm 6 horários, noturno tem 5
function horariosDoTurno(turno: string): number[] {
  return turno === 'N' ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6]
}

export function montarGradeHorarios(turmas: TurmaParaGrade[]) {
  // grade[dia][turno][horario] = turma ou null
  const grade: Record<string, Record<string, Record<number, SlotGrade['turma']>>> = {}

  DIAS.forEach(dia => {
    grade[dia] = {}
    TURNOS.forEach(turno => {
      grade[dia][turno] = {}
      horariosDoTurno(turno).forEach(h => {
        grade[dia][turno][h] = null
      })
    })
  })

  turmas.forEach(turma => {
    const blocos = turma.horario.split(' ')
    blocos.forEach(bloco => {
      const dia = bloco[0]
      const turno = bloco[1]
      const horarios = bloco.slice(2).split('').map(Number)

      horarios.forEach(h => {
        if (grade[dia]?.[turno]?.[h] !== undefined) {
          grade[dia][turno][h] = { codigo: turma.codigo, nome: turma.nome }
        }
      })
    })
  })

  return { grade, dias: DIAS, turnos: TURNOS, horariosDoTurno }
}

export const NOMES_DIAS: Record<string, string> = {
  '2': 'Seg', '3': 'Ter', '4': 'Qua', '5': 'Qui', '6': 'Sex', '7': 'Sáb'
}

export const NOMES_TURNOS: Record<string, string> = {
  'M': 'Manhã', 'T': 'Tarde', 'N': 'Noite'
}