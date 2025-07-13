import { create } from 'zustand'
import { useUserInfoStore } from './useUserInfoStore'

interface AuthState {
  isAuthenticated: boolean | null
  lastCheck: number
  checkAuth: () => boolean
  clearAuth: () => void
  setAuth: (token: string, userInfo: any) => void
}

const CACHE_DURATION = 1000

export const useAuthStore = create<AuthState>()((set, get) => ({
  isAuthenticated: null,
  lastCheck: 0,

  checkAuth: () => {
    const { isAuthenticated, lastCheck } = get()
    const now = Date.now()

    if (isAuthenticated !== null && now - lastCheck < CACHE_DURATION) {
      return isAuthenticated
    }

    const token = sessionStorage.getItem('SKoroAccessToken')

    if (token) {
      const userInfo = JSON.parse(
        sessionStorage.getItem('SKoroUserInfo') || '{}'
      )

      useUserInfoStore.getState().setUserInfo(userInfo)

      console.log('User info loaded from sessionStorage:', userInfo)

      set({
        isAuthenticated: true,
        lastCheck: now,
      })

      return true
    } else {
      set({
        isAuthenticated: false,
        lastCheck: now,
      })

      return false
    }
  },

  clearAuth: () => {
    set({
      isAuthenticated: null,
      lastCheck: 0,
    })
  },

  setAuth: (token: string, userInfo: any) => {
    sessionStorage.setItem('SKoroAccessToken', token)
    sessionStorage.setItem('SKoroUserInfo', JSON.stringify(userInfo))
    useUserInfoStore.getState().setUserInfo(userInfo)

    set({
      isAuthenticated: true,
      lastCheck: Date.now(),
    })
  },
}))

export const isAuthenticated = () => useAuthStore.getState().checkAuth()
export const clearAuthCache = () => useAuthStore.getState().clearAuth()
