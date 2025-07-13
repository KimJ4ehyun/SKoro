import { useState, useEffect, useRef } from 'react'
import {
  User,
  Target,
  TrendingUp,
  MessageSquare,
  Award,
  BookOpen,
} from 'lucide-react'
import { SKLogoWhite } from '../../assets/common'

const MemberFinalReportCmp: React.FC<{
  report: any
}> = ({ report }) => {
  const [activeSection, setActiveSection] = useState('basic-info')

  // JSON 데이터
  const dummyMemberFinalReport = {
    기본_정보: {
      성명: '박DB',
      직위: 'CL3',
      소속: 'W1팀',
      업무_수행_기간: '2024년 연말',
    },
    최종_평가: {
      최종_점수: 0.72,
      업적: 2.2,
      SK_Values: {
        Passionate: 4.5,
        Proactive: 4.5,
        Professional: 4.5,
        People: 3.5,
      },
      성과_요약:
        '박DB(SK0004)님은 올해 두 가지 주요 Task에 참여하여 평균 달성률 70.5%와 평균 기여도 40.5점을 기록하였습니다. 특히 AI 시스템 데이터베이스 구축 Task에서는 81%의 달성률을 보이며 29점의 기여도를 나타냈고, 시스템 성능 최적화를 통한 운영비 절감 Task에서는 60%의 달성률과 52점의 기여도를 기록하였습니다. 이러한 성과는 팀 전체 평균 달성률 104.8%에 비해 다소 낮은 수치이나, 박DB님이 기여한 영역에서의 성과는 팀의 목표 달성에 중요한 역할을 했음을 보여줍니다. 분기별 성장 추이를 살펴보면, 박DB님은 초기 Task에서의 성과를 바탕으로 후반기에는 성과를 개선하기 위한 노력을 기울였으나, 전반적인 성과는 팀 평균에 미치지 못했습니다. 종합적으로 평가할 때, 박DB님은 특정 Task에서 두드러진 기여를 하였으나, 전반적인 성과 향상을 위해 추가적인 노력이 필요할 것으로 보입니다. 이러한 분석을 통해 향후 성과 개선을 위한 방향성을 제시할 수 있을 것입니다.',
    },
    분기별_업무_기여도: [
      {
        분기: '1분기',
        순위: 3,
        달성률: 31,
        실적_요약:
          '박DB님은 DB Specialist로서 두 가지 주요 Task에 참여하였으며, 전체 평균 달성률은 35.5%로 팀 평균 85.3%에 비해 낮은 수치를 기록하였습니다. 특히 AI 시스템 데이터베이스 구축 Task에서는 25%의 달성률과 4점의 기여도를 보였고, 시스템 성능 최적화를 통한 운영비 절감 Task에서는 46%의 달성률과 50점의 기여도를 기록하여 상대적으로 높은 성과를 나타냈습니다. 이러한 성과는 박DB님이 특정 Task에서 더 나은 기여를 할 수 있는 잠재력을 보여주며, 향후 데이터베이스 구축 분야에서의 역량 강화를 통해 더욱 발전하실 수 있을 것입니다.',
      },
      {
        분기: '2분기',
        순위: 3,
        달성률: 27,
        실적_요약:
          '박DB님은 DB Specialist로서 두 가지 주요 Task에 참여하였으며, 전체 평균 달성률은 26.5%로 팀 평균 67.1%에 비해 낮은 수치를 기록하였습니다. AI 시스템 데이터베이스 구축 Task에서는 30%의 달성률과 30점의 기여도를 보였고, 시스템 성능 최적화를 통한 운영비 절감 Task에서는 23%의 달성률과 86점의 기여도를 기록하였습니다. 이로 인해 평균 기여도는 58.0점으로 나타났습니다. 박DB님은 두 Task에서 각각의 기여도가 상이하나, 향후 성과 향상을 위해 Task별 목표 달성에 대한 전략적 접근이 필요할 것으로 보입니다.',
      },
      {
        분기: '3분기',
        순위: 3,
        달성률: 68,
        실적_요약:
          '박DB님은 DB Specialist로서 두 가지 주요 Task에 참여하여 평균 달성률 64.0%와 평균 기여도 42.0점을 기록하였습니다. AI 시스템 데이터베이스 구축 Task에서는 75%의 달성률을 보이며 29점의 기여도를 나타냈고, 시스템 성능 최적화를 통한 운영비 절감 Task에서는 53%의 달성률과 55점의 기여도를 기록하였습니다. 박DB님은 두 Task에서 지속적으로 노력하고 있으며, 향후 최적화 Task에서의 성과 향상이 중요한 성장 포인트로 판단됩니다.',
      },
      {
        분기: '4분기',
        순위: 3,
        달성률: 74,
        실적_요약:
          '박DB님은 올해 두 가지 주요 Task에 참여하여 평균 달성률 70.5%와 평균 기여도 40.5점을 기록하였습니다. AI 시스템 데이터베이스 구축 Task에서는 81%의 달성률을 보이며 29점의 기여도를 나타냈고, 시스템 성능 최적화를 통한 운영비 절감 Task에서는 60%의 달성률과 52점의 기여도를 기록하였습니다. 박DB님은 기여한 영역에서의 성과가 팀의 목표 달성에 중요한 역할을 했음을 보여줍니다. 향후 성과 개선을 위한 추가적인 노력이 필요할 것으로 보입니다.',
      },
    ],
    팀_업무_목표_및_개인_달성률: {
      업무표: [
        {
          Task명: 'AI 시스템 데이터베이스 구축',
          핵심_Task:
            'AI 학습 데이터 DB 구조 85% 완성. 데이터 수집/저장/관리 시스템 구축. 김개발님과 연동 테스트, 이설계님과 관리 정책 협업 완료.',
          누적_달성률_퍼센트: 81,
          분석_코멘트:
            '2023년 동안 박DB님은 AI 학습 데이터 DB 구조 완성이라는 목표를 향해 81%의 달성률을 기록하며 팀의 평균 달성률인 104.8%에 기여하였습니다. 누적 성과로는 AI 학습 데이터 DB 구조의 85% 완성을 이루었으며, 데이터 수집, 저장, 관리 시스템을 성공적으로 구축하였습니다. 이러한 기여도는 29점으로 평가되며, 박DB님은 팀의 성장 추이에 기여하며 향후에도 지속적인 발전이 기대됩니다.',
        },
        {
          Task명: '시스템 성능 최적화를 통한 운영비 절감',
          핵심_Task:
            '인프라 운영비 9% 절감 달성(목표 대비 90%). 지속적인 성능 모니터링 및 최적화 체계 구축. 김개발님과 AI 시스템 최적화, 이설계님과 비용 효율성 협업 완료.',
          누적_달성률_퍼센트: 60,
          분석_코멘트:
            '2023년 동안 박DB님은 시스템 성능 최적화를 통해 인프라 운영비를 9% 절감하는 성과를 달성하였으며, 이는 설정된 목표인 15% 대비 90%에 해당합니다. 박DB님은 지속적인 성능 모니터링 및 최적화 체계를 구축하여 팀의 성장에 기여하였습니다. 이러한 기여도는 52점으로 평가되며, 박DB님은 연간 성과에서 긍정적인 영향을 미쳤습니다.',
        },
      ],
      개인_종합_달성률: 74,
      종합_기여_코멘트:
        '박DB(SK0004)님은 올해 두 가지 주요 Task에 참여하여 평균 달성률 70.5%와 평균 기여도 40.5점을 기록하였습니다. 특히 AI 시스템 데이터베이스 구축 Task에서는 81%의 달성률을 보이며 29점의 기여도를 나타냈고, 시스템 성능 최적화를 통한 운영비 절감 Task에서는 60%의 달성률과 52점의 기여도를 기록하였습니다. 이러한 성과는 팀 전체 평균 달성률 104.8%에 비해 다소 낮은 수치이나, 박DB님이 기여한 영역에서의 성과는 팀의 목표 달성에 중요한 역할을 했음을 보여줍니다. 분기별 성장 추이를 살펴보면, 박DB님은 초기 Task에서의 성과를 바탕으로 후반기에는 성과를 개선하기 위한 노력을 기울였으나, 전반적인 성과는 팀 평균에 미치지 못했습니다. 종합적으로 평가할 때, 박DB님은 특정 Task에서 두드러진 기여를 하였으나, 전반적인 성과 향상을 위해 추가적인 노력이 필요할 것으로 보입니다. 이러한 분석을 통해 향후 성과 개선을 위한 방향성을 제시할 수 있을 것입니다.',
    },
    Peer_Talk: {
      강점: '해당 직원은 AI 학습 데이터 DB 구조를 85% 완성하는 과정에서 책임감과 성실함을 발휘하였으며, 문제해결력을 통해 데이터 수집, 저장, 관리 시스템을 성공적으로 구축하였습니다. 또한, 팀 내에서 신뢰할 수 있는 열린 소통을 통해 협업을 원활히 이끌었습니다.',
      우려: '해당 직원은 프로젝트 진행 중 일부 상황에서 회피형 태도와 무관심을 보이며 소통이 단절되는 경우가 있었습니다. 이러한 태도는 프로젝트의 원활한 진행에 방해가 될 수 있으므로, 보다 적극적인 참여와 의사소통 개선이 필요합니다.',
      협업_관찰:
        '해당 직원은 김개발님과의 연동 테스트 및 이설계님과의 관리 정책 협업을 통해 기술적 완성도를 보여주었습니다. 그러나 일부 상황에서는 수동적이고 의욕이 부족한 모습을 보여, 팀 내 협업에 있어 보다 적극적인 태도가 요구됩니다.',
    },
    성장_제안_및_개선_피드백: {
      성장_포인트: [
        '당신의 AI 데이터베이스 시스템 관리에 대한 열정은 정말 인상적입니다. 이 강점을 활용하여 복잡한 데이터 구조 설계 및 최적화 프로젝트의 리더 역할을 확대해보세요. 당신의 리더십이 팀에 큰 도움이 될 것입니다.',
        '문제 해결 능력을 바탕으로 데이터 수집 및 관리 시스템의 성과를 높이기 위한 새로운 데이터 처리 프로세스를 개발하는 것은 매우 중요한 작업입니다. 당신의 창의적인 접근 방식이 큰 변화를 가져올 수 있습니다.',
      ],
      보완_영역: [
        '팀 회의에서 의견을 제시하고 피드백을 제공하는 것은 당신의 사람들과의 관계를 더욱 강화할 수 있는 기회입니다. 적극적으로 참여하는 스킬을 향상시켜보세요. 이는 당신의 전문성을 더욱 빛나게 할 것입니다.',
        '프로젝트 진행 중 발생하는 문제에 대해 즉각적으로 소통하는 것은 의사소통 능력을 강화하는 데 큰 도움이 됩니다. 회피형 태도를 개선하고, 팀원들과의 소통을 통해 더 나은 결과를 이끌어낼 수 있습니다.',
      ],
      추천_활동: [
        '사내 기술 세미나에서 AI 데이터베이스 최적화 사례를 발표해보세요. 이는 당신의 전문성을 널리 알릴 수 있는 좋은 기회입니다.',
        '타 팀과의 협업을 통해 데이터 관리 정책 개선 프로젝트에 참여해보세요. 다양한 시각을 접하는 것은 당신의 성장에 큰 도움이 될 것입니다.',
        '정기적인 피어 리뷰 세션을 통해 코드 리뷰 및 지식 전달 스킬을 향상시켜보세요. 이는 팀 내에서의 신뢰를 쌓는 데도 큰 도움이 될 것입니다.',
      ],
    },
    팀장_Comment:
      '박DB님, 올해의 성과에 대해 진심으로 격려드립니다! AI 시스템 데이터베이스 구축 Task에서 보여준 81%의 달성률은 정말 인상적이었습니다. 다만, 시스템 성능 최적화 Task에서의 성과는 아쉬운 부분이 있었던 것 같습니다. 앞으로는 팀원들과의 소통을 더욱 강화하고, 적극적인 참여를 통해 더 나은 결과를 만들어 나가길 기대합니다. 박DB님의 열정과 전문성은 팀에 큰 힘이 되고 있습니다. 지속적인 발전을 위해 함께 노력해 나가요!',
    종합_Comment:
      '박DB님, 이번 평가 기간 동안 보여주신 성과에 대해 진심으로 축하드립니다. AI 학습 데이터 DB 구조를 85% 완성하며 책임감과 성실함을 발휘하신 점은 특히 인상적이었습니다. 팀 내에서 3위의 달성률(74%)을 기록하며 기여도 20%를 달성하신 것은 귀하의 노력과 협업 능력을 잘 보여줍니다. \n\n다만, 프로젝트 진행 중 일부 상황에서 회피형 태도가 나타난 점은 개선이 필요합니다. 보다 적극적인 참여와 소통을 통해 팀의 목표 달성에 기여할 수 있는 기회를 늘려가시길 바랍니다. \n\n향후, 협업 편중도를 줄이고 다양한 의견을 수렴하는 데 집중하신다면 더욱 효과적인 팀워크를 이끌어낼 수 있을 것입니다. 지속적인 성장과 발전을 기대하며, 앞으로의 여정에 응원과 지지를 보냅니다.',
  }
  const memberFinalReport = report || dummyMemberFinalReport

  // 목차 데이터
  const tableOfContents = [
    { id: 'basic-info', title: '기본 정보', icon: User },
    { id: 'final-evaluation', title: '최종 평가', icon: Award },
    {
      id: 'quarterly-contribution',
      title: '분기별 업무 기여도',
      icon: TrendingUp,
    },
    { id: 'team-goals', title: '팀 업무 목표 및 개인 달성률', icon: Target },
    { id: 'peer-talk', title: 'Peer Talk', icon: MessageSquare },
    {
      id: 'growth-feedback',
      title: '성장 제안 및 개선 피드백',
      icon: BookOpen,
    },
    { id: 'comments', title: '종합 코멘트', icon: MessageSquare },
  ]

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // 스크롤 감지 및 활성 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionRefs.current)
      let currentSection = sections[0]

      for (const section of sections) {
        const element = sectionRefs.current[section]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            currentSection = section
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const el = sectionRefs.current[sectionId]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.warn('🚨 element not found:', sectionId)
    }
  }

  // 달성률에 따른 색상 반환
  const getAchievementColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (rate >= 80) return 'text-blue-400 bg-blue-50 border-blue-200'
    if (rate >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  // 순위에 따른 배지 색상
  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-600'
    if (rank === 2) return 'bg-gray-100 text-gray-800'
    if (rank === 3) return 'bg-orange-100 text-orange-700'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <section className="h-full flex h-full flex-col">
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

      {/* 메인 컨텐츠 */}
      <div className="flex-1 min-h-0 overflow-auto SKoro-report-section shadow-md bg-white rounded-lg shadow-lg">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-8 flex w-full justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">2025년 연말 평가 레포트</h1>
            <p className="text-blue-100">구성원 종합 성과 평가서</p>
          </div>
          <div className="items-center justify-end">
            <img src={SKLogoWhite} alt="SK Logo" className="h-14 w-auto" />
          </div>
        </div>

        <div className="p-8 space-y-14">
          {/* 기본 정보 */}
          <section
            ref={(el: any) => (sectionRefs.current['basic-info'] = el)}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">기본 정보</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">성명</p>
                <p className="text-lg font-semibold text-gray-800">
                  {memberFinalReport.기본_정보.성명}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">직위</p>
                <p className="text-lg font-semibold text-gray-800">
                  {memberFinalReport.기본_정보.직위}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">소속</p>
                <p className="text-lg font-semibold text-gray-800">
                  {memberFinalReport.기본_정보.소속}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">평가 기간</p>
                <p className="text-lg font-semibold text-gray-800">
                  {memberFinalReport.기본_정보.업무_수행_기간}
                </p>
              </div>
            </div>
          </section>

          {/* 최종 평가 */}
          <section
            ref={(el: any) => (sectionRefs.current['final-evaluation'] = el)}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">최종 평가</h2>
            <div className="overflow-x-auto mb-6">
              {/* 최종 평가 표 */}
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      rowSpan={2}
                      className="font-semibold border border-gray-300 px-4 py-2"
                    >
                      업적 점수
                    </th>
                    <th
                      colSpan={4}
                      className="font-semibold border border-gray-300 px-4 py-2 bg-red-50 text-red-400"
                    >
                      SK Values
                    </th>
                    <th
                      rowSpan={2}
                      className="font-semibold border border-gray-300 px-4 py-2 bg-blue-50 text-blue-400"
                    >
                      최종 점수
                    </th>
                  </tr>
                  <tr>
                    <th className="font-semibold text-sm border border-gray-300 px-4 py-2">
                      Passionate
                    </th>
                    <th className="font-semibold text-sm border border-gray-300 px-4 py-2">
                      Proactive
                    </th>
                    <th className="font-semibold text-sm border border-gray-300 px-4 py-2">
                      Professional
                    </th>
                    <th className="font-semibold text-sm border border-gray-300 px-4 py-2">
                      People
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center text-sm">
                    <td className="border border-gray-300 px-4 py-2">
                      {memberFinalReport.최종_평가.업적} 점
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {memberFinalReport.최종_평가.SK_Values.Passionate} 점
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {memberFinalReport.최종_평가.SK_Values.Proactive} 점
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {memberFinalReport.최종_평가.SK_Values.Professional} 점
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {memberFinalReport.최종_평가.SK_Values.People} 점
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-blue-600">
                      {memberFinalReport.최종_평가.최종_점수} 점
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 성과 요약 */}
            <div className="mt-6 p-4 bg-blue-50/70 rounded-lg">
              <h3 className="text-md font-semibold text-blue-600 mb-2">
                성과 요약
              </h3>
              <p className="text-blue-900 text-sm leading-relaxed">
                {memberFinalReport.최종_평가.성과_요약}
              </p>
            </div>
          </section>

          {/* 분기별 업무 기여도 */}
          <section
            ref={(el: any) =>
              (sectionRefs.current['quarterly-contribution'] = el)
            }
            className="scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-gray-800  mb-6">
              분기별 업무 기여도
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr className="bg-gray-100 text-sm">
                    <th className="border border-gray-200 px-4 py-3 text-center text-md font-semibold text-gray-700 w-20">
                      분기
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center text-md font-semibold text-gray-700 w-24">
                      순위
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center text-md font-semibold text-gray-700">
                      달성률
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-md font-semibold text-gray-700">
                      실적 요약
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberFinalReport.분기별_업무_기여도.map(
                    (quarter: any, index: any) => (
                      <tr
                        key={quarter.분기}
                        className={`hover:bg-gray-50 transition-colors duration-200 
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="border border-gray-200 px-4 py-3 text-center font-medium">
                          {quarter.분기}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRankBadgeColor(
                              quarter.순위
                            )}`}
                          >
                            {quarter.순위}위
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 text-center">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                              quarter.달성률
                            )} hover:opacity-90 transition-colors duration-200`}
                          >
                            {quarter.달성률}%
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-md text-gray-600 leading-relaxed">
                          {quarter.실적_요약}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* 팀 업무 목표 및 개인 달성률 */}
          <section
            ref={(el: any) => (sectionRefs.current['team-goals'] = el)}
            className="bg-white rounded-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                개인 달성률
              </h2>
              <span className="text-xl font-bold bg-blue-100 text-blue-500 rounded-md px-4 py-2">
                {memberFinalReport.팀_업무_목표_및_개인_달성률.개인_종합_달성률}
                %
              </span>
            </div>
            {/* 업무표 */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-28 word-keep">
                      Task명
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 w-24">
                      달성률
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      핵심 Task
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      분석 코멘트
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberFinalReport.팀_업무_목표_및_개인_달성률.업무표.map(
                    (task: any, index: number) => (
                      <tr
                        key={task.Task명}
                        className={`hover:bg-gray-50 transition-colors duration-200 
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800 break-keep text-center">
                          {task.Task명}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-center">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                              task['누적_달성률_퍼센트']
                            )} hover:opacity-90 transition-colors duration-200`}
                          >
                            {task['누적_달성률_퍼센트']}%
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                          {task.핵심_Task}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600 leading-relaxed">
                          {task.분석_코멘트}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* 종합 기여 코멘트 */}
            <div className="mt-6 p-4 bg-blue-50/70 rounded-lg">
              <h4 className="text-md font-semibold text-blue-600 mb-2">
                종합 기여 코멘트
              </h4>
              <p className="text-blue-900 text-sm leading-relaxed">
                {memberFinalReport.팀_업무_목표_및_개인_달성률.종합_기여_코멘트}
              </p>
            </div>
          </section>

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
                  {memberFinalReport.Peer_Talk.강점}
                </p>
              </div>
              <div className="flex-1 p-6 bg-yellow-50/70 border-l-4 border-yellow-300 rounded-r-lg">
                <h4 className="text-md font-semibold text-yellow-800 mb-3">
                  우려
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFinalReport.Peer_Talk.우려}
                </p>
              </div>
              <div className="flex-1 p-6 bg-blue-50/70 border-l-4 border-blue-300 rounded-r-lg">
                <h4 className="text-md font-semibold text-blue-800 mb-3">
                  협업 관찰
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {memberFinalReport.Peer_Talk.협업_관찰}
                </p>
              </div>
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
                        {memberFinalReport.성장_제안_및_개선_피드백.성장_포인트.map(
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
                        {memberFinalReport.성장_제안_및_개선_피드백.보완_영역.map(
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
                        {memberFinalReport.성장_제안_및_개선_피드백.추천_활동.map(
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

          {/* 종합 코멘트 */}
          <section
            ref={(el: any) => (sectionRefs.current['comments'] = el)}
            className="bg-white rounded-xl"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              종합 코멘트
            </h2>

            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-lg border-blue-200">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center text-blue-500">
                    팀장 코멘트
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-md whitespace-pre-line">
                    {memberFinalReport.팀장_Comment}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-yellow-50/50 via-pink-50/50 to-red-50/50 rounded-lg border-blue-200">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center text-blue-600 text-blue-500">
                    종합 코멘트
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-md whitespace-pre-line">
                    {memberFinalReport.종합_Comment}
                  </p>
                </div>
              </div>
            </div>

            {/* 마지막 문구 */}
            {/* 구분선 제시 후 마지막 문구 작성 */}
            <div className="mt-20 border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-xs text-right">
                본 보고서는 SKoro AI 성과평가 시스템을 기반으로 생성되었습니다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default MemberFinalReportCmp
