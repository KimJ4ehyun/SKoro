import { axiosInstance } from '../utils/axios'

class EvaluationService {
  // 팀의 평가 기간 목록 조회 (연도, 분기 선택할 때 사용)
  public static async getPeriods(): Promise<any> {
    const response = await axiosInstance.get('/periods', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log('EvaluationService.getPeriods response:', response.data)
    return response.data
  }

  // 해당 기간에 활성화된 팀 평가 완료 여부 조회 (버튼 활성화)
  public static async getTeamEvaluationStatus(): Promise<any> {
    const response = await axiosInstance.get(`/team-evaluation/status`, {
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

  // 팀원 리스트 조회 (이름, 사진, 하향 평가 완료 여부)
  public static async getEmployeesStatusList(
    teamEvaluationId: number
  ): Promise<any> {
    const response = await axiosInstance.get(
      `/employees/${teamEvaluationId}/status`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'EvaluationService.getEmployeesStatusList response:',
      response.data
    )
    return response.data
  }

  // [팀원] 동료 평가 리스트 조회
  public static async getPeerEvaluationList(
    empNo: string,
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.get('/peer-evaluation', {
      params: { empNo, periodId },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log(
      'EvaluationService.getPeerEvaluationList response:',
      response.data
    )
    return response.data
  }

  // [팀장] 팀원 임시 평가 조회
  public static async getTempEvaluation(
    teamEvaluationId: number
  ): Promise<any> {
    const response = await axiosInstance.get(
      `/temp-evaluations/${teamEvaluationId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('EvaluationService.getTempEvaluation response:', response.data)
    return response.data
  }

  // [팀장] 해당 팀원 임시 평가 수정
  public static async updateTempEvaluation(
    teamEvaluationId: number,
    empNo: string,
    score: number,
    comment: string,
    reason: string,
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.put(
      `/temp-evaluations/${teamEvaluationId}/${empNo}`,
      {
        score: score,
        comment: comment,
        reason: reason,
        periodId: periodId,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'EvaluationService.updateTempEvaluation response:',
      response.data
    )
    return response.data
  }

  // [팀원] 해당 기간 나의 동료 평가가 완료되었는지 확인
  public static async isPeerEvaluationCompleted(
    periodId: number
  ): Promise<boolean> {
    const response = await axiosInstance.get(
      `/peer-evaluation/period/${periodId}/peer-evaluation/completed`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'EvaluationService.isPeerEvaluationCompleted response:',
      response.data
    )
    return response.data
  }

  // [팀장] 해당 기간의 팀 중간 평가 레포트 조회 (임시)
  public static async getMiddleReport(periodId: number): Promise<any> {
    const response = await axiosInstance.get(
      `/team-evaluation/report/middle/${periodId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('EvaluationService.getMiddleReport response:', response.data)
    return response.data
  }

  // [팀장] 하향 평가 제출
  public static async submitTeamEvaluation(
    teamEvaluationId: number
  ): Promise<any> {
    const response = await axiosInstance.put(
      `/team-evaluation/${teamEvaluationId}/submit`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log(
      'EvaluationService.submitTeamEvaluation response:',
      response.data
    )
    return response.data
  }
}
export default EvaluationService
