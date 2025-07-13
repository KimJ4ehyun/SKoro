import { axiosInstance } from '../utils/axios'

class PeerEvaluationService {
  // 동료 평가 리스트 조회
  public static async getPeerEvaluations(
    empNo: string,
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.get('/peer-evaluation', {
      params: {
        empNo,
        periodId,
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })
    console.log(
      'PeerEvaluationService.getPeerEvaluations response:',
      response.data
    )
    return response.data
  }

  // 기본 키워드 전체 조회
  public static async getPeerEvaluationKeywords(): Promise<any> {
    const response = await axiosInstance.get('/peer-evaluation/keywords', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })

    console.log(
      'PeerEvaluationService.getPeerEvaluationKeywords response:',
      response.data
    )
    return response.data
  }

  // 동료 평가 상세 조회
  public static async getPeerEvaluationDetail(
    peerEvaluationId: number
  ): Promise<any> {
    const response = await axiosInstance.get(
      `/peer-evaluation/${peerEvaluationId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )

    console.log(
      'PeerEvaluationService.getPeerEvaluationDetail response:',
      response.data
    )
    return response.data
  }

  // 동료 평가 제출
  public static async submitPeerEvaluation(
    peerEvaluationId: number,
    weight: number,
    jointTask: string | null,
    keywordIds: number[],
    customKeywords: string[]
  ): Promise<any> {
    const response = await axiosInstance.put(
      `/peer-evaluation/${peerEvaluationId}/submit`,
      {
        weight,
        jointTask,
        keywordIds,
        customKeywords,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )

    console.log(
      'PeerEvaluationService.submitPeerEvaluation response:',
      response.data
    )
    return response.data
  }

  // 팀원 정보 조회(동료평가)
  public static async getEmployeeInfo(empNo: string): Promise<any> {
    const response = await axiosInstance.get(`/employees/${empNo}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })

    console.log(
      'PeerEvaluationService.getEmployeeInfo response:',
      response.data
    )
    return response.data
  }
}
export default PeerEvaluationService
