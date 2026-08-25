import { API_BASE_URL, request } from './client.js'

const mockAccounts = [
  {
    email: 'admin@nanaxinh.vn',
    password: 'admin123',
    name: 'Nana Admin',
    role: 'ADMIN',
  },
  {
    email: 'staff@nanaxinh.vn',
    password: 'staff123',
    name: 'Nhan vien Nana',
    role: 'STAFF',
  },
]

async function mockLogin({ email, password }) {
  await new Promise((resolve) => setTimeout(resolve, 320))

  const account = mockAccounts.find(
    (item) => item.email === email.trim().toLowerCase() && item.password === password,
  )

  if (!account) {
    throw new Error('Email hoặc mật khẩu không đúng')
  }

  const { password: _password, ...user } = account

  return {
    token: `mock-token-${user.role.toLowerCase()}`,
    tokenType: 'Bearer',
    user,
  }
}

async function readErrorMessage(response) {
  const errorText = await response.text()

  try {
    return JSON.parse(errorText).message || errorText
  } catch {
    return errorText
  }
}

export const authApi = {
  async login(credentials) {
    let response

    try {
      response = await fetch(`${API_BASE_URL}/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(credentials),
      })
    } catch {
      return mockLogin(credentials)
    }

    if (response.status >= 500) {
      return mockLogin(credentials)
    }

    if (!response.ok) {
      throw new Error((await readErrorMessage(response)) || 'Email hoặc mật khẩu không đúng')
    }

    if (!response.headers.get('content-type')?.includes('application/json')) {
      return mockLogin(credentials)
    }

    return response.json()
  },

  async logout(token) {
    if (!token || token.startsWith('mock-token')) {
      return { message: 'Đã đăng xuất' }
    }

    return request('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  async forgotPassword(email) {
    return request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  async resetPassword(token, newPassword) {
    return request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    })
  },
}
