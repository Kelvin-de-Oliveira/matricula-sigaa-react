import { useNavigate } from 'react-router-dom'
import { GraduationCap, FileText, BookOpen, FileCheck, CalendarDays, ArrowRight, TriangleAlert, X, LogOut, User, Home, Mail, MessageSquare, Library, Building2, Award, ClipboardList, Users, Briefcase, Settings, HelpCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAluno } from '../../hooks/useAluno'

export default function Portal() {
  const navigate = useNavigate()
  const aluno = useAluno()
  const [bannerVisible, setBannerVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuSections = [
    {
      title: 'Início',
      items: [
        { label: 'Página inicial', icon: Home },
        { label: 'Caixa de entrada', icon: Mail },
        { label: 'Fórum de discussões', icon: MessageSquare },
      ]
    },
    {
      title: 'Ensino',
      items: [
        { label: 'Matrícula online', icon: ClipboardList },
        { label: 'Consultar turmas', icon: BookOpen },
        { label: 'Notas e frequência', icon: GraduationCap },
        { label: 'Histórico acadêmico', icon: Library },
        { label: 'Atestado de matrícula', icon: FileCheck },
        { label: 'Plano de estudos', icon: ClipboardList },
      ]
    },
    {
      title: 'Acadêmico',
      items: [
        { label: 'Emitir documentos', icon: FileText },
        { label: 'Solicitações', icon: Briefcase },
        { label: 'Coordenação do curso', icon: Building2 },
        { label: 'Bolsas e auxílios', icon: Award },
        { label: 'Estágios e TCC', icon: Users },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { label: 'Configurações', icon: Settings },
        { label: 'Ajuda', icon: HelpCircle },
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e8f0f7' }}>

      {/* Header */}
      <header style={{ backgroundColor: '#1a3a5c' }} className="px-6 py-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: '#2a5298' }}>
                SIGAA
              </div>
              <div>
                <div className="text-white font-semibold text-sm">SIGAA</div>
                <div className="text-blue-200 text-xs">Universidade Federal de Goiás</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <div className="text-white text-sm font-medium">{aluno.nome}</div>
                  <div className="text-blue-200 text-xs">Discente</div>
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-blue-300 flex items-center justify-center"
                  style={{ backgroundColor: menuOpen ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                  <User className="w-4 h-4 text-blue-200" />
                </div>
              </button>

              {menuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50"
                  style={{ width: '640px' }}>
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <p className="text-sm font-semibold text-gray-800">{aluno.nome}</p>
                    <p className="text-xs text-gray-400">{aluno.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 px-4">
                    {menuSections.map((section, i) => (
                      <div key={i} className="py-2">
                        <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2 px-2">
                          {section.title}
                        </h3>
                        <div className="flex flex-col gap-0.5">
                          {section.items.map((item, j) => (
                            <button
                              key={j}
                              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 text-left"
                            >
                              <item.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 mt-2 pt-3 px-6">
                    <p className="text-xs text-gray-400">
                      Navegue por todas as funcionalidades do sistema
                    </p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-6">

        {/* Banner de aviso */}
        {bannerVisible && aluno.primeiroacesso && (
          <div className="rounded-lg px-4 py-2.5 mb-6 flex items-center justify-between gap-3"
            style={{ backgroundColor: '#fff9e6', border: '1px solid #ffc107' }}>
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-4 h-4 flex-shrink-0" style={{ color: '#856404' }} />
              <p className="text-sm" style={{ color: '#856404' }}>
                <strong>Atenção:</strong> Você ainda não realizou sua matrícula neste período.
              </p>
            </div>
            <button onClick={() => setBannerVisible(false)} className="flex-shrink-0">
              <X className="w-4 h-4" style={{ color: '#856404' }} />
            </button>
          </div>
        )}

        {/* Boas vindas */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, {aluno.primeiroNome}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {aluno.curso} · Matrícula {aluno.id} · Semestre vigente <strong className="text-gray-700">{aluno.semestre}</strong>
          </p>
        </div>

        {/* Card de matrícula */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8 flex items-center justify-between gap-4 border-l-4"
          style={{ borderLeftColor: '#1a3a5c' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#e8f0f7' }}>
              <CalendarDays className="w-7 h-7" style={{ color: '#1a3a5c' }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-semibold text-gray-900">Matrícula Online</h2>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>
                  Período aberto
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Período de matrículas aberto até{' '}
                <strong className="text-gray-700">20/07/2025</strong>
                {' '}— Clique para iniciar.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/matricula/dados-cadastrais')}
            className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1a3a5c' }}
          >
            Iniciar <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Acesso rápido */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Acesso rápido
          </h2>
          <span className="text-xs text-gray-400">Os 4 mais acessados por você</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Ver notas', sub: 'Boletim do semestre', icon: GraduationCap },
            { label: 'Histórico acadêmico', sub: 'Disciplinas cursadas', icon: BookOpen },
            { label: 'Emitir documentos', sub: 'Declarações e formulários', icon: FileText },
            { label: 'Atestado de matrícula', sub: 'Comprovante atualizado', icon: FileCheck },
          ].map((item, i) => (
            <button key={i}
              className="group bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-start gap-3 text-left cursor-pointer transition-all duration-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 group-hover:bg-blue-100"
                style={{ backgroundColor: '#e8f0f7' }}>
                <item.icon className="w-5 h-5" style={{ color: '#1a3a5c' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          © 2026 Universidade Federal de Goiás — SIGAA v3.14
        </p>
      </footer>
    </div>
  )
}