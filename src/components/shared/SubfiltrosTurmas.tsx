import { Filter, Search } from 'lucide-react'

interface SubfiltrosTurmasProps {
  filtroBusca: string
  setFiltroBusca: (v: string) => void
  filtroDocente: string
  setFiltroDocente: (v: string) => void
  filtroUnidade: string
  setFiltroUnidade: (v: string) => void
  filtroHorario: string
  setFiltroHorario: (v: string) => void
  unidades: string[]
  onLimpar: () => void
}

export default function SubfiltrosTurmas({
  filtroBusca,
  setFiltroBusca,
  filtroDocente,
  setFiltroDocente,
  filtroUnidade,
  setFiltroUnidade,
  filtroHorario,
  setFiltroHorario,
  unidades,
  onLimpar,
}: SubfiltrosTurmasProps) {
  const temFiltroAtivo = filtroHorario || filtroUnidade || filtroBusca || filtroDocente

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4" style={{ color: '#1a3a5c' }} />
        <h2 className="text-sm font-semibold text-gray-900">Refinar busca</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Nome ou código</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Ex: Cálculo"
              value={filtroBusca}
              onChange={(e) => setFiltroBusca(e.target.value)}
              className="flex-1 py-2 px-2 text-sm outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Docente</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Ex: Marina Castro"
              value={filtroDocente}
              onChange={(e) => setFiltroDocente(e.target.value)}
              className="flex-1 py-2 px-2 text-sm outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Unidade ofertadora</label>
          <select
            value={filtroUnidade}
            onChange={(e) => setFiltroUnidade(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="">Todas as unidades</option>
            {unidades.map(unidade => (
              <option key={unidade} value={unidade}>{unidade}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">Horário</label>
          <select
            value={filtroHorario}
            onChange={(e) => setFiltroHorario(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="">Todos os horários</option>
            <optgroup label="Matutino">
              <option value="M">Qualquer dia — Manhã</option>
              <option value="2M">Segunda — Manhã</option>
              <option value="3M">Terça — Manhã</option>
              <option value="4M">Quarta — Manhã</option>
              <option value="5M">Quinta — Manhã</option>
              <option value="6M">Sexta — Manhã</option>
              <option value="7M">Sábado — Manhã</option>
            </optgroup>
            <optgroup label="Vespertino">
              <option value="T">Qualquer dia — Tarde</option>
              <option value="2T">Segunda — Tarde</option>
              <option value="3T">Terça — Tarde</option>
              <option value="4T">Quarta — Tarde</option>
              <option value="5T">Quinta — Tarde</option>
              <option value="6T">Sexta — Tarde</option>
              <option value="7T">Sábado — Tarde</option>
            </optgroup>
            <optgroup label="Noturno">
              <option value="N">Qualquer dia — Noite</option>
              <option value="2N">Segunda — Noite</option>
              <option value="3N">Terça — Noite</option>
              <option value="4N">Quarta — Noite</option>
              <option value="5N">Quinta — Noite</option>
              <option value="6N">Sexta — Noite</option>
            </optgroup>
          </select>
        </div>
      </div>

      {temFiltroAtivo && (
        <button
          onClick={onLimpar}
          className="text-xs font-medium mt-3 px-3 py-1.5 rounded-lg border transition-colors"
          style={{ borderColor: '#d1d5db', color: '#6b7280' }}
        >
          Limpar filtros
        </button>
      )}
    </div>
  )
}