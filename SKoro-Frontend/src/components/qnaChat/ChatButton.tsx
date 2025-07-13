import { X } from 'lucide-react'
import { ButterflyWhiteImg } from '../../assets/common'
import type { Message } from '../../types/Chat.types'
import { useUserInfoStore } from '../../store/useUserInfoStore'

const ChatButton: React.FC<{
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setMessages: (messages: Message[]) => void
  handleCloseChat: () => void
  periods: any
}> = ({ isOpen, setIsOpen, setMessages, handleCloseChat, periods }) => {
  const userName = useUserInfoStore((state) => state.empName)

  const handleOpenChat = () => {
    setIsOpen(true)
    if (periods?.periodPhase === 'EVALUATION_FEEDBACK') {
      const initialMessage: Message = {
        id: Date.now(),
        text: `안녕하세요, ${userName} 님.\n저는 AI 챗봇 SKoro bot 입니다.`,
        isBot: true,
        timestamp: new Date(),
      }
      const initialMessage2: Message = {
        id: Date.now(),
        text: '지금은 평가 피드백 기간입니다.\n챗봇 유형을 선택하세요.',
        isBot: true,
        timestamp: new Date(),
      }
      setMessages([initialMessage, initialMessage2])
    } else {
      const initialMessage: Message = {
        id: Date.now(),
        text: `안녕하세요, ${userName} 님.\n저는 AI 챗봇 SKoro bot 입니다.\nSKoro 서비스 및 성과 평과 관련해서 최선을 다해 답변드릴게요.\n하고 싶으신 말이 있으신가요?`,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    }
  }

  return (
    <div className="fixed bottom-8 right-14 z-50">
      <div className="relative">
        {/* 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3D4FF] to-[#A06DFF] rounded-full blur-lg opacity-40 scale-110"></div>

        {/* 메인 버튼 */}
        <button
          onClick={isOpen ? handleCloseChat : handleOpenChat}
          className="relative w-16 h-16 bg-gradient-to-br from-[#E3D4FF] to-[#A06DFF] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-none active:scale-95"
        >
          {isOpen ? (
            <X className="w-8 h-8 text-white mx-auto" />
          ) : (
            <img
              src={ButterflyWhiteImg}
              alt="Chat Icon"
              className="w-10 h-10 mx-auto pl-1"
            />
          )}
        </button>
      </div>
    </div>
  )
}

export default ChatButton
