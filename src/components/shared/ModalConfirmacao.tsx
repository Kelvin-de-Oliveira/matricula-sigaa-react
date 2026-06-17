import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalConfirmacaoProps {
  titulo: string
  mensagem?: string
  onConfirmar: () => void
  onCancelar: () => void
  textoConfirmar?: string
  textoCancelar?: string
  confirmando?: boolean
  confirmarDesabilitado?: boolean
  children?: ReactNode
}

export default function ModalConfirmacao({
  titulo,
  mensagem,
  onConfirmar,
  onCancelar,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  confirmando = false,
  confirmarDesabilitado = false,
  children,
}: ModalConfirmacaoProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button onClick={onCancelar} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-2">{titulo}</h2>
        {mensagem && (
          <p className="text-sm text-gray-500 mb-6">{mensagem}</p>
        )}

        {children}

        <div className="flex items-center justify-end gap-3 mt-2">
          <button
            onClick={onCancelar}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
            style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
          >
            {textoCancelar}
          </button>
          <button
            onClick={onConfirmar}
            disabled={confirmarDesabilitado || confirmando}
            className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#1a3a5c' }}
          >
            {confirmando ? 'Validando...' : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}