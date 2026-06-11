import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Portal from '../pages/Portal/Portal'
import DadosCadastrais from '../pages/Matricula/DadosCadastrais/DadosCadastrais'
import Turmas from '../pages/Matricula/Turmas/Turmas'
import Detalhes from '../pages/Matricula/Detalhes/Detalhes'
import Confirmacao from '../pages/Matricula/Confirmacao/Confirmacao'
import Status from '../pages/Matricula/Status/Status'
import Resultado from '../pages/Matricula/Resultado/Resultado'
import Comprovante from '../pages/Matricula/Comprovante/Comprovante'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/matricula/dados-cadastrais" element={<DadosCadastrais />} />
        <Route path="/matricula/turmas" element={<Turmas />} />
        <Route path="/matricula/detalhes/:turmaId" element={<Detalhes />} />
        <Route path="/matricula/confirmacao" element={<Confirmacao />} />
        <Route path="/matricula/status" element={<Status />} />
        <Route path="/matricula/resultado" element={<Resultado />} />
        <Route path="/matricula/comprovante" element={<Comprovante />} />
      </Routes>
    </BrowserRouter>
  )
}