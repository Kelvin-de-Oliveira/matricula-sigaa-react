import { useState, useMemo } from 'react'
import turmasData from '../mocks/turmasOfertadas.json'
import turmasEquivalentesData from '../mocks/turmasEquivalentes.json'
import turmasNucleoLivreData from '../mocks/turmasNucleoLivre.json'

interface TurmaFiltravel {
  nome: string
  codigo: string
  docente: string
  horario: string
  unidade: string
}


export function useFiltroTurmas(semestre: string) {
  const [filtroHorario, setFiltroHorario] = useState('')
  const [filtroUnidade, setFiltroUnidade] = useState('')
  const [filtroBusca, setFiltroBusca] = useState('')
  const [filtroDocente, setFiltroDocente] = useState('')

  const periodosVisiveis = useMemo(() => {
    const ehImpar = semestre.endsWith('.1')
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(p =>
      ehImpar ? p % 2 !== 0 : p % 2 === 0
    )
  }, [semestre])

  const turmasPorPeriodo = useMemo(() => {
    const grupos: Record<number, typeof turmasData.turmas> = {}
    periodosVisiveis.forEach(p => {
      grupos[p] = turmasData.turmas.filter(t => t.periodo === p)
    })
    return grupos
  }, [periodosVisiveis])

  const aplicarSubfiltros = <T extends TurmaFiltravel>(lista: T[]): T[] => {
  return lista.filter(turma => {
    const passaHorario = !filtroHorario || turma.horario.includes(filtroHorario)
    const passaUnidade = !filtroUnidade || turma.unidade === filtroUnidade
    const passaBusca = !filtroBusca ||
      turma.nome.toLowerCase().includes(filtroBusca.toLowerCase()) ||
      turma.codigo.toLowerCase().includes(filtroBusca.toLowerCase())
    const passaDocente = !filtroDocente ||
      turma.docente.toLowerCase().includes(filtroDocente.toLowerCase())

    return passaHorario && passaUnidade && passaBusca && passaDocente
  })
}

  const turmasEquivalentesFiltradas = useMemo(() => {
    return aplicarSubfiltros(turmasEquivalentesData.turmas)
  }, [filtroHorario, filtroUnidade, filtroBusca, filtroDocente])

  const limparSubfiltros = () => {
    setFiltroHorario('')
    setFiltroUnidade('')
    setFiltroBusca('')
    setFiltroDocente('')
  }

  const turmasNucleoLivreFiltradas = useMemo(() => {
    return aplicarSubfiltros(turmasNucleoLivreData.turmas)
  }, [filtroHorario, filtroUnidade, filtroBusca, filtroDocente])

  return {
    periodosVisiveis,
    turmasPorPeriodo,
    filtroHorario, setFiltroHorario,
    filtroUnidade, setFiltroUnidade,
    filtroBusca, setFiltroBusca,
    filtroDocente, setFiltroDocente,
    turmasEquivalentesFiltradas,
    limparSubfiltros,
    turmasNucleoLivreFiltradas,
  }
}