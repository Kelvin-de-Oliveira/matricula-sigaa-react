import { Clock, Building2, User, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { formatarHorario } from '../../utils/formatarHorario'
import type { Turma } from '../../context/MatriculaContext'

type StatusBadge = 'nenhum' | 'processando' | 'matriculado' | 'indeferido'

interface DisciplinaResumoCardProps {
  turma: Turma
  status?: StatusBadge
  motivoIndeferimento?: string
}

const BADGES: Record<Exclude<StatusBadge, 'nenhum'>, { texto: string; bg: string; cor: string; icon: typeof Loader2 }> = {
  processando: { texto: 'Processando', bg: '#f1efe8', cor: '#5f5e5a', icon: Loader2 },
  matriculado: { texto: 'Matriculado', bg: '#d1fae5', cor: '#065f46', icon: CheckCircle2 },
  indeferido: { texto: 'Indeferido', bg: '#fee2e2', cor: '#991b1b', icon: XCircle },
}

export default function DisciplinaResumoCard({
  turma,
  status = 'nenhum',
  motivoIndeferimento,
}: DisciplinaResumoCardProps) {
  const badge = status !== 'nenhum' ? BADGES[status] : null
  const Icon = badge?.icon

  return (
    <div className="px-5 py-4">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
            style={{ backgroundColor: '#e8f0f7', color: '#1a3a5c' }}>
            {turma.codigo}
          </span>
          <p className="text-sm font-semibold text-gray-900 mt-1">{turma.nome}</p>
        </div>

        {badge && Icon && (
          <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ backgroundColor: badge.bg, color: badge.cor }}>
            <Icon className={`w-3.5 h-3.5 ${status === 'processando' ? 'animate-spin' : ''}`} />
            {badge.texto}
          </span>
        )}
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

      {status === 'indeferido' && motivoIndeferimento && (
        <div className="flex items-start gap-2 mt-2.5 px-3 py-2 rounded-lg" style={{ backgroundColor: '#fef2f2' }}>
          <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#991b1b' }} />
          <p className="text-xs" style={{ color: '#991b1b' }}>{motivoIndeferimento}</p>
        </div>
      )}
    </div>
  )
}