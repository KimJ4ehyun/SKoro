import { axiosInstance } from '../utils/axios'

class ChatService {
  // Chat With SKoro Bot
  public static async chatWithSkoroBot(
    userId: string,
    chatMode: 'default' | 'appeal_to_manager',
    message: string,
    appealComplete: boolean = false
  ): Promise<any> {
    const response = await axiosInstance.post(
      '/ai/chat/skoro',
      {
        user_id: userId,
        chat_mode: chatMode,
        message: message,
        appeal_complete: appealComplete,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('ChatService.chatWithSkoroBot response:', response.data)
    return response.data
  }

  // 해당 기간의 팀장에 대한 피드백 저장
  public static async saveFeedback(
    content: string,
    periodId: number
  ): Promise<any> {
    const response = await axiosInstance.post(
      '/evaluation-feedback',
      {
        content: content,
        periodId: periodId,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('ChatService.saveFeedback response:', response.data)
    return response.data
  }
}
export default ChatService
