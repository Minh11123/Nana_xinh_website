export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

function getStoredToken() {
  try {
    return JSON.parse(localStorage.getItem('nana-xinh-auth'))?.token || null
  } catch {
    return null
  }
}

export async function request(path, options = {}) {
  const token = getStoredToken()

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorText = await response.text()
    let message = errorText

    try {
      message = JSON.parse(errorText).message || errorText
    } catch {
      message = errorText
    }

    throw new Error(message || `Request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}
