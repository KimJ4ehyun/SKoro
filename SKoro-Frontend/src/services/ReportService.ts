import { axiosInstance } from '../utils/axios'

class ReportService {
  // [팀장] 해당 기간의 팀원의 분기 평가 레포트 조회
  public static async getEmployeesFeedbackReport(
    empNo: string,
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.get(
      `/employees/${empNo}/feedback-report/${periodId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('ReportService.getFeedbackReport response:', response.data)
    return response.data
  }

  // [팀장] 팀원 최종 평가 레포트 조회
  public static async getEmployeesFinalEvaluationReport(
    empNo: string,
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.get(
      `/employees/${empNo}/final-evaluation-report/${periodId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'ReportService.getEmployeesFinalEvaluationReport response:',
      response.data
    )
    return response.data
  }

  // [팀장] 해당 기간의 팀 평가 레포트 조회
  public static async getTeamEvaluationReport(periodId: number): Promise<any> {
    const response = await axiosInstance.get(
      `/team-evaluation/report/${periodId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'ReportService.getTeamEvaluationReport response:',
      response.data
    )
    return response.data
  }

  // [팀장] 해당 기간의 팀장에 대한 평가 피드백 요약 조회
  public static async getEvaluationFeedbackSummary(
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.get(
      `/evaluation-feedback-summary/${periodId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'ReportService.getEvaluationFeedbackSummary response:',
      response.data
    )
    return response.data
  }

  // 해당 기간의 본인의 최종 평가 레포트 조회
  public static async getMyFinalEvaluationReport(
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.get(
      `/final-evaluation-report/${periodId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('ReportService.getMyEvaluationReport response:', response.data)
    return response.data
  }

  // 해당 기간의 본인의 분기 평가 레포트 조회
  public static async getMyQuarterlyEvaluationReport(
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.get(`/feedback-report/${periodId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log(
      'ReportService.getMyQuarterlyEvaluationReport response:',
      response.data
    )
    return response.data
  }

  // [팀장] 해당 기간의 팀 중간 평가 레포트 조회 (임시)
  public static async getTeamMiddleEvaluationReport(
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.get(
      `/team-evaluation/report/middle/${periodId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'ReportService.getTeamMiddleEvaluationReport response:',
      response.data
    )
    return response.data
  }

  // 해당 기간에 활성화된 팀 평가 완료 여부 조회 (버튼 활성화)
  public static async getTeamEvaluationStatus(): Promise<any> {
    const response = await axiosInstance.get('/team-evaluation/status', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log(
      'ReportService.getTeamEvaluationStatus response:',
      response.data
    )
    return response.data
  }
}
export default ReportService
