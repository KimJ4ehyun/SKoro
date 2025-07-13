import type { SignInResponse } from '../types/UserService'
import { axiosInstance } from '../utils/axios'
import { useUserInfoStore } from '../store/useUserInfoStore'

class UserService {
  // 유저 로그인
  public static async login(
    empNo: string,
    password: string
  ): Promise<SignInResponse> {
    const response = await axiosInstance.post<SignInResponse>('/auth/login', {
      empNo,
      password,
    })
    sessionStorage.setItem('SKoroAccessToken', response.data.accessToken)
    sessionStorage.setItem('SKoroRefreshToken', response.data.refreshToken)
    sessionStorage.setItem('SKoroUserInfo', JSON.stringify(response.data.user))

    console.log('UserService.signIn response:', response.data)
    useUserInfoStore.getState().setUserInfo(response.data.user)
    return response.data
  }

  // 유저 로그아웃
  public static async logout(): Promise<void> {
    const response = await axiosInstance.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    sessionStorage.removeItem('SKoroAccessToken')
    sessionStorage.removeItem('SKoroRefreshToken')
    sessionStorage.removeItem('SKoroUserInfo')

    console.log('UserService.logout response:', response.data)
  }
}

export default UserService
