import { create } from 'zustand'

// 유저 정보
type UserInfo = {
  cl: number
  email: string
  empName: string
  empNo: string
  headquarterName: string
  partName: string
  position: string
  profileImage: string | null
  role: 'ADMIN' | 'MEMBER' | 'MANAGER' | string
  teamName: string
}

type UserInfoState = UserInfo & {
  setUserInfo: (userInfo: UserInfo) => void
  logout: () => void
}

export const useUserInfoStore = create<UserInfoState>((set) => ({
  cl: 0,
  email: '',
  empName: '',
  empNo: '',
  headquarterName: '',
  partName: '',
  position: '',
  profileImage: null,
  role: '',
  teamName: '',
  setUserInfo: (userInfo: UserInfo) => set(userInfo),
  logout: () =>
    set({
      cl: 0,
      email: '',
      empName: '',
      empNo: '',
      headquarterName: '',
      partName: '',
      position: '',
      profileImage: null,
      role: '',
      teamName: '',
    }),
}))
