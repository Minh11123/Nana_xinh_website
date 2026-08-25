import { LockKeyhole, LogIn, Mail } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'

const defaultCredentials = {
  email: 'admin@nanaxinh.vn',
  password: 'admin123',
}

export function LoginPage() {
  const { isAuthenticated, isLoading, login, role } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [credentials, setCredentials] = useState(defaultCredentials)
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/admin'

  if (isAuthenticated && role === 'ADMIN') {
    return <Navigate to="/admin" replace />
  }

  function updateField(event) {
    setCredentials((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      const session = await login(credentials)
      navigate(session.user.role === 'ADMIN' ? from : '/', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-panel">
        <div>
          <p className="eyebrow">Nana Xinh Admin</p>
          <h1>Đăng nhập quản trị</h1>
          <p className="auth-copy">
            Tài khoản có role ADMIN sẽ được chuyển thẳng vào dashboard quản trị.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <span>
              <Mail size={18} />
              <input
                autoComplete="email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={updateField}
                required
              />
            </span>
          </label>
          <label>
            Mật khẩu
            <span>
              <LockKeyhole size={18} />
              <input
                autoComplete="current-password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={updateField}
                required
              />
            </span>
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-button" disabled={isLoading} type="submit">
            <LogIn size={18} />
            {isLoading ? 'Đang đăng nhập...' : 'Vào dashboard'}
          </button>
        </form>
      </section>
    </div>
  )
}
