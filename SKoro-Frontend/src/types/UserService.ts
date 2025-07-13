export interface SignInResponse extends Response {
  accessToken: string
  refreshToken: string
  user: {
    cl: number
    email: string
    empName: string
    empNo: string
    headquarterName: string
    partName: string
    position: string
    profileImage: string | null
    role: string
    teamName: string
  }
}
