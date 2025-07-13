import React, { useState, useEffect } from 'react'
import { Goal } from 'lucide-react'
import { Header } from '../components/common'
import AdminService from '../services/AdminService'
import useDocumentTitle from '../hooks/useDocumentTitle'

interface EvaluationPeriod {
  periodId: number
  periodName: string
  isFinal: boolean
  startDate: string
  endDate: string
  periodPhase:
    | 'NOT_STARTED'
    | 'PEER_EVALUATION'
    | 'MIDDLE_REPORT'
    | 'MANAGER_EVALUATION'
    | 'REPORT_GENERATION'
    | 'EVALUATION_FEEDBACK'
    | 'COMPLETED'
  currentStep: number
  totalSteps: number
}

const AdminLogicPage: React.FC = () => {
  useDocumentTitle('성과평가 로직 - SKoro')

  const [logic, setLogic] = useState<string>('')
  const [prevLogic, setPrevLogic] = useState<string>('')

  useEffect(() => {
    AdminService.getPrompts()
      .then((data) => {
        if (data) {
          setLogic(data.prompt || '')
          setPrevLogic(data.prompt || '')
        }
      })
      .catch((error) => {
        console.error('Error fetching prompts:', error)
      })
  }, [])

  const handleEditLogic = () => {
    AdminService.savePrompt(logic)
      .then(() => {
        //alert('성과평가 로직이 성공적으로 수정되었습니다.')
      })
      .catch((error) => {
        console.error('Error updating prompts:', error)
        alert('성과평가 로직 수정에 실패했습니다. 다시 시도해주세요.')
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header title="관리자 페이지" />

      <div className="flex-1 flex flex-col min-h-0 px-10 pb-5">
        {/* 성과평가 로직 헤더 */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 flex space-x-2 items-center">
            <h3 className="text-md font-semibold">정성평가 로직 관리</h3>
          </div>

          <button
            disabled={logic === prevLogic}
            className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 transform text-white shadow-lg hover:shadow-xl bg-red-400 hover:bg-red-500 active:bg-red-600 mb-2
                ${logic === prevLogic ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            onClick={handleEditLogic}
          >
            수정하기
          </button>
        </div>

        <div className="lg:flex-[1] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col p-4">
          {/* 성과평가 입력폼, textarea, 크기 고정해서 제공 */}
          <textarea
            className="mt-3 flex-1 overflow-auto w-full h-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none transition-all  leading-relaxed"
            placeholder="성과평가 로직에 대한 설명이나 내용을 입력하세요..."
            value={logic}
            onChange={(e) => setLogic(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminLogicPage
