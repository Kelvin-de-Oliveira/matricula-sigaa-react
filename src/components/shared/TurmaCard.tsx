import { Check, Clock, Building2, User, Users } from 'lucide-react'
import { formatarHorario } from '../../utils/formatarHorario'
import type { Turma } from '../../context/MatriculaContext'

interface TurmaCardProps {
  turma: Turma
  isSelected: boolean
  onToggle: (turma: Turma) => void
  variant?: 'checkbox' | 'selecionada'
  badgeEquivalencia?: string
}

export default function TurmaCard({
  turma,
  isSelected,
  onToggle,
  variant = 'checkbox',
  badgeEquivalencia,
}: TurmaCardProps) {
  const vagasRestantes = turma.vagas - turma.vagasOcupadas
  const lotada = vagasRestantes === 0

  const conteudo = (
    <>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
                style={{ backgroundColor: '#e8f0f7', color: '#1a3a5c' }}>
                {turma.codigo}
              </span>
            <p className="text-sm font-semibold text-gray-900">{turma.nome}</p>
          </div>
          {variant === 'checkbox' && lotada && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
              Lotada
            </span>
          )}
          {variant === 'selecionada' && (
            <button
              onClick={() => onToggle(turma)}
              className="text-xs font-medium px-2 py-1 rounded-lg border transition-colors flex-shrink-0"
              style={{ borderColor: '#d1d5db', color: '#6b7280' }}
            >
              Remover
            </button>
          )}
        </div>

        {badgeEquivalencia && (
          <div className="flex items-center gap-1.5 mt-1.5 mb-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>
              {badgeEquivalencia}
            </span>
          </div>
        )}

        <div className={`grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 ${variant === 'checkbox' && !badgeEquivalencia ? 'mt-2' : ''}`}>
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
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {vagasRestantes}/{turma.vagas} vagas
          </div>
        </div>
      </div>
    </>
  )

  if (variant === 'selecionada') {
    return (
      <label className="flex items-start gap-3 px-5 py-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
        <div className="pt-0.5">
          <input
            type="checkbox"
            checked={true}
            onChange={() => onToggle(turma)}
            className="sr-only"
          />
          <div className="w-5 h-5 rounded border-2 flex items-center justify-center"
            style={{ backgroundColor: '#1a3a5c', borderColor: '#1a3a5c' }}>
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        {conteudo}
      </label>
    )
  }

  return (
    <label
      className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <div className="pt-0.5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(turma)}
          disabled={lotada}
          className="sr-only"
        />
        <div
          className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
          style={{
            backgroundColor: isSelected ? '#1a3a5c' : 'white',
            borderColor: isSelected ? '#1a3a5c' : lotada ? '#d1d5db' : '#9ca3af',
            opacity: lotada ? 0.4 : 1
          }}
        >
          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
      </div>
      {conteudo}
    </label>
  )
}