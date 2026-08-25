import { KeyRound, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { authApi } from '../api/auth.js'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState(searchParams.get('token') || '')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    setIsLoading(true)

    try {
      const response = await authApi.resetPassword(token, newPassword)
      setNotice(response.message)
      setNewPassword('')
    } catch (resetError) {
      setError(resetError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-panel">
        <div>
          <p className="eyebrow">Nana Xinh Admin</p>
          <h1>Đặt lại mật khẩu</h1>
          <p className="auth-copy">Nhập reset token và mật khẩu mới cho tài khoản quản trị.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Reset token
            <span>
              <KeyRound size={18} />
              <input name="token" value={token} onChange={(event) => setToken(event.target.value)} required />
            </span>
          </label>
          <label>
            Mật khẩu mới
            <span>
              <LockKeyhole size={18} />
              <input
                minLength="8"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </span>
          </label>

          {error ? <p className="form-error">{error}</p> : null}
          {notice ? <p className="form-success">{notice}</p> : null}

          <button className="primary-button" disabled={isLoading} type="submit">
            {isLoading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
          </button>
        </form>

        <Link className="text-button" to="/login">Quay lại đăng nhập</Link>
      </section>
    </div>
  )
}
