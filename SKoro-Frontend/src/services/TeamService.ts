import { axiosInstance } from '../utils/axios'

class TeamService {
  // [팀장] 팀 TASK 리스트 조회
  public static async getTeamKpis(): Promise<any> {
    const response = await axiosInstance.get('/team-kpis', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })

    console.log('TeamService.getTeamKpis response:', response.data)
    return response.data
  }

  // [팀원] 홈 화면 - 본인 Task 리스트 조회
  public static async getMyTasks(): Promise<any> {
    const response = await axiosInstance.get('/member/home/tasks', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('TeamService.getMyTasks response:', response.data)
    return response.data
  }

  // [팀원] 팀 목표 리스트 상세 조회
  public static async getMyTeamKpiDetail(year: number): Promise<any> {
    const response = await axiosInstance.get(
      `/team-kpis/my-detail?year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('TeamService.getMyTeamKpiDetail response:', response.data)
    return response.data
  }

  // [팀장] 팀 목표 리스트 상세 조회
  public static async getTeamKpiDetail(year: number): Promise<any> {
    const response = await axiosInstance.get(`/team-kpis/detail?year=${year}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })

    console.log('TeamService.getTeamKpiDetails response:', response.data)
    return response.data
  }

  // [팀장] 홈 화면 - 팀 분기 평가 상세 조회
  public static async getTeamEvaluation(): Promise<any> {
    const response = await axiosInstance.get('/team-evaluation', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('TeamService.getTeamEvaluation response:', response.data)
    return response.data
  }

  // [팀원] 홈 화면 - 분기별 달성률 조회
  public static async getMemberContributions(): Promise<any> {
    const response = await axiosInstance.get('/member/home/contributions', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('TeamService.getMemberContributions response:', response.data)
    return response.data
  }

  // [팀장] 홈 화면 - 최종 평가인 팀의 평균 달성률, 전체 팀의 평균 달성률 조회
  public static async getAverageAchievementRate(): Promise<any> {
    const response = await axiosInstance.get(
      '/team-evaluation/average-achievement-rate',
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'TeamService.getAverageAchievementRate response:',
      response.data
    )
    return response.data
  }

  // [팀원] 홈 화면 - 연도별 최종 점수 조회
  public static async getFinalScores(): Promise<any> {
    const response = await axiosInstance.get('/member/home/final-scores', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('TeamService.getFinalScores response:', response.data)
    return response.data
  }

  // 팀의 평가 기간 목록 조회 (연도, 분기 선택할 때 사용)
  public static async getPeriods(): Promise<any> {
    const response = await axiosInstance.get('/periods', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('TeamService.getPeriods response:', response.data)
    return response.data
  }

  // 팀원의 평가 기간 목록 조회 (연도, 분기 선택할 때 사용)
  public static async getMemberPeriods(empNo: string): Promise<any> {
    const response = await axiosInstance.get(`/periods/${empNo}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('TeamService.getMemberPeriods response:', response.data)
    return response.data
  }
}
export default TeamService
