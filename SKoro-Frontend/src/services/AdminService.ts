import { axiosInstance } from '../utils/axios'

class AdminService {
  // [관리자] 평가 기간 수정
  public static async updatePeriod(
    periodId: number,
    periodData: {
      periodName: string
      unit: 'QUARTER' | 'MONTH' | 'YEAR'
      isFinal: boolean
      startDate: string
      endDate: string
    }
  ): Promise<any> {
    const response = await axiosInstance.put(
      `/admin/period/${periodId}`,
      periodData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )

    console.log('AdminService.updatePeriod response:', response.data)
    return response.data
  }

  // [관리자] 평가 기간 생성
  public static async createPeriod(periodData: {
    unit: 'QUARTER' | string
    isFinal: boolean
    startDate: string
    endDate: string
  }): Promise<any> {
    const response = await axiosInstance.post('/admin/period', periodData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })

    console.log('AdminService.createPeriod response:', response.data)
    return response.data
  }

  // [관리자] 동료 평가 동료 매칭 및 동료 펵아 시작 메일 발송
  public static async notifyPeerEvaluation(periodId: number): Promise<any> {
    const response = await axiosInstance.post(
      `/admin/notify/peer-evaluation?periodId=${periodId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('AdminService.notifyPeerEvaluation response:', response.data)
    return response.data
  }

  // [관리자] 현재 진행 중인 혹은 다가올 평가 기간이 있으면 조회
  public static async getAvailablePeriod(): Promise<any> {
    const response = await axiosInstance.get('/admin/period/available', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('AdminService.getAvailablePeriod response:', response.data)
    return response.data
  }

  // [관리자] 올해 개인 TASK 생성 여부 확인
  public static async isTaskGenerated(): Promise<boolean> {
    const response = await axiosInstance.get('/admin/tasks/generated', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('AdminService.isTaskGenerated response:', response.data)
    return response.data
  }

  // [관리자] 다음 평가 단계로 전환
  public static async nextPhase(periodId: number): Promise<any> {
    const response = await axiosInstance.put(
      `/admin/period/${periodId}/next-phase`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('AdminService.nextPhase response:', response.data)
    return response.data
  }

  // [관리자] 해당 기간의 동료 평가가 완료되었는지 확인
  public static async isPeerEvaluationCompleted(
    periodId: number
  ): Promise<boolean> {
    const response = await axiosInstance.get(
      `/admin/period/${periodId}/peer-evaluation/completed`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'AdminService.isPeerEvaluationCompleted response:',
      response.data
    )
    return response.data
  }

  // [관리자] 해당 기간의 하향 평가가 완료되었는지 확인
  public static async isTeamEvaluationSubmitted(
    periodId: number
  ): Promise<boolean> {
    const response = await axiosInstance.get(
      `/admin/period/${periodId}/team-evaluation/submitted`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'AdminService.isTeamEvaluationSubmitted response:',
      response.data
    )
    return response.data
  }

  // 분기 평가 시작
  public static async startQuarterlyEvaluation(
    periodId: number,
    teams: number[]
  ): Promise<any> {
    const response = await axiosInstance.post(
      '/ai/evaluation/quarterly',
      {
        period_id: periodId,
        teams: teams,
      },
      {
        timeout: 600000, // 10분 = 600,000ms
      }
    )
    console.log(
      'EvaluationService.startQuarterlyEvaluation response:',
      response.data
    )
    return response.data
  }

  // 중간 평가 시작
  public static async startMidEvaluation(
    periodId: number,
    teams: number[]
  ): Promise<any> {
    const response = await axiosInstance.post(
      '/ai/evaluation/middle',
      {
        period_id: periodId,
        teams: teams,
      },
      {
        timeout: 600000, // 10분 = 600,000ms
      }
    )
    console.log('EvaluationService.startMidEvaluation response:', response.data)
    return response.data
  }

  // 최종 평가 시작
  public static async startFinalEvaluation(
    periodId: number,
    teams: number[]
  ): Promise<any> {
    const response = await axiosInstance.post(
      '/ai/evaluation/final',
      {
        period_id: periodId,
        teams: teams,
      },
      {
        timeout: 600000, // 10분 = 600,000ms
      }
    )
    console.log(
      'EvaluationService.startFinalEvaluation response:',
      response.data
    )
    return response.data
  }

  // Generate All Teams Kpis
  public static async generateAllTeamsKpis(): Promise<any> {
    const response = await axiosInstance.post('/ai/kpi/generate', {})
    console.log('AdminService.generateAllTeamsKpis response:', response.data)
    return response.data
  }

  // [관리자] 프롬프트 조회
  public static async getPrompts(): Promise<any> {
    const response = await axiosInstance.get('/prompts', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('AdminService.getPrompts response:', response.data)
    return response.data
  }

  // [관리자] 프롬프트 저장
  public static async savePrompt(prompt: string): Promise<any> {
    const response = await axiosInstance.put(
      '/prompts',
      { prompt: prompt },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('AdminService.savePrompt response:', response.data)
    return response.data
  }

  // 평가 피드백 요약
  // /api/ai/chatbot-summary, post
  public static async summarizeFeedback(): Promise<any> {
    const response = await axiosInstance.post(
      '/ai/chatbot-summary',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('AdminService.summarizeFeedback response:', response.data)
    return response.data
  }
}
export default AdminService
