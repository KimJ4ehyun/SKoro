import React, { useState, useEffect, useRef } from 'react'
import {
  ChevronRight,
  User,
  Target,
  MessageSquare,
  TrendingUp,
  Award,
  CheckCircle,
  Menu,
  CircleCheckBig,
} from 'lucide-react'
import { SKLogoWhite } from '../../assets/common'

const MemberFeedbackReport: React.FC<{
  report: any // 실제로는 Report 타입을 정의하여 사용
}> = ({ report }) => {
  console.log('MemberFeedbackReport rendered with report:', report)
  const [activeSection, setActiveSection] = useState('basic-info')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  // 샘플 데이터 (실제로는 props로 받을 데이터)
  const dummymemberFeedbackReport = {
    기본_정보: {
      성명: '김개발',
      직위: 'CL3',
      소속: 'W1팀',
      업무_수행_기간: '2024년 2분기',
    },
    팀_업무_목표_및_개인_달성률: {
      업무표: [
        {
          Task명: '팀 가동률 모니터링 및 개선',
          핵심_Task:
            '업무 효율성 개선 프로세스 도입. 팀 평균 가동률 82% 달성. 이설계님과 프로세스 개선, 박DB님과 자동화 도구 협업 완료.',
          누적_달성률_퍼센트: 75,
          분석_코멘트:
            '현재 팀의 평균 가동률은 82%로, 목표인 85%에 근접하고 있으나 여전히 3%의 차이가 존재한다. 김개발(SK0002)님은 업무 효율성 개선 프로세스를 도입하여 팀의 성과를 높이는 데 기여하였으며, 이설계님과의 협업을 통해 프로세스 개선을, 박DB님과의 협력을 통해 자동화 도구를 성공적으로 도입하였다. 이러한 노력에도 불구하고 팀의 달성률은 75%로, 팀 평균 달성률 80.9%에 미치지 못하고 있다. 그러나 김개발님은 91점의 기여도를 기록하며 팀 내에서 중요한 역할을 수행하고 있으며, 이는 팀의 전반적인 성과 향상에 긍정적인 영향을 미치고 있다. 현재 상태를 분석할 때, 팀의 지속적인 개선 노력과 협업이 필요하며, 이를 통해 목표 달성을 위한 기반을 마련할 수 있을 것으로 보인다.',
        },
        {
          Task명: '신규 고객 발굴 및 영업 지원',
          핵심_Task:
            '신규 계약 1건 체결 완료(3.8억원 규모). 추가 6개사와 협상 진행 중. 이설계님과 제안서 작성, 박DB님과 기술 솔루션 협업 완료.',
          누적_달성률_퍼센트: 55,
          분석_코멘트:
            '김개발(SK0002)님은 신규 고객 발굴 및 영업 지원 업무에서 55%의 달성률을 기록하며, 목표인 신규 계약 2건 체결에 대해 1건(3.8억원 규모)을 완료했습니다. 현재 6개사와의 협상이 진행 중이며, 이설계님과의 제안서 작성 및 박DB님과의 기술 솔루션 협업을 통해 팀의 시너지를 극대화했습니다. 팀 평균 달성률인 80.9%에 비해 다소 낮은 성과를 보였으나, 협업을 통한 기여도는 3점으로 평가됩니다. 현재 상태를 분석할 때, 김개발님은 팀의 목표 달성을 위해 지속적으로 노력하고 있으며, 향후 성과 향상을 위한 기반을 마련하고 있습니다.',
        },
        {
          Task명: 'AI 제안서 기능 고도화 개발',
          핵심_Task:
            'AI 제안서 자동 생성 핵심 모듈 50% 개발 완료. 템플릿 엔진 구현 및 테스트. 이설계님과의 코드 리뷰, 박DB님과의 데이터 연동 협업 완료.',
          누적_달성률_퍼센트: 50,
          분석_코멘트:
            '현재 김개발(SK0002)님은 AI 제안서 자동 생성 기능의 고도화 개발을 담당하고 있으며, 목표 달성을 위해 핵심 모듈의 50%를 완료했습니다. 이 과정에서 템플릿 엔진을 성공적으로 구현하고 테스트를 마쳤으며, 이설계님과의 코드 리뷰 및 박DB님과의 데이터 연동 협업을 통해 팀의 시너지를 극대화했습니다. 팀 평균 달성률이 80.9%인 가운데, 김개발님은 50%의 달성률을 기록하며 팀 기여도 27점을 보였습니다. 현재 상태를 분석해보면, 과거 성장 추세에 비해 다소 낮은 성과를 보이고 있으나, 협업을 통한 기술적 진전을 이루어낸 점은 긍정적으로 평가할 수 있습니다.',
        },
      ],
      개인_종합_달성률: 60,
      종합_기여_코멘트:
        '김개발(SK0002)님은 현재 3개의 Task에 참여하여 평균 달성률 60.0%와 평균 기여도 40.3점을 기록하였습니다. 특히, AI 제안서 기능 고도화 개발에서 50%의 달성률을 보이며 27점의 기여도를 나타냈으나, 이는 팀 평균인 80.9%에 비해 낮은 수치입니다. 팀 가동률 모니터링 및 개선 Task에서는 75%의 달성률과 91점의 기여도를 기록하여 상대적으로 긍정적인 성과를 보였으나, 신규 고객 발굴 및 영업 지원에서는 55%의 달성률과 3점의 기여도로 낮은 기여도를 나타냈습니다. 이러한 성과를 통해 김개발님은 특정 Task에서의 강점을 보이지만, 전반적인 성과는 팀 평균에 미치지 못하는 상황입니다. 향후 성과 개선을 위해서는 각 Task의 기여도를 균형 있게 높이는 것이 필요할 것으로 보입니다.',
      해석_기준:
        '달성률 90% 이상: 우수, 80-89%: 양호, 70-79%: 보통, 70% 미만: 개선 필요',
    },
    Peer_Talk: {
      강점: '해당 직원은 AI 제안서 자동 생성 모듈 개발에서 열정과 능동적인 태도를 보이며, 빠른 실행력으로 템플릿 엔진 구현 및 테스트를 성공적으로 완료했습니다. 또한, 책임감 있게 프로젝트의 절반을 개발하며 문제 해결 능력을 발휘했습니다.',
      우려: '현재 분석 데이터에서는 특별히 우려할 만한 부정적인 키워드가 발견되지 않았습니다. 그러나 지속적인 성장을 위해 새로운 기술 트렌드에 대한 학습과 더 다양한 프로젝트 경험을 통해 역량을 확장하는 것이 좋습니다.',
      협업_관찰:
        '해당 직원은 동료들과의 협업을 통해 개발 속도를 향상시키고, 코드 리뷰와 데이터 연동 협업을 통해 신뢰할 수 있는 협업 능력을 보여주었습니다. 특히, 소통 개선에 기여한 점이 긍정적으로 평가됩니다.',
    },
    업무_실행_및_태도: {
      Passionate:
        '성과 하이라이트:\nAI 제안서 자동 생성 핵심 모듈 50% 개발 완료, 단위 테스트 커버리지 85% 달성.\n업무 프로세스 3가지 개선 및 자동화 도구 5가지 도입으로 팀 평균 가동률 82% 달성.\n신규 계약 1건 체결(3.8억원 규모) 및 추가 6개사와 협상 진행 중.',
      Proactive:
        '주도적 성과:\nAI 제안서 자동 생성 핵심 모듈 50% 개발 완료, 단위 테스트 커버리지 85% 달성\n팀 평균 가동률 82% 달성을 위한 업무 프로세스 3가지 개선 및 자동화 도구 5가지 도입\n신규 계약 1건 체결(3.8억원 규모) 및 추가 6개사와 협상 진행 중',
      Professional:
        '전문성 발휘:\nAI 제안서 자동 생성 핵심 모듈 50% 개발 완료 및 단위 테스트 커버리지 85% 달성\n업무 프로세스 3가지 개선 및 자동화 도구 5가지 도입으로 팀 평균 가동률 82% 달성\n신규 계약 1건 체결 완료(3.8억원 규모) 및 추가 6개사와 협상 진행 중',
      People:
        '협업 기여:\n김개발은 팀 효율성 개선을 위해 업무 프로세스 개선과 자동화 도구 도입을 주도하여 팀 평균 가동률을 82%로 향상시켰습니다.\n주 3회 코드 리뷰와 데이터 연동 테스트를 통해 이설계(SK0003) 및 박DB(SK0004)와의 협업을 적극적으로 수행했습니다.\n신규 고객 영업에서 맞춤형 제안서를 공동 작성하고, 기술 솔루션을 함께 제안하여 3.8억원 규모의 신규 계약을 체결했습니다.',
      종합_평가:
        '우수 수준의 4P 역량을 보유하고 있으며, 4P 영역이 매우 균형있게 발달',
    },
    성장_제안_및_개선_피드백: {
      성장_포인트: [
        '김개발님은 AI 제안서 자동 생성 모듈 개발 경험을 통해 복잡한 시스템 아키텍처 설계 역할로의 확장을 기대할 수 있습니다. 이는 귀하의 기술적 역량을 더욱 발전시키는 기회가 될 것입니다.',
        '프로젝트의 절반을 책임감 있게 개발한 경험은 팀 내에서 기술 리더십을 강화하는 데 큰 도움이 될 것입니다. 귀하의 경험을 바탕으로 팀원들에게 긍정적인 영향을 미칠 수 있습니다.',
      ],
      보완_영역: [
        '코드 리뷰 시 동료에게 기술적 설명을 보다 명확하게 전달하는 커뮤니케이션 스킬을 향상시키는 것은 귀하의 성장에 큰 도움이 될 것입니다. 이를 통해 팀 내 협업이 더욱 원활해질 것입니다.',
        '과도한 협업을 줄이기 위해 독립적인 문제 해결 능력을 강화하는 것도 중요합니다. 이를 통해 귀하의 자율성과 자신감을 높일 수 있습니다.',
      ],
      추천_활동: [
        '사내 기술 세미나에서 AI 제안서 시스템 개발 경험을 발표해보세요. 이는 귀하의 경험을 공유하고, 다른 팀원들과의 소통을 강화하는 좋은 기회가 될 것입니다.',
        '타팀과의 API 설계 협업 프로젝트에 참여하여 독립적인 개발 경험을 쌓아보세요. 이는 귀하의 기술적 역량을 더욱 확장하는 데 도움이 될 것입니다.',
        '주간 코드 리뷰 세션에서 피드백을 주고받으며 설명 방식 개선을 위한 실습을 진행해보세요. 이는 귀하의 커뮤니케이션 스킬을 향상시키는 데 큰 도움이 될 것입니다.',
      ],
    },
    총평: '김개발님, 이번 분기 동안의 성과에 대해 진심으로 축하드립니다! 60%의 달성률과 팀 내 1위의 성과는 귀하의 뛰어난 기여도를 잘 보여줍니다. 특히 AI 제안서 시스템 개발에서의 핵심 역할과 템플릿 엔진 구현을 통해 팀의 효율성을 크게 향상시킨 점은 매우 인상적입니다. \n\n협업률 100%는 팀워크의 중요성을 잘 나타내며, 귀하의 책임감 있는 자세가 팀에 긍정적인 영향을 미쳤음을 알 수 있습니다. 다만, 협업 편중도가 높아 과의존의 위험이 있으니, 다양한 팀원들과의 협업을 통해 균형을 맞추는 것이 좋겠습니다. \n\n앞으로는 Passionate, Proactive, Professional, People 각 영역에서의 성장을 위해 새로운 기술 습득이나 멘토링 활동을 추천드립니다. 이러한 노력이 귀하의 전문성을 더욱 강화할 것입니다. 계속해서 멋진 성과를 기대합니다!',
  }

  const memberFeedbackReport = report || dummymemberFeedbackReport // props로 받은 리포트 데이터
  // const memberFeedbackReport = dummymemberFeedbackReport // props로 받은 리포트 데이터

  // if (report === '' || report === undefined) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <p className="text-gray-500 text-lg">리포트 데이터가 없습니다.</p>
  //     </div>
  //   )
  // }

  const tableOfContents = [
    { id: 'basic-info', title: '기본 정보', icon: User },
    { id: 'performance', title: '업무 목표 및 달성률', icon: Target },
    { id: 'peer-talk', title: 'Peer Talk', icon: MessageSquare },
    { id: 'work-attitude', title: '업무 실행 및 태도', icon: Award },
    {
      id: 'growth-feedback',
      title: '성장 제안 및 개선 피드백',
      icon: TrendingUp,
    },
    { id: 'summary', title: '총평', icon: CheckCircle },
  ]

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + 200

  //     for (const section of tableOfContents) {
  //       const element = sectionRefs.current[section.id]
  //       if (element) {
  //         const { offsetTop, offsetHeight } = element
  //         if (
  //           scrollPosition >= offsetTop &&
  //           scrollPosition < offsetTop + offsetHeight
  //         ) {
  //           setActiveSection(section.id)
  //           break
  //         }
  //       }
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  const scrollToSection = (sectionId: number) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // const [isVisible, setIsVisible] = useState(false)

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-400'
    if (percentage >= 80) return 'bg-blue-400'
    if (percentage >= 70) return 'bg-yellow-400'
    return 'bg-blue-400'
  }

  const getProgressTagColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (percentage >= 80) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (percentage >= 70)
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  // const getProgressLabel = (percentage: number) => {
  //   if (percentage >= 90) return '우수'
  //   if (percentage >= 80) return '양호'
  //   if (percentage >= 70) return '보통'
  //   return '개선 필요'
  // }

  return (
    <section className="flex h-full flex-col">
      {/* Table of Contents */}
      <div className="bg-white border-b border-gray-200">
        <nav className="flex flex-wrap gap-2 pb-4">
          {tableOfContents.map((item: any) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all print:hidden ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-auto SKoro-report-section avoid-page-break shadow-md bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 flex w-full justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">멤버 피드백 리포트</h1>
            <p className="text-blue-100">개인별 성과 평가 및 성장 방향 제시</p>
          </div>
          <div className="items-center justify-end">
            <img src={SKLogoWhite} alt="SK Logo" className="h-14 w-auto" />
          </div>
        </div>

        <div className="p-8 space-y-14">
          {/* 기본 정보 */}
          <div
            ref={(el: any) => (sectionRefs.current['basic-info'] = el)}
            className="scroll-mt-20"
          >
            <div className="flex items-center gap-3 mb-6">
              {/* <User className="text-gray-800" size={24} /> */}
              <h2 className="text-2xl font-bold text-gray-800">기본 정보</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">성명</p>
                <p className="text-lg font-semibold text-gray-800">
                  {memberFeedbackReport.기본_정보.성명}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">직위</p>
                <p className="text-lg font-semibold text-gray-800">
                  {memberFeedbackReport.기본_정보.직위}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">소속</p>
                <p className="text-lg font-semibold text-gray-800">
                  {memberFeedbackReport.기본_정보.소속}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">평가 기간</p>
                <p className="text-lg font-semibold text-gray-800">
                  {memberFeedbackReport.기본_정보.업무_수행_기간}
                </p>
              </div>
            </div>
          </div>

          {/* 업무 목표 및 달성률 */}
          <div
            ref={(el: any) => (sectionRefs.current['performance'] = el)}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-gray-800  mb-6">
              팀 업무 목표 및 개인 달성률
            </h2>

            {/* 종합 달성률 카드 */}
            <div className="border p-6 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  개인 종합 달성률
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 bg-blue-400`}
                    style={{
                      width: `${memberFeedbackReport.팀_업무_목표_및_개인_달성률.개인_종합_달성률}%`,
                    }}
                  ></div>
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  {
                    memberFeedbackReport.팀_업무_목표_및_개인_달성률
                      .개인_종합_달성률
                  }
                  %
                </span>
              </div>
            </div>

            {/* 업무표 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm break-keep">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-4 text-left font-semibold text-gray-700 text-center">
                      Task명
                    </th>
                    <th className="border border-gray-200 p-4 text-left font-semibold text-gray-700 text-center">
                      핵심 Task
                    </th>
                    <th className="border border-gray-200 p-4 text-center font-semibold text-gray-700 whitespace-nowrap">
                      누적 달성률
                    </th>
                    <th className="border border-gray-200 p-4 text-left font-semibold text-gray-700">
                      분석 코멘트
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberFeedbackReport.팀_업무_목표_및_개인_달성률.업무표.map(
                    (task: any, index: number) => (
                      // 홀짝 행 색상 변경
                      <tr
                        key={index}
                        className={`
                            hover:bg-gray-50 transition-colors duration-200
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          `}
                      >
                        <td className="border border-gray-200 p-4 font-medium text-gray-800 text-center">
                          {task['Task명']}
                        </td>
                        <td className="border border-gray-200 p-4 text-gray-600 text-sm leading-relaxed">
                          {task['핵심_Task']}
                        </td>
                        <td className="border border-gray-200 p-4 text-center">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getProgressTagColor(
                              task['누적_달성률_퍼센트']
                            )} hover:opacity-90 transition-colors duration-200`}
                          >
                            {task['누적_달성률_퍼센트']}%
                          </span>
                        </td>
                        <td className="border border-gray-200 p-4 text-gray-600 text-sm leading-relaxed">
                          {task['분석_코멘트']}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50/70 rounded-lg">
              <h4 className="text-md font-semibold text-blue-600 mb-2">
                종합 기여 코멘트
              </h4>
              <p className="text-blue-900 text-sm leading-relaxed">
                {
                  memberFeedbackReport.팀_업무_목표_및_개인_달성률
                    .종합_기여_코멘트
                }
              </p>
            </div>
          </div>

          {/* Peer Talk */}
          <div
            ref={(el: any) => (sectionRefs.current['peer-talk'] = el)}
            className="scroll-mt-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Peer Talk</h2>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 p-6 bg-green-50/70 border-l-4 border-green-300 rounded-r-lg">
                <h4 className="text-md font-semibold text-green-800 mb-3">
                  강점
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFeedbackReport.Peer_Talk.강점}
                </p>
              </div>
              <div className="flex-1 p-6 bg-yellow-50/70 border-l-4 border-yellow-300 rounded-r-lg">
                <h4 className="text-md font-semibold text-yellow-800 mb-3">
                  우려
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFeedbackReport.Peer_Talk.우려}
                </p>
              </div>
              <div className="flex-1 p-6 bg-blue-50/70 border-l-4 border-blue-300 rounded-r-lg">
                <h4 className="text-md font-semibold text-blue-800 mb-3">
                  협업 관찰
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFeedbackReport.Peer_Talk.협업_관찰}
                </p>
              </div>
            </div>
          </div>

          {/* 업무 실행 및 태도 */}
          <div
            ref={(el: any) => (sectionRefs.current['work-attitude'] = el)}
            className="scroll-mt-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                업무 실행 및 태도 (4P 평가)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-red-50/50 rounded-lg border-red-200">
                <h4 className="text-md font-semibold text-red-500/90 mb-3">
                  Passionate (열정)
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFeedbackReport.업무_실행_및_태도.Passionate.split(
                    '\n'
                  ).map((line: string, index: number) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div className="p-6 bg-blue-50/50 rounded-lg border-blue-500">
                <h4 className="text-md font-semibold text-blue-500/90 mb-3">
                  Proactive (주도성)
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFeedbackReport.업무_실행_및_태도.Proactive.split(
                    '\n'
                  ).map((line: string, index: number) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div className="p-6 bg-green-50/50 rounded-lg border-green-500">
                <h4 className="text-md font-semibold text-green-500/90 mb-3">
                  Professional (전문성)
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFeedbackReport.업무_실행_및_태도.Professional.split(
                    '\n'
                  ).map((line: string, index: number) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div className="p-6 bg-purple-50/50 rounded-lg border-purple-500">
                <h4 className="text-md font-semibold text-purple-500/90 mb-3">
                  People (협업)
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFeedbackReport.업무_실행_및_태도.People.split(
                    '\n'
                  ).map((line: string, index: number) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="p-6 bg-yellow-50/50 border-yellow-500 rounded-lg">
              <div className="flex items-center mb-3">
                <CircleCheckBig className="text-yellow-600 mr-3" size={20} />
                <h4 className="text-md font-semibold text-yellow-600">
                  종합 평가
                </h4>
              </div>
              <p className="text-sm text-yellow-700 leading-relaxed">
                {memberFeedbackReport.업무_실행_및_태도.종합_평가}
              </p>
            </div>
          </div>

          {/* 성장 제안 및 개선 피드백 */}
          <div
            ref={(el: any) => (sectionRefs.current['growth-feedback'] = el)}
            className="scroll-mt-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                성장 제안 및 개선 피드백
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-4 text-left font-semibold text-gray-700 w-28 text-center">
                      구분
                    </th>
                    <th className="border border-gray-200 p-4 text-left font-semibold text-gray-700 text-center">
                      내용
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="border border-gray-200 p-4 font-medium text-center text-gray-700">
                      성장 포인트
                    </td>
                    <td className="border border-gray-200 p-4">
                      <ul className="space-y-3">
                        {memberFeedbackReport.성장_제안_및_개선_피드백.성장_포인트.map(
                          (point: any, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">
                                •
                              </span>
                              <span className="text-gray-700">{point}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="border border-gray-200 p-4 bg-gray-50/50 font-medium text-center text-gray-700">
                      보완 영역
                    </td>
                    <td className="border border-gray-200 p-4 bg-gray-50/50">
                      <ul className="space-y-3">
                        {memberFeedbackReport.성장_제안_및_개선_피드백.보완_영역.map(
                          (area: any, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-yellow-600 font-bold">
                                •
                              </span>
                              <span className="text-gray-700">{area}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="border border-gray-200 p-4 font-medium text-center text-gray-700">
                      추천 활동
                    </td>
                    <td className="border border-gray-200 p-4">
                      <ul className="space-y-3">
                        {memberFeedbackReport.성장_제안_및_개선_피드백.추천_활동.map(
                          (activity: any, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 font-bold">•</span>
                              <span className="text-gray-700">{activity}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 총평 */}
          <div
            ref={(el: any) => (sectionRefs.current['summary'] = el)}
            className="scroll-mt-20 pb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">총평</h2>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-lg border border-blue-200">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-md whitespace-pre-line">
                  {memberFeedbackReport.총평}
                </p>
              </div>
            </div>
          </div>

          {/* 마지막 문구 */}
          {/* 구분선 제시 후 마지막 문구 작성 */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-xs text-right">
              본 보고서는 SKoro AI 성과평가 시스템을 기반으로 생성되었습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MemberFeedbackReport
