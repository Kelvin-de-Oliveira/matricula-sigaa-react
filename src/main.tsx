import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routes/AppRouter'
import { MatriculaProvider } from './context/MatriculaContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MatriculaProvider>
      <AppRouter />
    </MatriculaProvider>
  </StrictMode>
)