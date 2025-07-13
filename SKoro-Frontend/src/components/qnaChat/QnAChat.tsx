import { useEffect, useState } from 'react'
import ChatButton from './ChatButton'
import { ChatHeader, ChatContent, ChatInput } from '.'
import type { Message } from '../../types/Chat.types'
import EvaluationService from '../../services/EvaluationService'
import ReportService from '../../services/ReportService'

const QnAChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [chatType, setChatType] = useState<'team' | 'bot' | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [summaryMode, setSummaryMode] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [periods, setPeriods] = useState<any>(null)

  useEffect(() => {
    // 해당 기간에 활성화된 팀 평가 완료 여부 조회 (버튼 활성화)
    ReportService.getTeamEvaluationStatus()
      .then((status) => {
        console.log('팀 평가 완료 여부:', status)
        const evaluationFeedbackStatus = status.find(
          (item: any) => item.periodPhase === 'EVALUATION_FEEDBACK'
        )
        setPeriods(evaluationFeedbackStatus)
      })
      .catch((error) => {
        console.error('팀 평가 완료 여부 조회 실패:', error)
      })
  }, [])

  const handleCloseChat = () => {
    setIsOpen(false)
    setChatType(null)
    setMessages([])
    setSummaryMode(false)
    setIsSending(false)
    setIsLoading(false)
  }

  return (
    <>
      <ChatButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setMessages={setMessages}
        handleCloseChat={handleCloseChat}
        periods={periods}
      />
      {isOpen && (
        <div className="fixed bottom-[7rem] right-10 z-50">
          <div className="w-96 h-[600px] bg-gray-50 rounded-2xl shadow-md flex flex-col overflow-hidden border border-gray-300 ">
            <ChatHeader handleCloseChat={handleCloseChat} />

            <ChatContent
              messages={messages}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              chatType={chatType}
              setChatType={setChatType}
              setMessages={setMessages}
              periods={periods}
            />

            {chatType && (
              <ChatInput
                periods={periods}
                chatType={chatType}
                setMessages={setMessages}
                isSending={isSending}
                setIsSending={setIsSending}
                summaryMode={summaryMode}
                setSummaryMode={setSummaryMode}
                inputValue={inputValue}
                setInputValue={setInputValue}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default QnAChat
