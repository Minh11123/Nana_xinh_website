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
    name: 'Nhân viên Nana',
    role: 'STAFF',
  },
]

export const authApi = {
  async login({ email, password }) {
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
      user,
    }
  },
}
