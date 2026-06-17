import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMatricula } from '../../../context/MatriculaContext'
import { sortearResultadoMatricula } from '../../../utils/sortearResultadoMatricula'
import { formatarHorario } from '../../../utils/formatarHorario'
import HeaderSIGAA from '../../../components/shared/HeaderSIGAA'
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
              <div key={resultado.turma.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <span className="text-xs font-mono text-gray-400">{resultado.turma.codigo}</span>
                    <p className="text-sm font-semibold text-gray-900">{resultado.turma.nome}</p>
                  </div>

                  {resultado.status === 'matriculado' ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Matriculado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
                      <XCircle className="w-3.5 h-3.5" />
                      Indeferido
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {resultado.turma.docente}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {formatarHorario(resultado.turma.horario)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {resultado.turma.unidade}
                  </div>
                </div>

                {resultado.status === 'indeferido' && resultado.motivoIndeferimento && (
                  <div className="flex items-start gap-2 mt-2.5 px-3 py-2 rounded-lg"
                    style={{ backgroundColor: '#fef2f2' }}>
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#991b1b' }} />
                    <p className="text-xs" style={{ color: '#991b1b' }}>
                      {resultado.motivoIndeferimento}
                    </p>
                  </div>
                )}
              </div>
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