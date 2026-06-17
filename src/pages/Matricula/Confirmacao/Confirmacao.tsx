import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMatricula } from '../../../context/MatriculaContext'
import { montarGradeHorarios, NOMES_DIAS, NOMES_TURNOS } from '../../../utils/montarGradeHorarios'
import { formatarHorario } from '../../../utils/formatarHorario'
import { ArrowLeft, ArrowRight, AlertTriangle, User, Clock, Building2, X, Lock, Calendar, XCircle } from 'lucide-react'

export default function Confirmacao() {
  const navigate = useNavigate()
  const { turmasSelecionadas } = useMatricula()

  const [modalAberto, setModalAberto] = useState(false)
  const [senha, setSenha] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [erroAutenticacao, setErroAutenticacao] = useState(false)
  const [validando, setValidando] = useState(false)

  const { grade, dias, turnos, horariosDoTurno } = useMemo(() => {
    return montarGradeHorarios(turmasSelecionadas)
  }, [turmasSelecionadas])

  const handleAbrirModal = () => {
    setSenha('')
    setDataNascimento('')
    setErroAutenticacao(false)
    setModalAberto(true)
  }

  const handleConfirmar = async () => {
    setValidando(true)
    setErroAutenticacao(false)

    await new Promise(r => setTimeout(r, 900))

    // Mock: credenciais válidas = senha "123456" e data "2003-08-22" (igual ao mock do aluno)
    if (senha === '$3nhaTeste' && dataNascimento === '2003-08-22') {
      navigate('/matricula/status')
    } else {
      setErroAutenticacao(true)
      setValidando(false)
    }
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
      <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">

        {/* Indicador de etapa */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-semibold text-white px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#1a3a5c' }}>
            Etapa 4 de 5
          </span>
          <span className="text-sm text-gray-500">Confirmação da matrícula</span>
        </div>

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Revise sua matrícula</h1>
          <p className="text-base font-medium mt-2" style={{ color: '#1a3a5c' }}>
            Confira atentamente as disciplinas e horários antes de confirmar.
          </p>
        </div>

        {/* Aviso */}
        <div className="rounded-lg px-4 py-3 mb-6 flex items-start gap-2.5"
          style={{ backgroundColor: '#fff9e6', border: '1px solid #ffc107' }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#856404' }} />
          <p className="text-sm" style={{ color: '#856404' }}>
            Verifique se todas as disciplinas selecionadas e os horários estão corretos. Após confirmar, sua solicitação será enviada para processamento.
          </p>
        </div>

        {/* Resumo das disciplinas */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200"
            style={{ backgroundColor: '#f4f7fb' }}>
            <h2 className="text-sm font-semibold text-gray-900">Disciplinas selecionadas</h2>
            <span className="text-xs text-gray-500">{turmasSelecionadas.length} disciplina{turmasSelecionadas.length > 1 ? 's' : ''}</span>
          </div>

          <div className="divide-y divide-gray-100">
            {turmasSelecionadas.map(turma => (
              <div key={turma.id} className="px-5 py-4">
                <span className="text-xs font-mono text-gray-400">{turma.codigo}</span>
                <p className="text-sm font-semibold text-gray-900">{turma.nome}</p>
                <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
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

        {/* Grade de horários */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-gray-200" style={{ backgroundColor: '#f4f7fb' }}>
            <h2 className="text-sm font-semibold text-gray-900">Sua grade de horários</h2>
          </div>

          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse" style={{ minWidth: '600px' }}>
              <thead>
                <tr>
                  <th className="text-xs font-medium text-gray-400 text-left p-2 w-16"></th>
                  {dias.map(dia => (
                    <th key={dia} className="text-xs font-semibold text-gray-700 p-2 text-center">
                      {NOMES_DIAS[dia]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {turnos.map(turno => (
                  <>
                    <tr key={`${turno}-label`}>
                      <td colSpan={dias.length + 1} className="pt-3 pb-1">
                        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#1a3a5c' }}>
                          {NOMES_TURNOS[turno]}
                        </span>
                      </td>
                    </tr>
                    {horariosDoTurno(turno).map(h => (
                      <tr key={`${turno}-${h}`}>
                        <td className="text-xs text-gray-400 p-2 text-center font-mono">{turno}{h}</td>
                        {dias.map(dia => {
                          const slot = grade[dia][turno][h]
                          return (
                            <td key={`${dia}-${turno}-${h}`} className="p-1">
                              {slot ? (
                                <div className="rounded-lg px-2 py-2 text-center"
                                  style={{ backgroundColor: '#e8f0f7', border: '1px solid #b6cbe0' }}>
                                  <span className="text-xs font-semibold" style={{ color: '#1a3a5c' }}>
                                    {slot.codigo}
                                  </span>
                                </div>
                              ) : (
                                <div className="rounded-lg px-2 py-2 bg-gray-50 h-full" />
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between gap-3 pb-8">
          <button
            onClick={() => navigate('/matricula/detalhes')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
            style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          <button
            onClick={handleAbrirModal}
            className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1a3a5c' }}
          >
            Confirmar matrícula <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal de confirmação de identidade */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setModalAberto(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-semibold text-gray-900 mb-1">Confirme sua identidade</h2>
            <p className="text-sm text-gray-500 mb-5">
              Para concluir a matrícula, informe novamente sua senha e data de nascimento.
            </p>

            <div className="flex flex-col gap-4 mb-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  Senha
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Data de nascimento
                </label>
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {erroAutenticacao && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-4"
                style={{ backgroundColor: '#fee2e2' }}>
                <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#991b1b' }} />
                <p className="text-sm" style={{ color: '#991b1b' }}>
                  Senha ou data de nascimento incorretos. Tente novamente.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                onClick={() => setModalAberto(false)}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
                style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                disabled={!senha || !dataNascimento || validando}
                className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1a3a5c' }}
              >
                {validando ? 'Validando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}