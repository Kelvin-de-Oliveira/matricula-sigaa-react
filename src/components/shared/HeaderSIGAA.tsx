import { useNavigate } from 'react-router-dom'

export default function HeaderSIGAA() {
  const navigate = useNavigate()

  return (
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
  )
}