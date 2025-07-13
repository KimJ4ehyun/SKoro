import { axiosInstance } from '../utils/axios'

class MemberService {
  // 홈 화면 - 본인 Task 리스트 조회
  public static async getMyTasks(): Promise<any> {
    const response = await axiosInstance.get('/member/home/tasks', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('MemberService.getMyTasks response:', response.data)
    return response.data
  }

  // 홈 화면 - 연도별 최종 점수 조회
  public static async getFinalScores(): Promise<any> {
    const response = await axiosInstance.get('/member/home/final-scores', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('MemberService.getFinalScores response:', response.data)
    return response.data
  }

  // 홈 화면 - 분기별 달성률 조회
  public static async getQuarterlyContributions(): Promise<any> {
    const response = await axiosInstance.get('/member/home/contributions', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log(
      'MemberService.getQuarterlyContributions response:',
      response.data
    )
    return response.data
  }
}
export default MemberService
