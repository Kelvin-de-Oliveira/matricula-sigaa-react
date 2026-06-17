import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAluno } from '../../../hooks/useAluno'
import { User, MapPin, Phone, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react'
import HeaderSIGAA from '../../../components/shared/HeaderSIGAA'
import ModalConfirmacao from '../../../components/shared/ModalConfirmacao'

export default function DadosCadastrais() {
  const navigate = useNavigate()
  const aluno = useAluno()

  const [formData, setFormData] = useState({
    telefone: aluno.telefone,
    endereco: aluno.endereco,
    cep: aluno.cep,
    rendaPerCapita: aluno.rendaPerCapita,
  })

  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleConfirm = () => {
    setShowConfirm(false)
    navigate('/matricula/turmas')
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  const calcularIdade = (dataNascimento: string) => {
    const nascimento = new Date(dataNascimento)
    const hoje = new Date()
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--
    }
    return idade
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
            Etapa 1 de 5
          </span>
          <span className="text-sm text-gray-500">Confirmação de dados cadastrais</span>
        </div>

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Confirme seus dados cadastrais</h1>
          <p className="text-base font-medium mt-2" style={{ color: '#1a3a5c' }}>
            Antes de prosseguir com a matrícula, revise e atualize suas informações se necessário.
          </p>
        </div>

        {/* Card de dados pessoais (somente leitura) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4" style={{ color: '#1a3a5c' }} />
            <h2 className="text-sm font-semibold text-gray-900">Dados pessoais</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400">Nome completo</label>
              <p className="text-sm text-gray-800 mt-1">{aluno.nome}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">Matrícula</label>
              <p className="text-sm text-gray-800 mt-1">{aluno.id}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">CPF</label>
              <p className="text-sm text-gray-800 mt-1">{aluno.cpf}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">Idade</label>
              <p className="text-sm text-gray-800 mt-1">{calcularIdade(aluno.dataNascimento)} anos</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">Curso</label>
              <p className="text-sm text-gray-800 mt-1">{aluno.curso}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">Período</label>
              <p className="text-sm text-gray-800 mt-1">{aluno.periodo}º período</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Dados pessoais não podem ser alterados aqui. Para corrigir, procure a secretaria acadêmica.
          </p>
        </div>

        {/* Card de dados editáveis */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4" style={{ color: '#1a3a5c' }} />
            <h2 className="text-sm font-semibold text-gray-900">Contato e endereço</h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                Telefone
              </label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Endereço</label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => handleChange('endereco', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 max-w-xs">
              <label className="text-sm font-medium text-gray-700">CEP</label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => handleChange('cep', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Card de dados socioeconômicos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4" style={{ color: '#1a3a5c' }} />
            <h2 className="text-sm font-semibold text-gray-900">Informações socioeconômicas</h2>
          </div>

          <div className="flex flex-col gap-1.5 max-w-xs">
            <label className="text-sm font-medium text-gray-700">Renda per capita familiar (R$)</label>
            <input
              type="text"
              value={formData.rendaPerCapita}
              onChange={(e) => handleChange('rendaPerCapita', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400">
              Usado para fins de avaliação de programas de assistência estudantil.
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between gap-3 pb-8">
          <button
            onClick={() => navigate('/portal')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
            style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1a3a5c' }}
          >
            Continuar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal de confirmação */}
      {showConfirm && (
        <ModalConfirmacao
          titulo="Confirmar dados cadastrais"
          mensagem="Você confirma que os dados de contato, endereço e informações socioeconômicas exibidos estão corretos e atualizados? Esta confirmação é necessária para prosseguir com a matrícula."
          onConfirmar={handleConfirm}
          onCancelar={handleCancel}
        />
      )}
    </div>
  )
}