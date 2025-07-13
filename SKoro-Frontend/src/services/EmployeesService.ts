import { axiosInstance } from '../utils/axios'

class EmployeesService {
  // 팀원 리스트 조회 (이름, 사진)
  public static async getEmployees(): Promise<any> {
    const response = await axiosInstance.get('/employees', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })

    console.log('EmployeesService.getEmployees response:', response.data)
    return response.data
  }

  // [팀장] 팀 관리 화면 - 분기 평가 카드 조회
  public static async getNonFinalEmployees(periodId: number): Promise<any> {
    const response = await axiosInstance.get(
      `/employees/${periodId}/non-final`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )

    console.log(
      'EmployeesService.getNonFinalEmployees response:',
      response.data
    )
    return response.data
  }

  // [팀장] 팀 관리 화면 - 최종 평가 카드 조회
  public static async getFinalEmployees(periodId: number): Promise<any> {
    const response = await axiosInstance.get(`/employees/${periodId}/final`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })

    console.log('EmployeesService.getFinalEmployees response:', response.data)
    return response.data
  }

  // 팀원 정보 조회 (동료 평가)
  public static async getEmployee(empNo: string): Promise<any> {
    const response = await axiosInstance.get(`/employees/${empNo}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
      },
    })

    console.log('EmployeesService.getEmployee response:', response.data)
    return response.data
  }
}
export default EmployeesService
