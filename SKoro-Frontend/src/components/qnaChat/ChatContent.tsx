import { useRef, useEffect } from 'react'
import { ButterflyWhiteImg } from '../../assets/common'
import type { Message } from '../../types/Chat.types'
import { ChatLoading } from '.'
import ChatService from '../../services/ChatService'
import { useUserInfoStore } from '../../store/useUserInfoStore'

const ChatContent: React.FC<{
  chatType: 'team' | 'bot' | null
  setChatType: (type: 'team' | 'bot' | null) => void
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  periods?: any
}> = ({
  chatType,
  setChatType,
  messages,
  setMessages,
  isLoading,
  setIsLoading,
  periods,
}) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  if (periods?.periodPhase !== 'EVALUATION_FEEDBACK') setChatType('bot')
  const userEmpNo = useUserInfoStore((state) => state.empNo)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleChatTypeSelect = (type: 'team' | 'bot') => {
    setChatType(type)

    if (type === 'team') {
      const userMessage: Message = {
        id: Date.now(),
        text: '팀장님께 이야기',
        isBot: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])

      // 로딩 상태 시작
      setIsLoading(true)

      ChatService.chatWithSkoroBot(
        userEmpNo,
        'appeal_to_manager',
        '팀장님께 이야기'
      )
        .then((response) => {
          const teamMessage: Message = {
            id: Date.now(),
            text: response.response, // API 응답에서 메시지 텍스트 가져오기
            isBot: true,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, teamMessage])
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error chatting with SKoro bot:', error)
          setIsLoading(false)
          const errorMessage: Message = {
            id: Date.now(),
            text: '오류가 발생했습니다. 다시 시도해주세요.',
            isBot: true,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, errorMessage])
        })
    } else {
      const userMessage: Message = {
        id: Date.now(),
        text: 'SKoro bot과 대화',
        isBot: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])

      // 로딩 상태 시작
      setIsLoading(true)

      ChatService.chatWithSkoroBot(userEmpNo, 'default', 'SKoro bot과 대화')
        .then((response) => {
          const botMessage: Message = {
            id: Date.now(),
            text: response.response, // API 응답에서 메시지 텍스트 가져오기
            isBot: true,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error chatting with SKoro bot:', error)
          setIsLoading(false)
          const errorMessage: Message = {
            id: Date.now(),
            text: '오류가 발생했습니다. 다시 시도해주세요.',
            isBot: true,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, errorMessage])
        })
    }
  }

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 px-3 space-y-2 bg-gray-50"
    >
      {/* 현재 날짜 */}
      <div className="text-xs font-semibold mb-3 place-self-center">
        {new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          weekday: 'long',
        })}
      </div>

      {/* 메시지 목록 */}
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1]
        const hideBotIcon = message.isBot && prevMessage?.isBot

        return (
          <div
            key={message.id}
            className={`flex ${
              message.isBot ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md ${
                message.isBot
                  ? ''
                  : 'bg-[#606060] text-white px-3 py-2 rounded-xl rounded-tr-md'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.isBot && (
                  <div
                    className={`w-8 h-8 bg-gradient-to-br from-[#E3D4FF] to-[#A06DFF] rounded-full flex items-center justify-center flex-shrink-0 mt-[0.1rem] ${
                      hideBotIcon ? 'invisible' : ''
                    }`}
                  >
                    <img
                      src={ButterflyWhiteImg}
                      alt="Bot Icon"
                      className="w-5 h-5 pl-[0.1rem]"
                    />
                  </div>
                )}
                <p
                  className={`text-sm whitespace-pre-line ${
                    message.isBot
                      ? 'bg-white shadow-sm px-3 py-2 rounded-xl rounded-tl-md'
                      : ''
                  }`}
                >
                  {message.text}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      {/* 로딩 애니메이션 */}
      {isLoading && <ChatLoading />}

      {/* 챗봇 유형 선택 버튼들 */}
      {!chatType &&
        messages.length > 0 &&
        !isLoading &&
        periods?.periodPhase === 'EVALUATION_FEEDBACK' && (
          <div className="flex space-x-1 gap-1 pl-10">
            <ChatTypeSelectBtn
              type="bot"
              onClick={() => handleChatTypeSelect('bot')}
            />
            <ChatTypeSelectBtn
              type="team"
              onClick={() => handleChatTypeSelect('team')}
            />
          </div>
        )}
    </div>
  )
}

export default ChatContent

const ChatTypeSelectBtn: React.FC<{
  type: 'team' | 'bot'
  onClick: () => void
}> = ({ type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-[2px] bg-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-full active:scale-95 transition-all duration-200 shadow-sm flex-1 group"
    >
      <div className="px-2 py-3 bg-white text-sm font-semibold rounded-full group-hover:text-purple-600 transition-colors duration-200">
        {type === 'bot' ? 'SKoro bot과 대화' : '팀장님께 이야기'}
      </div>
    </button>
  )
}
