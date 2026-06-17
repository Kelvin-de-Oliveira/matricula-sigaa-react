import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMatricula } from '../../../context/MatriculaContext'
import { verificarConflitosDeHorario, Problema } from '../../../utils/verificarConflitos'
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, XCircle, Clock, BookX, FlaskConical } from 'lucide-react'

type EstadoVerificacao = 'verificando' | 'sucesso' | 'erro'

export default function Detalhes() {
  const navigate = useNavigate()
  const { turmasSelecionadas } = useMatricula()
  const [estado, setEstado] = useState<EstadoVerificacao>('verificando')
  const [simularPreRequisito, setSimularPreRequisito] = useState(false)

  const conflitosHorario = useMemo(() => {
    return verificarConflitosDeHorario(turmasSelecionadas)
  }, [turmasSelecionadas])

  const problemas: Problema[] = useMemo(() => {
    const lista: Problema[] = [...conflitosHorario]

    if (simularPreRequisito && turmasSelecionadas.length > 0) {
      const turmaAlvo = turmasSelecionadas[0]
      lista.push({
        tipo: 'pre-requisito',
        turma: { codigo: turmaAlvo.codigo, nome: turmaAlvo.nome },
        preRequisito: 'Estruturas de Dados (ESW301)',
      })
    }

    return lista
  }, [conflitosHorario, simularPreRequisito, turmasSelecionadas])

  useEffect(() => {
    setEstado('verificando')
    const timer = setTimeout(() => {
      setEstado(problemas.length > 0 ? 'erro' : 'sucesso')
    }, 1600)
    return () => clearTimeout(timer)
  }, [problemas.length])

  const handleContinuar = () => {
    navigate('/matricula/confirmacao')
  }

  const handleVoltarParaTurmas = () => {
    navigate('/matricula/turmas')
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
      <div className="flex-1 max-w-2xl w-full mx-auto px-6 py-8">

        {/* Indicador de etapa */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-semibold text-white px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#1a3a5c' }}>
            Etapa 3 de 5
          </span>
          <span className="text-sm text-gray-500">Verificação de pré-requisitos e horários</span>
        </div>

        {/* Botão de teste (ferramenta de protótipo, não faz parte do fluxo real) */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <FlaskConical className="w-3.5 h-3.5 text-gray-400" />
          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={simularPreRequisito}
              onChange={(e) => setSimularPreRequisito(e.target.checked)}
              className="w-3.5 h-3.5"
            />
            Simular pré-requisito não cumprido (teste)
          </label>
        </div>

        {/* Estado: verificando */}
        {estado === 'verificando' && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 flex flex-col items-center text-center">
            <Loader2 className="w-10 h-10 animate-spin mb-4" style={{ color: '#1a3a5c' }} />
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Verificando sua seleção</h2>
            <p className="text-sm text-gray-500">
              Estamos checando pré-requisitos, co-requisitos e possíveis choques de horário entre as disciplinas selecionadas.
            </p>
          </div>
        )}

        {/* Estado: sucesso */}
        {estado === 'sucesso' && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#d1fae5' }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: '#065f46' }} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Tudo certo com sua seleção</h2>
            <p className="text-sm text-gray-500 mb-6">
              Nenhum conflito de horário ou pré-requisito pendente foi encontrado nas {turmasSelecionadas.length} disciplinas selecionadas.
            </p>
            <button
              onClick={handleContinuar}
              className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#1a3a5c' }}
            >
              Continuar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Estado: erro */}
        {estado === 'erro' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex flex-col items-center text-center p-8 pb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: '#fee2e2' }}>
                <XCircle className="w-8 h-8" style={{ color: '#991b1b' }} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Encontramos pendências na sua seleção</h2>
              <p className="text-sm text-gray-500">
                Resolva os itens abaixo antes de prosseguir com a matrícula.
              </p>
            </div>

            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {problemas.map((problema, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: '#fee2e2' }}>
                    {problema.tipo === 'horario' ? (
                      <Clock className="w-4 h-4" style={{ color: '#991b1b' }} />
                    ) : (
                      <BookX className="w-4 h-4" style={{ color: '#991b1b' }} />
                    )}
                  </div>

                  {problema.tipo === 'horario' ? (
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Choque de horário</p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        <strong>{problema.turmaA.codigo}</strong> — {problema.turmaA.nome} colide com{' '}
                        <strong>{problema.turmaB.codigo}</strong> — {problema.turmaB.nome} no horário{' '}
                        <span className="font-mono">{problema.blocoConflitante}</span>.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Pré-requisito não cumprido</p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        <strong>{problema.turma.codigo}</strong> — {problema.turma.nome} exige a aprovação prévia em{' '}
                        <strong>{problema.preRequisito}</strong>, que não consta no seu histórico.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-gray-100">
              <button
                onClick={handleVoltarParaTurmas}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
                style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
              >
                <ArrowLeft className="w-4 h-4" /> Revisar seleção de disciplinas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}