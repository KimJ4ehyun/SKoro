import { useState, useRef, useEffect } from 'react'
import { Download, ChevronLeft } from 'lucide-react'
import type { FeedbackReportProps, Tab } from '../../types/Report.types'
import { styles } from '.'
import { useLocation, useNavigate } from 'react-router-dom'
import ReportService from '../../services/ReportService'
import { useUserInfoStore } from '../../store/useUserInfoStore'

import html2pdf from 'html2pdf.js'
import { managerFeedbackReportDummy } from '../../dummy/report'

const Report: React.FC<FeedbackReportProps> = ({
  selectedYear,
  selectedRating,
  type,
  memberName,
  selectedPeriod,
  memberEmpNo,
  evaluationReasons,
  periodId,
  viewerType = '',
}) => {
  const [activeTab, setActiveTab] = useState<string>('report')
  const [indicatorStyle, setIndicatorStyle] = useState<{
    width: number
    left: number
  }>({
    width: 0,
    left: 0,
  })

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const updateIndicator = (tabId: string) => {
    const tabElement = tabRefs.current[tabId]
    const containerElement = containerRef.current

    if (tabElement && containerElement) {
      const tabRect = tabElement.getBoundingClientRect()
      const containerRect = containerElement.getBoundingClientRect()

      setIndicatorStyle({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      })
    }
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    updateIndicator(tabId)
  }

  const handleTabHover = (tabId: string) => {
    updateIndicator(tabId)
  }

  const handleMouseLeave = () => {
    updateIndicator(activeTab)
  }

  useEffect(() => {
    if (type !== 'final') return

    const handleResize = () => {
      updateIndicator(activeTab)
    }

    setTimeout(() => {
      updateIndicator(activeTab)
    }, 0)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeTab, type])

  const [reportContent, setReportContent] = useState<any>('')
  const location = useLocation()
  const member = location.state?.member || null
  const period = location.state?.selectedPeriod || null
  const [managerFeedback, setManagerFeedback] = useState<string>('')
  const role = useUserInfoStore((state) => state.role)
  const userName = useUserInfoStore((state) => state.empName)

  useEffect(() => {
    console.log('temtm', type, periodId)
    if (type === 'evaluation') {
      if (periodId)
        // [팀장] 해당 기간의 팀 중간 평가 레포트 조회 (임시)
        EvaluationService.getMiddleReport(periodId || 0)
          .then((report) => {
            console.log('팀 중간 평가 레포트 조회 성공:', report)
            setReportContent(report.report)
          })
          .catch((error) => {
            console.error('팀 중간 평가 레포트 조회 실패:', error)
            setReportContent(null)
          })
    } else if (type === 'memberEvaluation') {
    } else if (type != 'feedback') {
      console.log('Report 컴포넌트가 마운트되었습니다.', member, period)
      if (member && period) {
        if (period.final) {
          // [팀장] 팀원 최종 평가 레포트 조회
          ReportService.getEmployeesFinalEvaluationReport(
            member.empNo,
            selectedPeriod ? selectedPeriod.periodId : 0
          )
            .then((report) => {
              console.log('최종 평가 레포트 조회 성공:', report)
            })
            .catch((error) => {
              console.error('최종 평가 레포트 조회 실패:', error)
            })
        } else {
          // [팀장] 해당 기간의 팀원의 분기 평가 레포트 조회
          ReportService.getEmployeesFeedbackReport(
            member.empNo,
            selectedPeriod ? selectedPeriod.periodId : 0
          )
            .then((report) => {
              console.log('분기별 레포트 조회 성공:', report)
            })
            .catch((error) => {
              console.error('분기별 레포트 조회 실패:', error)
            })
        }
      }
    }
  }, [periodId])

  useEffect(() => {
    if (!selectedPeriod) return

    if (member && selectedPeriod) {
      if (selectedPeriod.final) {
        // [팀장] 팀원 최종 평가 레포트 조회
        ReportService.getEmployeesFinalEvaluationReport(
          member.empNo,
          selectedPeriod ? selectedPeriod.periodId : 0
        )
          .then((report) => {
            console.log('최종 평가 레포트 조회 성공:', report)
            setReportContent(report.report)
          })
          .catch((error) => {
            console.error('최종 평가 레포트 조회 실패:', error)
            setReportContent(null)
          })
      } else {
        // [팀장] 해당 기간의 팀원의 분기 평가 레포트 조회
        ReportService.getEmployeesFeedbackReport(
          member.empNo,
          selectedPeriod.periodId
        )
          .then((report) => {
            console.log('분기별 레포트 조회 성공:', report)
            setReportContent(report.report)
          })
          .catch((error) => {
            console.error('개인 분기별 레포트 조회 실패:', error)
            setReportContent(null)
          })
      }
    } else if (type === 'feedback') {
      if (role === 'MANAGER') {
        if (!selectedPeriod?.periodId) return
        // [팀장] 해당 기간의 팀 평가 레포트 조회
        ReportService.getTeamEvaluationReport(selectedPeriod?.periodId || 0)
          .then((report) => {
            console.log('팀 평가 레포트 조회 성공:', report)
            setReportContent(report.report)
          })
          .catch((error) => {
            console.error('팀 평가 레포트 조회 실패:', error)
            setReportContent(null)
          })
      } else {
        // 해당 기간의 본인의 분기 평가 레포트 조회
        ReportService.getMyQuarterlyEvaluationReport(
          selectedPeriod?.periodId || 0
        )
          .then((report) => {
            console.log('분기별 레포트 조회 성공:', report)
            setReportContent(report.report)
          })
          .catch((error) => {
            console.error('분기별 레포트 조회 실패:', error)
            setReportContent(null)
          })
      }
    } else {
      if (role === 'MANAGER') {
        ReportService.getTeamEvaluationReport(selectedPeriod?.periodId || 0)
          .then((report) => {
            console.log('팀 평가 레포트 조회 성공:', report)
            setReportContent(report.report)
          })
          .catch((error) => {
            console.error('팀 평가 레포트 조회 실패:', error)
            setReportContent(null)
          })
        if (role === 'MANAGER') {
          ReportService.getEvaluationFeedbackSummary(
            selectedPeriod?.periodId || 0
          )
            .then((summary) => {
              console.log('팀장 평가 피드백 요약 조회 성공:', summary)
              setManagerFeedback(
                summary.content || '팀장 평가 피드백 요약 내용이 없습니다.'
              )
            })
            .catch((error) => {
              console.error('팀장 평가 피드백 요약 조회 실패:', error)
              setManagerFeedback(
                '팀장 평가 피드백 요약 내용을 불러오는 데 실패했습니다.'
              )
            })
        }
      } else {
        ReportService.getMyFinalEvaluationReport(selectedPeriod?.periodId || 0)
          .then((report) => {
            console.log('최종 평가 레포트 조회 성공:', report)
            setReportContent(
              report.report || null
            )
          })
          .catch((error) => {
            console.error('최종 평가 레포트 조회 실패:', error)
            setReportContent(null)
          })
      }
    }
  }, [member, selectedPeriod])

  const tabs: Tab[] = [
    {
      id: 'report',
      label: `${selectedYear} ${selectedRating} 레포트`,
      content: reportContent,
    },
    {
      id: 'summary',
      label: '팀원 의견 요약',
      content: managerFeedbackReportDummy,
    },
  ]
  const containerRef2 = useRef<HTMLDivElement>(null)

  function downloadReportPDF() {
    console.log('레포트 PDF 다운로드 시작')

    const reportElement = document.querySelector('.SKoro-report-section')
    if (!reportElement) {
      alert('레포트 영역을 찾을 수 없습니다.')
      return
    }

    // 1. 최하위 요소에 클래스 추가
    const leafNodes = Array.from(reportElement.querySelectorAll('*')).filter(
      (el) => el.children.length === 0
    )
    leafNodes.forEach((el) => el.classList.add('avoid-page-break'))

    // 2. 모든 <tr>에 클래스 추가
    const tableRows = reportElement.querySelectorAll('tr')
    tableRows.forEach((tr) => tr.classList.add('avoid-page-break'))

    // ▶ html2pdf 옵션
    const opt = {
      margin: 10,
      filename: `${userName}_${selectedYear}_${selectedRating}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a3',
        orientation: 'portrait',
      },
      pagebreak: {
        mode: ['css'],
      },
    }

    // ▶ PDF 저장
    html2pdf()
      .set(opt)
      .from(reportElement)
      .save()
      .then(() => {
        // 저장 후 클래스 제거 (clean up)
        leafNodes.forEach((el) => el.classList.remove('avoid-page-break'))
      })
  }

  return (
    <section className={`${styles.reportSection} flex flex-col h-full min-h-0`}>
      {type === 'final' && role === 'MANAGER' ? (
        // 최종 평가 레포트
        <>
          <div className="w-full flex justify-between mt-[-8px] items-center">
            <div
              ref={containerRef}
              className="relative flex justify-start  mt-2"
              onMouseLeave={handleMouseLeave}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el
                  }}
                  className={`
                  px-6 py-5 pt-0 text-base font-semibold cursor-pointer transition-colors duration-300 
                  whitespace-nowrap border-none bg-transparent outline-none
                  ${
                    activeTab === tab.id
                      ? 'text-gray-600'
                      : 'text-gray-400 hover:text-gray-500'
                  }
                   mb-[-4px]
                `}
                  onClick={() => handleTabClick(tab.id)}
                  onMouseEnter={() => handleTabHover(tab.id)}
                >
                  {tab.label}
                </button>
              ))}

              {/* 인디케이터 */}
              <div
                className="absolute bottom-0 h-1 bg-blue-400 rounded-t-sm transition-all duration-300 ease-out"
                style={{
                  width: `${indicatorStyle.width}px`,
                  left: `${indicatorStyle.left}px`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>

            <button
              className={`${styles.reportButton} mb-2`}
              onClick={downloadReportPDF}
              aria-label="레포트 다운로드"
            >
              <Download className="inline-block w-5" />
            </button>
          </div>

          <article
            className={`shadow-lg rounded-xl ${styles.reportContentArea} px-6 py-10 flex-1 min-h-0 flex overflow-auto items-center justify-center text-lg`}
          >
            {activeTab === 'summary' && <MarkdownReportViewer />}
            {activeTab === 'report' && (
              <TeamFinalReport report={reportContent} />
            )}
          </article>
        </>
      ) : (
        // 피드백 레포트
        <>
          <div className="mt-[-8px] flex w-full justify-between items-center">
            <div className="flex items-center space-x-3">
              {type === 'memberEvaluation' && <BackButton />}

              <h2 className="font-semibold">
                {type === 'evaluation'
                  ? '팀 통합 평가'
                  : type === 'memberEvaluation'
                  ? `${memberName} 님 평가 근거`
                  : `${selectedPeriod?.periodName} 레포트`}
              </h2>
            </div>

            {type !== 'memberEvaluation' && (
              <button
                className={styles.reportButton}
                onClick={downloadReportPDF}
              >
                <Download className="inline-block w-5" />
              </button>
            )}
          </div>

          <article
            className={`mt-2 rounded-xl ${styles.reportContentArea} ${
              type === 'memberEvaluation' ? '' : 'p-5'
            } flex-1 min-h-0 overflow-auto flex-1 overflow-auto`}
          >
            {(userName === '' && type === 'feedback') ||
            (viewerType === 'manager' &&
              type === 'feedback' &&
              selectedPeriod?.final === false) ? (
              <MemberFeedbackReport report={reportContent} /> // 팀장이 보는 팀원 피드백 레포트
            ) : viewerType === 'manager' &&
              type === 'feedback' &&
              selectedPeriod?.final ? (
              <MemberFinalReportCmp report={reportContent} /> // 팀장이 보는 팀원 최종 레포트
            ) : userName === '' && type === 'final' ? (
              <TeamTemporaryReport /> // 테스트용
            ) : type === 'feedback' && role === 'MEMBER' ? (
              <MemberFeedbackReport report={reportContent} /> // 팀원 피드백 레포트
            ) : type === 'final' && role === 'MEMBER' ? (
              <MemberFinalReportCmp report={reportContent} /> // 팀원 최종 레포트
            ) : type === 'feedback' && role === 'MANAGER' ? (
              <TeamFeedbackReport report={reportContent} /> // 팀장 피드백 레포트
            ) : type === 'final' && role === 'MANAGER' ? (
              <TeamFinalReport report={reportContent} /> // 팀장 최종
            ) : type === 'memberEvaluation' ? (
              <EvaluationReasonDisplay
                memberEmpNo={memberEmpNo}
                evaluationReasons={evaluationReasons}
              /> // 근거
            ) : type === 'evaluation' ? (
              <TeamTemporaryReport /> // 팀장 최종 임시 레포트
            ) : (
              <MemberFeedbackReport report={reportContent} />
            )}
          </article>
        </>
      )}
    </section>
  )
}

export default Report

const BackButton: React.FC = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate('/evaluation')
  }

  return (
    <button
      onClick={handleGoBack}
      className="
        w-10 h-10 
        bg-white 
        rounded-full 
        shadow-md 
        flex items-center justify-center
        transition-all duration-200 ease-in-out
        hover:shadow-lg hover:scale-105 hover:bg-gray-50
        active:scale-95 active:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      "
      aria-label="이전 페이지로 이동"
    >
      <ChevronLeft
        size={24}
        className="text-gray-700 transition-colors duration-200 hover:text-gray-900"
      />
    </button>
  )
}

import {
  FileText,
  Target,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

const MarkdownReportViewer = () => {
  const managerFeedbackReport = managerFeedbackReportDummy

  const parseMarkdown = (text: string) => {
    const sections: {
      title: string
      items: { content: string; highlighted: boolean }[]
    }[] = []

    const lines = text.trim().split('\n')
    let currentSection: {
      title: string
      items: { content: string; highlighted: boolean }[]
    } | null = null

    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentSection) {
          sections.push(currentSection)
        }
        currentSection = {
          title: line.replace('## ', ''),
          items: [],
        }
      } else if (line.startsWith('- ') && currentSection) {
        const content = line.replace('- ', '')
        const isHighlighted = content.includes('**')
        currentSection.items.push({
          content: content.replace(/\*\*/g, ''),
          highlighted: isHighlighted,
        })
      }
    }

    if (currentSection) {
      sections.push(currentSection)
    }

    return sections
  }

  const getSectionIcon = (index: number) => {
    const icons = [Target, TrendingUp, Lightbulb]
    const IconComponent = icons[index] || FileText
    return IconComponent
  }

  const getSectionColor = (index: number) => {
    const colors = [
      'bg-blue-50 border-blue-200',
      'bg-green-50 border-green-200',
      'bg-purple-50 border-purple-200',
    ]
    return colors[index] || 'bg-gray-50 border-gray-200'
  }

  const getIconColor = (index: number) => {
    const colors = ['text-blue-600', 'text-green-600', 'text-purple-600']
    return colors[index] || 'text-gray-600'
  }

  const sections = parseMarkdown(managerFeedbackReport)

  return (
    <div className="h-full SKoro-report-section">
      {/* 헤더 */}
      {/* <div className="mb-8 text-center" style={{ alignItems: 'center' }}>
        <div
          className="flex items-center justify-center mb-4"
          style={{ alignItems: 'center' }}
        >
          <FileText className="w-8 h-8 text-gray-700 mr-3" />
          <h1 className="text-xl font-bold text-gray-800">팀 피드백 보고서</h1>
        </div>
        <p className="text-sm text-gray-600">관리자 피드백 분석 및 개선 방향</p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
      </div> */}

      {/* 섹션들 */}
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => {
          const IconComponent = getSectionIcon(sectionIndex)
          const sectionColor = getSectionColor(sectionIndex)
          const iconColor = getIconColor(sectionIndex)

          return (
            <div
              key={sectionIndex}
              className={`border-2 rounded-xl p-6 ${sectionColor} shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div
                className="flex items-center mb-5"
                style={{ alignItems: 'center' }}
              >
                <div
                  className={`p-2 rounded-lg ${iconColor} bg-white shadow-sm mr-4`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item: any, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center space-x-3"
                    style={{ alignItems: 'center' }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {item.highlighted ? (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div
                      className={`flex-1 p-4 rounded-lg ${
                        item.highlighted
                          ? 'bg-amber-50 border-l-4 border-amber-400 font-medium text-sm  text-amber-900'
                          : 'bg-white text-sm'
                      } shadow-sm text-gray-700 leading-relaxed content-center min-h-[max-content]`}
                      style={{ alignItems: 'center' }}
                    >
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* 푸터 */}
      <div
        className="mt-12 py-6 border-t border-gray-200 text-center"
        style={{ alignItems: 'center' }}
      >
        <p className="text-sm text-gray-500">
          생성일: {new Date().toLocaleDateString('ko-KR')} | 문서 유형: 팀
          피드백 분석 보고서
        </p>
      </div>
    </div>
  )
}

import { MessageSquare } from 'lucide-react'
import MemberFeedbackReport from './MemberFeedbackReport'
import MemberFinalReportCmp from './MemberFinalReport'
import TeamTemporaryReport from './TeamTemporaryReport'
import TeamFeedbackReport from './TeamFeedbackReport'
import TeamFinalReport from './TeamFinalReport'
import EvaluationService from '../../services/EvaluationService'

const EvaluationReasonDisplay: React.FC<{
  memberEmpNo?: string
  evaluationReasons?: any[]
}> = ({ memberEmpNo, evaluationReasons }) => {
  const location = useLocation()
  const getEvaluationReasons = location.state.getEvaluationReasons || {}
  const memberEvaluationReason =
    getEvaluationReasons?.find((reason: any) => reason.empNo === memberEmpNo)
      ?.aiReason || '평가 근거가 없습니다.'

  console.log('EvaluationReasonDisplay 컴포넌트 상태:', {
    getEvaluationReasons,
    memberEvaluationReason,
  })
  console.log(location.state)

  console.log(
    'EvaluationReasonDisplay 컴포넌트 렌더링',
    memberEmpNo,
    evaluationReasons,
    memberEvaluationReason
  )

  // 텍스트를 문장 단위로 분리하는 함수
  const formatText = (text: string) => {
    return text
      .split(/(?<=\.)\s+/)
      .filter((sentence) => sentence.trim().length > 0)
      .map((sentence) => sentence.trim())
  }

  const sentences = formatText(memberEvaluationReason)

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex-1 overflow-auto">
        <div className="space-y-4">
          {sentences.map((sentence, index) => (
            <div key={index} className="flex gap-3 group">
              <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-300 rounded-full mt-3 group-hover:bg-blue-500 transition-colors"></div>
              <p className="text-gray-700 leading-relaxed text-base">
                {sentence}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              평가 근거
            </span>
          </div>
          <span className="text-xs">{sentences.length}개 항목</span>
        </div>
      </div>
    </div>
  )
}
