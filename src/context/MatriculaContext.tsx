import { createContext, useContext, useState, ReactNode } from 'react'

interface Turma {
  id: string
  codigo: string
  nome: string
  professor: string
  horario: string
  vagas: number
  vagasOcupadas: number
}

interface MatriculaState {
  turmasSelecionadas: Turma[]
  statusAtual: 'idle' | 'processando' | 'matriculado' | 'indeferido'
  dadosCadastrais: { nome: string; email: string; telefone: string } | null
  conflitos: string[]
  primeiroacesso: boolean
}

interface MatriculaContextType extends MatriculaState {
  selecionarTurma: (turma: Turma) => void
  removerTurma: (id: string) => void
  setStatus: (status: MatriculaState['statusAtual']) => void
  setDadosCadastrais: (dados: MatriculaState['dadosCadastrais']) => void
  adicionarConflito: (conflito: string) => void
  limparConflitos: () => void
}

const MatriculaContext = createContext<MatriculaContextType | null>(null)

export function MatriculaProvider({ children }: { children: ReactNode }) {
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<Turma[]>([])
  const [statusAtual, setStatusAtual] = useState<MatriculaState['statusAtual']>('idle')
  const [dadosCadastrais, setDadosCadastraisState] = useState<MatriculaState['dadosCadastrais']>(null)
  const [conflitos, setConflitos] = useState<string[]>([])
  const primeiroacesso = true

  const selecionarTurma = (turma: Turma) => {
    setTurmasSelecionadas(prev => [...prev, turma])
  }

  const removerTurma = (id: string) => {
    setTurmasSelecionadas(prev => prev.filter(t => t.id !== id))
  }

  const setStatus = (status: MatriculaState['statusAtual']) => {
    setStatusAtual(status)
  }

  const setDadosCadastrais = (dados: MatriculaState['dadosCadastrais']) => {
    setDadosCadastraisState(dados)
  }

  const adicionarConflito = (conflito: string) => {
    setConflitos(prev => [...prev, conflito])
  }

  const limparConflitos = () => setConflitos([])

  return (
    <MatriculaContext.Provider value={{
      turmasSelecionadas,
      statusAtual,
      dadosCadastrais,
      conflitos,
      primeiroacesso,
      selecionarTurma,
      removerTurma,
      setStatus,
      setDadosCadastrais,
      adicionarConflito,
      limparConflitos,
    }}>
      {children}
    </MatriculaContext.Provider>
  )
}

export function useMatricula() {
  const context = useContext(MatriculaContext)
  if (!context) throw new Error('useMatricula deve ser usado dentro de MatriculaProvider')
  return context
}