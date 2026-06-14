import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAluno } from '../../../hooks/useAluno'
import { useMatricula } from '../../../context/MatriculaContext'
import turmasData from '../../../mocks/turmasOfertadas.json'
import { ArrowLeft, ArrowRight, Filter, Users, Clock, Building2, User, BookOpen, Check } from 'lucide-react'

type FiltroTipo = 'curso' | 'equivalentes' | 'nucleo-livre' | 'selecionadas'

export default function Turmas() {
  const navigate = useNavigate()
  const aluno = useAluno()
  const { turmasSelecionadas, toggleTurma, isSelecionada } = useMatricula()
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('curso')

  // Determina períodos a exibir: ímpares para semestre .1, pares para .2
  const periodosVisiveis = useMemo(() => {
    const ehImpar = aluno.semestre.endsWith('.1')
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(p =>
      ehImpar ? p % 2 !== 0 : p % 2 === 0
    )
  }, [aluno.semestre])

  // Agrupa turmas por período
  const turmasPorPeriodo = useMemo(() => {
    const grupos: Record<number, typeof turmasData.turmas> = {}
    periodosVisiveis.forEach(p => {
      grupos[p] = turmasData.turmas.filter(t => t.periodo === p)
    })
    return grupos
  }, [periodosVisiveis])

  // Decodifica horário "2M12" → "Seg M12"
  const decodificarHorario = (horario: string) => {
    const dias: Record<string, string> = {
      '2': 'Seg', '3': 'Ter', '4': 'Qua', '5': 'Qui', '6': 'Sex', '7': 'Sáb'
    }
    const turnos: Record<string, string> = { 'M': 'M', 'T': 'T', 'N': 'N' }
    return horario.split(' ').map(bloco => {
      const dia = dias[bloco[0]] || bloco[0]
      const turno = turnos[bloco[1]] || bloco[1]
      const horarios = bloco.slice(2)
      return `${dia} ${turno}${horarios}`
    }).join(' · ')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e8f0f7' }}>

      {/* Header */}
      <header style={{ backgroundColor: '#1a3a5c' }} className="px-6 py-3">
        <button
          onClick={() => navigate('/portal')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-xs"
            style={{ backgroundColor: '#2a5298' }}>
            SIGAA
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-sm">SIGAA</div>
            <div className="text-blue-200 text-xs">Universidade Federal de Goiás</div>
          </div>
        </button>
      </header>

      {/* Conteúdo */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">

        {/* Indicador de etapa */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-semibold text-white px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#1a3a5c' }}>
            Etapa 2 de 5
          </span>
          <span className="text-sm text-gray-500">Seleção de turmas</span>
        </div>

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Selecione as disciplinas</h1>
          <p className="text-base font-medium mt-2" style={{ color: '#1a3a5c' }}>
            Marque as disciplinas que deseja cursar em <strong>{aluno.semestre}</strong>. Você pode revisar a seleção antes de confirmar a matrícula.
          </p>
        </div>

        {/* Filtro principal */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4" style={{ color: '#1a3a5c' }} />
            <h2 className="text-sm font-semibold text-gray-900">Tipo de disciplina</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'curso' as FiltroTipo, label: 'Ofertadas pelo curso' },
              { id: 'equivalentes' as FiltroTipo, label: 'Equivalentes' },
              { id: 'nucleo-livre' as FiltroTipo, label: 'Núcleo livre' },
            ].map(opcao => (
              <button
                key={opcao.id}
                onClick={() => setFiltroTipo(opcao.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                style={{
                  backgroundColor: filtroTipo === opcao.id ? '#1a3a5c' : 'white',
                  borderColor: filtroTipo === opcao.id ? '#1a3a5c' : '#d1d5db',
                  color: filtroTipo === opcao.id ? 'white' : '#374151'
                }}
              >
                {opcao.label}
              </button>
            ))}

            <button
              onClick={() => setFiltroTipo('selecionadas')}
              className="px-4 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-2"
              style={{
                backgroundColor: filtroTipo === 'selecionadas' ? '#1a3a5c' : 'white',
                borderColor: filtroTipo === 'selecionadas' ? '#1a3a5c' : '#d1d5db',
                color: filtroTipo === 'selecionadas' ? 'white' : '#374151'
              }}
            >
              Selecionadas
              {turmasSelecionadas.length > 0 && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: filtroTipo === 'selecionadas' ? 'white' : '#1a3a5c',
                    color: filtroTipo === 'selecionadas' ? '#1a3a5c' : 'white'
                  }}>
                  {turmasSelecionadas.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Aviso para filtros ainda não implementados */}
        {(filtroTipo === 'equivalentes' || filtroTipo === 'nucleo-livre') && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 text-center">
            <p className="text-sm text-gray-500">
              Filtros adicionais serão exibidos aqui na próxima etapa do protótipo.
            </p>
          </div>
        )}

        {/* Aviso de lista vazia em "Selecionadas" */}
        {filtroTipo === 'selecionadas' && turmasSelecionadas.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 text-center">
            <p className="text-sm text-gray-500">
              Você ainda não selecionou nenhuma disciplina. Use a aba "Ofertadas pelo curso" para começar.
            </p>
          </div>
        )}

        {/* Disciplinas por período (filtro: curso) */}
        {filtroTipo === 'curso' && (
          <div className="flex flex-col gap-5">
            {periodosVisiveis.map(periodo => {
              const turmas = turmasPorPeriodo[periodo]
              if (!turmas || turmas.length === 0) return null

              return (
                <div key={periodo} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Cabeçalho do período */}
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200"
                    style={{ backgroundColor: '#f4f7fb' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: '#1a3a5c' }}>
                      {periodo}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{periodo}º período</h3>
                      <p className="text-xs text-gray-500">{turmas.length} disciplina{turmas.length > 1 ? 's' : ''} disponível{turmas.length > 1 ? 'is' : ''}</p>
                    </div>
                  </div>

                  {/* Lista de disciplinas */}
                  <div className="divide-y divide-gray-100">
                    {turmas.map(turma => {
                      const isSelected = isSelecionada(turma.id)
                      const vagasRestantes = turma.vagas - turma.vagasOcupadas
                      const lotada = vagasRestantes === 0

                      return (
                        <label
                          key={turma.id}
                          className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          {/* Checkbox */}
                          <div className="pt-0.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleTurma(turma)}
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

                          {/* Conteúdo */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <div>
                                <span className="text-xs font-mono text-gray-400">{turma.codigo}</span>
                                <p className="text-sm font-semibold text-gray-900">{turma.nome}</p>
                              </div>
                              {lotada && (
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
                                  Lotada
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
                                {decodificarHorario(turma.horario)}
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
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Lista de disciplinas selecionadas (filtro: selecionadas) */}
        {filtroTipo === 'selecionadas' && turmasSelecionadas.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200"
              style={{ backgroundColor: '#f4f7fb' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: '#1a3a5c' }}>
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Disciplinas selecionadas</h3>
                <p className="text-xs text-gray-500">{turmasSelecionadas.length} disciplina{turmasSelecionadas.length > 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {turmasSelecionadas.map(turma => {
                const vagasRestantes = turma.vagas - turma.vagasOcupadas
                return (
                  <div key={turma.id} className="flex items-start gap-3 px-5 py-4 bg-blue-50">
                    <div className="pt-0.5">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center"
                        style={{ backgroundColor: '#1a3a5c', borderColor: '#1a3a5c' }}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <span className="text-xs font-mono text-gray-400">{turma.codigo}</span>
                          <p className="text-sm font-semibold text-gray-900">{turma.nome}</p>
                        </div>
                        <button
                          onClick={() => toggleTurma(turma)}
                          className="text-xs font-medium px-2 py-1 rounded-lg border transition-colors flex-shrink-0"
                          style={{ borderColor: '#d1d5db', color: '#6b7280' }}
                        >
                          Remover
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {turma.docente}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {decodificarHorario(turma.horario)}
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
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Resumo da seleção */}
        {turmasSelecionadas.length > 0 && (
          <div className="bg-white rounded-xl border-2 p-4 mt-6 flex items-center justify-between"
            style={{ borderColor: '#1a3a5c' }}>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: '#1a3a5c' }} />
              <p className="text-sm font-medium text-gray-900">
                <strong>{turmasSelecionadas.length}</strong> disciplina{turmasSelecionadas.length > 1 ? 's' : ''} selecionada{turmasSelecionadas.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}

        {/* Ações */}
        <div className="flex items-center justify-between gap-3 pt-6 pb-8">
          <button
            onClick={() => navigate('/matricula/dados-cadastrais')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
            style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          <button
            onClick={() => navigate('/matricula/detalhes/preview')}
            disabled={turmasSelecionadas.length === 0}
            className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#1a3a5c' }}
          >
            Continuar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}