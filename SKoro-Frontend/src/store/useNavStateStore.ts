import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NavState {
  isCollapsed: boolean
  isMobileMenuOpen: boolean
  toggleCollapsed: () => void
  setCollapsed: (collapsed: boolean) => void
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
}

export const useNavStateStore = create<NavState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileMenuOpen: false,
      toggleCollapsed: () =>
        set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'skoro-nav-state-storage',
    }
  )
)
