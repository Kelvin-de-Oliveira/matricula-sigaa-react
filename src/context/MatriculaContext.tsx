import { createContext, useContext, useState, ReactNode } from 'react'

interface Turma {
  id: string
  codigo: string
  nome: string
  periodo: number
  creditos: number
  vagas: number
  vagasOcupadas: number
  docente: string
  horario: string
  unidade: string
}

interface MatriculaState {
  turmasSelecionadas: Turma[]
  statusAtual: 'idle' | 'processando' | 'matriculado' | 'indeferido'
  conflitos: string[]
}

interface MatriculaContextType extends MatriculaState {
  toggleTurma: (turma: Turma) => void
  isSelecionada: (id: string) => boolean
  removerTurma: (id: string) => void
  setStatus: (status: MatriculaState['statusAtual']) => void
  adicionarConflito: (conflito: string) => void
  limparConflitos: () => void
}

const MatriculaContext = createContext<MatriculaContextType | null>(null)

export function MatriculaProvider({ children }: { children: ReactNode }) {
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<Turma[]>([])
  const [statusAtual, setStatusAtual] = useState<MatriculaState['statusAtual']>('idle')
  const [conflitos, setConflitos] = useState<string[]>([])

  const toggleTurma = (turma: Turma) => {
    setTurmasSelecionadas(prev =>
      prev.some(t => t.id === turma.id)
        ? prev.filter(t => t.id !== turma.id)
        : [...prev, turma]
    )
  }

  const isSelecionada = (id: string) => {
    return turmasSelecionadas.some(t => t.id === id)
  }

  const removerTurma = (id: string) => {
    setTurmasSelecionadas(prev => prev.filter(t => t.id !== id))
  }

  const setStatus = (status: MatriculaState['statusAtual']) => {
    setStatusAtual(status)
  }

  const adicionarConflito = (conflito: string) => {
    setConflitos(prev => [...prev, conflito])
  }

  const limparConflitos = () => setConflitos([])

  return (
    <MatriculaContext.Provider value={{
      turmasSelecionadas,
      statusAtual,
      conflitos,
      toggleTurma,
      isSelecionada,
      removerTurma,
      setStatus,
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