import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMatricula } from '../../../context/MatriculaContext'
import { formatarHorario } from '../../../utils/formatarHorario'
import HeaderSIGAA from '../../../components/shared/HeaderSIGAA'
import { Clock, Building2, User, Loader2, FlaskConical, CalendarClock } from 'lucide-react'

export default function Status() {
  const navigate = useNavigate()
  const { turmasSelecionadas, setStatus } = useMatricula()
  const [sorteando, setSorteando] = useState(false)

  const handleSimularResultado = async () => {
    setStatus('processando')
    setSorteando(true)
    await new Promise(r => setTimeout(r, 1200))
    navigate('/matricula/resultado')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e8f0f7' }}>

      <HeaderSIGAA />

      {/* Conteúdo */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-8">

        {/* Indicador de etapa */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-semibold text-white px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#1a3a5c' }}>
            Etapa 5 de 5
          </span>
          <span className="text-sm text-gray-500">Processando solicitação</span>
        </div>

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Sua solicitação está em análise</h1>
          <p className="text-base font-medium mt-2" style={{ color: '#1a3a5c' }}>
            As disciplinas abaixo estão sendo processadas pelo sistema acadêmico.
          </p>
        </div>

        {/* Aviso de prazo */}
        <div className="rounded-lg px-4 py-3 mb-6 flex items-start gap-2.5"
          style={{ backgroundColor: '#e6f1fb', border: '1px solid #85b7eb' }}>
          <CalendarClock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#0c447c' }} />
          <p className="text-sm" style={{ color: '#0c447c' }}>
            O resultado da sua solicitação será divulgado em até 3 dias úteis, a partir do encerramento do período de ajustes. Acompanhe esta página ou seu e-mail institucional.
          </p>
        </div>

        {/* Lista de disciplinas (status processando) */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200"
            style={{ backgroundColor: '#f4f7fb' }}>
            <h2 className="text-sm font-semibold text-gray-900">Disciplinas solicitadas</h2>
            <span className="text-xs text-gray-500">{turmasSelecionadas.length} disciplina{turmasSelecionadas.length > 1 ? 's' : ''}</span>
          </div>

          <div className="divide-y divide-gray-100">
            {turmasSelecionadas.map(turma => (
              <div key={turma.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <span className="text-xs font-mono text-gray-400">{turma.codigo}</span>
                    <p className="text-sm font-semibold text-gray-900">{turma.nome}</p>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#f1efe8', color: '#5f5e5a' }}>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Processando
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {turma.docente}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {formatarHorario(turma.horario)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {turma.unidade}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de mock — ferramenta de protótipo */}
        <div className="flex items-center justify-end gap-2 pb-8">
          <FlaskConical className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={handleSimularResultado}
            disabled={sorteando}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50"
            style={{ borderColor: '#d1d5db', color: '#6b7280' }}
          >
            {sorteando ? 'Simulando resultado...' : 'Simular divulgação do resultado (teste)'}
          </button>
        </div>
      </div>
    </div>
  )
}