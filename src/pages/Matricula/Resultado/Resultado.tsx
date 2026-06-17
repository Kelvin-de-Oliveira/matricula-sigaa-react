import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMatricula } from '../../../context/MatriculaContext'
import { sortearResultadoMatricula } from '../../../utils/sortearResultadoMatricula'
import { formatarHorario } from '../../../utils/formatarHorario'
import HeaderSIGAA from '../../../components/shared/HeaderSIGAA'
import DisciplinaResumoCard from '../../../components/shared/DisciplinaResumoCard'
import { CheckCircle2, XCircle, Clock, Building2, User, Home, Building } from 'lucide-react'

export default function Resultado() {
  const navigate = useNavigate()
  const { turmasSelecionadas } = useMatricula()

  const resultados = useMemo(() => {
    return sortearResultadoMatricula(turmasSelecionadas)
  }, [turmasSelecionadas])

  const quantidadeMatriculadas = resultados.filter(r => r.status === 'matriculado').length
  const quantidadeIndeferidas = resultados.filter(r => r.status === 'indeferido').length

  const handleVoltarPortal = () => {
    navigate('/portal')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e8f0f7' }}>

      <HeaderSIGAA />

      {/* Conteúdo */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-8">

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Resultado da matrícula</h1>
          <p className="text-base font-medium mt-2" style={{ color: '#1a3a5c' }}>
            {quantidadeIndeferidas === 0
              ? 'Todas as suas solicitações foram deferidas.'
              : `${quantidadeMatriculadas} de ${resultados.length} disciplinas foram deferidas.`}
          </p>
        </div>

        {/* Lista de resultados por disciplina */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200"
            style={{ backgroundColor: '#f4f7fb' }}>
            <h2 className="text-sm font-semibold text-gray-900">Disciplinas solicitadas</h2>
            <span className="text-xs text-gray-500">{resultados.length} disciplina{resultados.length > 1 ? 's' : ''}</span>
          </div>

          <div className="divide-y divide-gray-100">
            {resultados.map(resultado => (
              <DisciplinaResumoCard
                key={resultado.turma.id}
                turma={resultado.turma}
                status={resultado.status}
                motivoIndeferimento={resultado.motivoIndeferimento}
              />
            ))}
          </div>
        </div>

        {/* Aviso de orientação */}
        <div className="rounded-lg px-4 py-3 mb-6 flex items-start gap-2.5"
          style={{ backgroundColor: '#fff9e6', border: '1px solid #ffc107' }}>
          <Building className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#856404' }} />
          <p className="text-sm" style={{ color: '#856404' }}>
            Para mais informações sobre disciplinas indeferidas ou casos excepcionais, procure a coordenação do seu curso.
          </p>
        </div>

        {/* Ação */}
        <div className="flex items-center justify-end pb-8">
          <button
            onClick={handleVoltarPortal}
            className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1a3a5c' }}
          >
            <Home className="w-4 h-4" /> Retornar ao painel
          </button>
        </div>
      </div>
    </div>
  )
}