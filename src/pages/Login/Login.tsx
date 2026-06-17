import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'


const schema = z.object({
  usuario: z.string().min(1, 'Informe seu usuário'),
  senha: z.string().min(1, 'Informe sua senha'),
  captcha: z.string().min(1, 'Informe o código da imagem'),
})

type FormData = z.infer<typeof schema>

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [captchaCode, setCaptchaCode] = useState('')

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const code = Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
    setCaptchaCode(code)
    return code
  }

  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#dbeafe'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(30,58,138,0.2)`
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.stroke()
    }
    ctx.font = 'bold 22px monospace'
    ctx.fillStyle = '#1e3a8a'
    code.split('').forEach((char, i) => {
      ctx.save()
      ctx.translate(18 + i * 22, 28)
      ctx.rotate((Math.random() - 0.5) * 0.4)
      ctx.fillText(char, 0, 0)
      ctx.restore()
    })
  }

  useEffect(() => {
    const code = generateCaptcha()
    drawCaptcha(code)
  }, [])

  const refreshCaptcha = () => {
    const code = generateCaptcha()
    drawCaptcha(code)
  }
  const onSubmit = async (data: FormData) => {
  await new Promise(r => setTimeout(r, 800))
  if (data.captcha.toUpperCase() !== captchaCode) {
    setError('captcha', { message: 'Código incorreto. Tente novamente.' })
    refreshCaptcha()
    return
  }
  if (data.usuario === 'ana.souza' && data.senha === '$3nh4Teste') {
    navigate('/portal')
  } else {
    setError('root', { message: 'Usuário ou senha incorretos.' })
  }
}

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e8f0f7' }}>

      {/* Header */}
      <header style={{ backgroundColor: '#1a3a5c' }} className="flex items-center gap-3 px-6 py-3">
        <div className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: '#2a5298' }}>
          SIGAA
        </div>
        <div>
          <div className="text-white font-semibold text-sm">SIGAA</div>
          <div className="text-blue-200 text-xs">Universidade Federal de Goiás</div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">

        {/* Ícone e título */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: '#1a3a5c' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Acesse sua conta</h1>
          <p className="text-sm text-gray-500 mt-1">Entre com seu usuário institucional</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-md shadow-sm">

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* Usuário */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Usuário</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 gap-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="ex: ana.souza"
                  className="flex-1 py-2.5 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
                  {...register('usuario')}
                />
              </div>
              {errors.usuario && <span className="text-xs text-red-500">{errors.usuario.message}</span>}
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 gap-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  data-form-type="other"
                  className="flex-1 py-2.5 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
                  {...register('senha')}
                />
              </div>
              {errors.senha && <span className="text-xs text-red-500">{errors.senha.message}</span>}
            </div>

            {/* Captcha */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Digite os caracteres da imagem</label>
              <div className="flex items-center gap-2 flex-wrap">
                  <canvas
                    ref={canvasRef}
                    width={130}
                    height={44}
                    className="rounded-lg border border-blue-200"
                  />
                  <button type="button" onClick={refreshCaptcha}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-500">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-blue-500">
                    <input
                      type="text"
                      placeholder="Código"
                      maxLength={5}
                      className="flex-1 py-2.5 text-sm outline-none bg-transparent uppercase"
                      {...register('captcha')}
                    />
                  </div>
                </div>
              {errors.captcha && <span className="text-xs text-red-500">{errors.captcha.message}</span>}
            </div>

            {errors.root && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {errors.root.message}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm mt-1 transition-opacity disabled:opacity-70"
              style={{ backgroundColor: '#1a3a5c' }}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between mt-5">
            <button className="text-sm font-medium" style={{ color: '#1a6fb5' }}>
              Esqueci minha senha
            </button>
            <button className="text-sm font-medium" style={{ color: '#1a6fb5' }}>
              Primeiro acesso
            </button>
          </div>
        </div>

        {/* Dica para o protótipo */}
        <p className="text-xs text-gray-400 mt-4">
            Use usuário <strong>ana.souza</strong> e senha <strong>123456</strong>
        </p>
      </div>
    </div>
  )
}