import { useState, useEffect, useRef } from 'react'
import {
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Award,
  BarChart3,
  CircleCheckBig,
} from 'lucide-react'
import { SKLogoWhite } from '../../assets/common'

const TeamFinalReport: React.FC<{
  report: any
}> = ({ report }) => {
  const [activeSection, setActiveSection] = useState('basic-info')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // 실제 데이터 (예시)
  const dummyTeamFinalReport = {
    기본_정보: {
      팀명: 'W1팀',
      팀장명: '팀장A',
      업무_수행_기간: '2024년 연말',
      평가_구분: '연간 최종 평가 (Period 4)',
    },
    팀_종합_평가: {
      평균_달성률: 132,
      유사팀_평균: 64.5,
      비교_분석: '우수',
      팀_성과_분석_코멘트:
        '2023년 팀의 연간 성과는 전반적으로 우수한 결과를 나타내며, 팀 평균 달성률은 104.8%로 평가되었습니다. 특히, AI powered ITS 혁신 부문에서 175%의 성과를 기록하며 팀의 핵심 기여도를 높였습니다. Bilable Rate(가동률) 또한 102%로 안정적인 운영을 보여주었으며, 매출 부문에서는 150%의 성과를 달성하여 팀의 재무적 기여를 강화했습니다. 반면, 매출이익은 90%로 다소 아쉬운 수치를 보였으나, 전체적인 팀 성과는 132.9%에 달해 높은 수준의 조직력을 입증했습니다. 이러한 성과는 팀원 각자의 전문성과 협업을 통해 이루어진 결과로, 4명의 팀원이 각자의 역할을 충실히 수행한 것이 큰 기여를 했습니다. 팀의 종합적인 평가를 통해, 향후에도 지속적인 성과 향상을 기대할 수 있는 기반이 마련되었음을 확인할 수 있습니다.',
    },
    팀_업무_목표_및_달성률: {
      업무목표표: [
        {
          팀_업무_목표: 'AI powered ITS 혁신',
          kpi_분석_코멘트:
            '팀원들의 개별 성과를 종합적으로 분석한 결과, 전체 KPI 목표의 약 70%가 달성된 것으로 평가됩니다. 김개발님은 AI 제안서 자동 생성 기능의 50%를 완료하였고, 이설계님은 코딩 자동화 아키텍처의 75%를 설계하였습니다. 박DB님은 데이터베이스 구축의 55%를 완료하였습니다. 각 팀원들이 협업을 통해 주요 작업을 진행하고 있으나, 전체 목표 달성을 위해서는 추가적인 노력이 필요합니다.',
          달성률: 70,
          달성률_평균_전사유사팀: '',
          비교_분석: '-',
        },
        {
          팀_업무_목표: 'Bilable Rate (가동률)',
          kpi_분석_코멘트:
            '팀원들의 평균 가동률은 82%로, 목표인 85%에 미치지 못하고 있습니다. 김개발님은 가동률 개선을 위한 프로세스를 도입했으나, 이설계님은 프로젝트 리스크 감소에 집중하여 가동률에 직접적인 영향을 미치지 않았습니다. 따라서 팀 전체 KPI 달성률은 96%로 평가됩니다.',
          달성률: 96,
          달성률_평균_전사유사팀: '',
          비교_분석: '-',
        },
        {
          팀_업무_목표: '매출',
          kpi_분석_코멘트:
            '현재 팀의 KPI 달성률은 30%입니다. 김개발님은 목표한 신규 계약 2건 중 1건을 체결하여 50%의 성과를 보였으나, 이설계님은 고객 만족도 향상 목표를 10%에서 2.5%로 달성하여 25%의 성과를 기록했습니다. 전체적으로 목표 달성에 미치지 못하고 있으며, 추가 협상 및 고객 관리 개선이 필요합니다.',
          달성률: 30,
          달성률_평균_전사유사팀: '',
          비교_분석: '-',
        },
        {
          팀_업무_목표: '매출이익',
          kpi_분석_코멘트:
            '팀원들의 개별 성과를 종합적으로 분석한 결과, 이설계님은 목표의 30%를 달성하였고, 박DB님은 목표의 23.33%를 달성하였습니다. 전체적으로 팀 KPI 목표인 인당 2억의 이익 증대에 대한 달성률은 약 30%로 평가됩니다. 이는 원가 절감 및 수익성 개선을 위한 초기 단계의 성과로, 추가적인 노력과 협업이 필요합니다.',
          달성률: 30,
          달성률_평균_전사유사팀: '',
          비교_분석: '-',
        },
      ],
      전사_유사팀_비교분석_코멘트:
        '팀의 종합 달성률은 132%로, 유사팀 평균인 64.5%를 크게 초과하여 뛰어난 성과를 보여주고 있습니다. 특히, AI powered ITS 혁신과 가동률에서 높은 성과를 기록하였으나, 매출 및 매출이익은 각각 30%로 상대적으로 낮은 수치를 보이고 있습니다. 전반적으로 팀은 혁신적인 접근과 높은 가동률을 통해 성과를 극대화하고 있으나, 매출 성장에 대한 전략이 필요합니다. 향후 매출 및 이익 증대를 위한 구체적인 계획 수립이 필요할 것으로 보입니다.',
    },
    팀_성과_요약: {
      팀원별_성과_표: [
        {
          순위: 1,
          이름: '김개발',
          업적: 3.2,
          SK_Values_4P: {
            Passionate: 4.5,
            Proactive: 4.5,
            Professional: 4.5,
            People: 4.5,
          },
          최종_점수: 3.22,
          기여도: 41,
          성과_요약:
            '김개발(SK0002)님은 올해 3개의 주요 Task에 참여하여 평균 달성률 95.0%를 기록하며 팀 성과에 기여하였습니다. AI 제안서 기능 고도화와 팀 가동률 모니터링 Task에서 각각 100% 달성률을 보였으며, 기여도는 35점과 83점으로 팀 내에서 중요한 역할을 수행하였습니다. 신규 고객 발굴 Task에서는 85%의 달성률을 기록하였으나 기여도는 10점으로 상대적으로 낮았습니다. 이러한 성과를 바탕으로 팀 평균 달성률 104.8%를 초과 달성하는 데 기여하였으며, 김개발님은 팀의 핵심 기여 영역에서 두드러진 성과를 보였습니다.',
        },
        {
          순위: 2,
          이름: '이설계',
          업적: 3.2,
          SK_Values_4P: {
            Passionate: 4.5,
            Proactive: 4.5,
            Professional: 4.5,
            People: 3.5,
          },
          최종_점수: 2.81,
          기여도: 38,
          성과_요약:
            '이설계(SK0003)님은 2023년 동안 4개의 주요 Task에 참여하여 평균 달성률 94.2%와 평균 기여도 46.8점을 기록하였습니다. AI 코딩 자동화 시스템 설계에서 120%의 높은 달성률을 보이며 35점의 기여도를 기록하였습니다. 프로젝트 효율성 관리와 개발 프로세스 최적화에서는 각각 85%와 82%의 달성률을 기록하였으나, 고객 관계 관리에서는 90%의 달성률과 89점의 기여도로 긍정적인 성과를 나타냈습니다. 이러한 성과는 팀 평균 달성률 104.8%에 기여하며, 이설계님은 팀 내에서 중요한 역할을 수행하고 있습니다.',
        },
        {
          순위: 3,
          이름: '박DB',
          업적: 2.2,
          SK_Values_4P: {
            Passionate: 4.5,
            Proactive: 4.5,
            Professional: 4.5,
            People: 3.5,
          },
          최종_점수: 0.72,
          기여도: 20,
          성과_요약:
            '박DB(SK0004)님은 올해 두 가지 주요 Task에 참여하여 평균 달성률 70.5%와 평균 기여도 40.5점을 기록하였습니다. AI 시스템 데이터베이스 구축 Task에서는 81%의 달성률을 보이며 29점의 기여도를 나타냈고, 시스템 성능 최적화 Task에서는 60%의 달성률과 52점의 기여도를 기록하였습니다. 이러한 성과는 팀 평균 달성률 104.8%에 비해 낮으나, 박DB님이 기여한 영역에서의 성과는 팀 목표 달성에 중요한 역할을 했습니다. 향후 성과 개선을 위한 방향성을 제시할 수 있을 것입니다.',
        },
      ],
      평가_기준_해석_및_유의사항:
        '업적 점수는 팀 목표 대비 개인 기여도를 반영하며, SK Values (4P)는 Passionate(열정), Proactive(주도성), Professional(전문성), People(협업성)을 평가합니다. 최종 점수는 업적과 4P 점수에 CL 정규화가 적용된 값이며, 기여도는 팀 목표 달성을 위한 상대적인 기여 정도를 기준으로 합니다. 순위는 최종 점수 기준으로 정렬됩니다.',
    },
    팀_조직력_및_리스크_요인: {
      주요_리스크_목록: [
        {
          주요리스크: '과의존 리스크',
          리스크_심각도: 'high',
          리스크_설명:
            '팀원들이 특정 동료에게 과도하게 의존하고 있어, 팀의 지속 가능성과 다양성이 저해될 수 있습니다. 김개발(SK0002), 이설계(SK0003), 박DB(SK0004) 모두 서로에게 높은 의존도를 보이고 있습니다.',
          발생_원인: [
            '김개발, 이설계, 박DB가 서로의 주요 협업자로 지정되어 있어 협업이 지나치게 집중되고 있음.',
            '팀원 간의 협업 편중도가 높아 다양한 팀원과의 협업이 부족함.',
          ],
          영향_예측: [
            {
              '영향 설명':
                '지속적인 의존은 팀의 협업 효율성을 떨어뜨리고, 팀원 간의 관계가 단절될 수 있습니다.',
            },
          ],
          운영_개선_전략_제안: [
            '팀원 간의 협업을 다양화하기 위해 정기적인 팀 빌딩 활동을 실시하고, 각 팀원이 다른 팀원과의 협업 기회를 늘리도록 유도합니다.',
          ],
        },
        {
          주요리스크: '저성과자에 의한 팀 사기 저하',
          리스크_심각도: 'high',
          리스크_설명:
            '박DB(SK0004)님의 성과가 팀 평균에 비해 현저히 낮아 팀의 전반적인 사기와 분위기에 부정적인 영향을 미칠 수 있습니다.',
          발생_원인: [
            '박DB님의 평균 달성률이 70.5%로 팀 평균 104.8%에 비해 크게 부족함.',
            '박DB님의 기여도가 20%로 낮아 팀원들이 느끼는 부담감이 증가할 수 있음.',
          ],
          영향_예측: [
            {
              '영향 설명':
                '팀의 사기 저하로 인해 협업의 질이 떨어지고, 팀원 간의 신뢰가 약화될 수 있습니다.',
            },
          ],
          운영_개선_전략_제안: [
            '박DB님에게 맞춤형 멘토링과 코칭을 제공하여 성과 향상을 도모하고, 팀 내에서의 기여도를 높이기 위한 목표 설정을 지원합니다.',
          ],
        },
        {
          주요리스크: '매출이익 감소 리스크',
          리스크_심각도: 'high',
          리스크_설명:
            '매출이익 KPI의 달성률이 90%로 목표에 미치지 못하고 있으며, 이는 팀의 수익성에 부정적인 영향을 미칠 수 있습니다.',
          발생_원인: [
            '이설계와 박DB의 성과가 목표 대비 각각 81%와 60%로 낮음.',
            '이들이 담당하는 프로젝트의 수익성 개선이 필요함.',
          ],
          영향_예측: [
            {
              '영향 설명':
                '수익성 저하는 조직의 재무 상태에 부정적인 영향을 미치고, 장기적으로는 인력 감축이나 프로젝트 축소로 이어질 수 있습니다.',
            },
          ],
          운영_개선_전략_제안: [
            '이설계와 박DB에게 성과 개선을 위한 구체적인 목표를 설정하고, 성과 향상을 위한 교육 및 지원을 제공합니다.',
          ],
        },
        {
          주요리스크: '기여도 불균형 리스크',
          리스크_심각도: 'medium',
          리스크_설명:
            '팀의 평균 기여도가 43.3점으로 다소 낮아, 팀원 간의 기여도 불균형이 우려됩니다.',
          발생_원인: [
            '김개발(SK0002)과 이설계(SK0003)의 기여도가 상대적으로 높지만, 박DB(SK0004)의 기여도가 낮음.',
            '팀 내 기여도 차이가 팀의 전반적인 성과에 부정적인 영향을 미칠 수 있음.',
          ],
          영향_예측: [
            {
              '영향 설명':
                '기여도 불균형은 팀의 협업과 성과에 부정적인 영향을 미치고, 팀원 간의 갈등을 유발할 수 있습니다.',
            },
          ],
          운영_개선_전략_제안: [
            '팀원 간의 기여도를 정기적으로 평가하고, 기여도가 낮은 팀원에게는 추가적인 지원과 교육을 제공하여 기여도를 높이도록 합니다.',
          ],
        },
        {
          주요리스크: '고성과자의 번아웃 위험',
          리스크_심각도: 'medium',
          리스크_설명:
            '김개발(SK0002)님은 팀의 핵심 기여자로서 높은 성과를 내고 있으나, 지속적인 높은 기대치로 인해 번아웃의 위험이 존재합니다.',
          발생_원인: [
            '김개발님은 3개의 주요 Task에서 평균 달성률 95.0%를 기록하며 팀의 성과에 크게 기여하고 있음.',
            '지속적인 높은 성과는 개인의 스트레스와 부담을 증가시킬 수 있음.',
          ],
          영향_예측: [
            {
              '영향 설명':
                '번아웃은 김개발님의 성과 저하로 이어질 수 있으며, 이는 팀 전체에 부정적인 영향을 미칠 수 있습니다.',
            },
          ],
          운영_개선_전략_제안: [
            '김개발님에게 업무 부담을 줄이기 위해 업무 분담을 조정하고, 정기적인 휴식과 재충전 시간을 제공하여 번아웃을 예방합니다.',
          ],
        },
      ],
    },
    다음_연도_운영_제안: {
      핵심_인력_운용_전략: [
        {
          대상: '박DB(SK0004)',
          실행_방안:
            '맞춤형 멘토링 및 코칭 제공, 성과 향상을 위한 구체적인 목표 설정',
        },
        {
          대상: '김개발(SK0002)',
          실행_방안:
            '업무 부담 경감을 위한 역할 분담 조정 및 정기적인 재충전 시간 제공',
        },
        {
          대상: '이설계(SK0003)',
          실행_방안:
            '독립적인 문제 해결 능력 강화를 위한 교육 및 프로젝트 참여 기회 제공',
        },
      ],
      협업_구조_개선_방향: [
        {
          현재_문제점: '팀원 간의 과의존 리스크',
          개선_방안:
            '정기적인 팀 빌딩 활동 실시 및 다양한 팀원과의 협업 기회 확대',
          기대효과: '팀원 간의 협업 다양성 증대 및 의존도 감소',
          목표_지표: '팀원 간의 협업 편중도 20% 감소',
        },
        {
          현재_문제점: '저성과자에 의한 팀 사기 저하',
          개선_방안:
            '박DB님에게 맞춤형 멘토링과 성과 향상을 위한 목표 설정 지원',
          기대효과: '박DB님의 성과 향상으로 팀 사기 및 분위기 개선',
          목표_지표: '박DB님의 평균 달성률 80% 이상 달성',
        },
        {
          현재_문제점: '기여도 불균형 리스크',
          개선_방안:
            '정기적인 기여도 평가 및 기여도가 낮은 팀원에게 추가 지원 제공',
          기대효과: '팀 전체 기여도 향상 및 협업의 질 개선',
          목표_지표: '팀 평균 기여도 50점 이상 달성',
        },
      ],
    },
    총평: {
      종합_의견:
        "**[팀 성과 방향]**  \nW1팀은 연간 평균 달성률 132%를 기록하며 우수한 성과를 달성했습니다. 특히, 'AI powered ITS 혁신' KPI에서 175%의 진행률을 보이며 팀의 혁신 역량을 입증했습니다. 그러나 전년 대비 성장률이 없다는 점은 향후 지속적인 성장을 위해 해결해야 할 과제로 남아 있습니다. 이러한 성과는 팀의 전략적 방향성과 성과 창출 능력을 강화하는 데 기여하고 있습니다.\n\n**[구조적 인식]**  \nW1팀의 조직적 강점은 높은 평균 달성률과 중간평가 평균 3.5점으로 나타나는 팀원 간의 협력과 성과 지향적인 문화입니다. 그러나 '저성과자에 의한 팀 사기 저하'와 '기여도 불균형 리스크'는 팀의 사기와 효율성을 저해할 수 있는 구조적 도전과제로, 이를 해결하지 않으면 지속 가능한 성장에 부정적인 영향을 미칠 수 있습니다. 따라서 팀의 성과를 극대화하기 위해서는 이러한 리스크를 관리하는 것이 필수적입니다.\n\n**[향후 운영 전략]**  \n차년도 계획은 아직 구체화되지 않았으나, W1팀은 '매출이익 감소 리스크'를 해결하기 위해 매출이익 KPI의 진행률을 90%에서 최소 120%로 끌어올리는 것을 목표로 설정해야 합니다. 이를 위해 팀원 간의 역할 분담을 명확히 하고, 저성과자에 대한 맞춤형 지원 프로그램을 도입하여 팀 전체의 사기를 높이는 전략을 추진할 필요가 있습니다. 또한, 고성과자의 번아웃 위험을 방지하기 위해 업무 분담의 균형을 맞추고, 정기적인 피드백 세션을 통해 팀원들의 의견을 수렴하는 것이 중요합니다.",
    },
  }
  const teamFinalReport = report || dummyTeamFinalReport

  const tableOfContents = [
    { id: 'basic-info', title: '기본 정보', icon: Users },
    { id: 'overall-evaluation', title: '팀 종합 평가', icon: BarChart3 },
    { id: 'goals-achievement', title: '팀 업무 목표 및 달성률', icon: Target },
    { id: 'performance-summary', title: '팀 성과 요약', icon: Award },
    { id: 'risks', title: '팀 조직력 및 리스크 요인', icon: AlertTriangle },
    { id: 'next-year', title: '다음 연도 운영 제안', icon: TrendingUp },
    { id: 'conclusion', title: '총평', icon: CheckCircle },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: number) => {
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const getComparisonBadge = (analysis: string) => {
    if (analysis !== '우수' && analysis !== '미흡' && analysis !== '-')
      return null
    const config = {
      우수: { color: 'bg-green-50 text-green-800', icon: CheckCircle },
      미흡: { color: 'bg-red-50 text-red-800', icon: XCircle },
      '-': { color: 'bg-gray-100 text-gray-600', icon: null },
    }
    const { color, icon: Icon } = config[analysis] || config['-']

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${color}`}
      >
        {Icon && <Icon className="w-4 h-4 mr-1" />}
        {analysis}
      </span>
    )
  }

  const getRiskSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50/50 border-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-50/50 border-orange-100 text-orange-800'
      case 'low':
        return 'bg-green-50/50 border-green-100 text-green-800'
      default:
        return 'bg-gray-50/50 border-gray-100 text-gray-800'
    }
  }

  // 달성률에 따른 색상 반환
  const getAchievementColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (rate >= 80) return 'text-blue-400 bg-blue-50 border-blue-200'
    if (rate >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    if (rate === 0) return 'text-gray-600 bg-gray-50 border-gray-200'
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
    <section className="h-full">
      <div className="flex h-full flex-col">
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
        <div className="flex-1 min-h-0 overflow-auto SKoro-report-section shadow-md bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 flex w-full justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {teamFinalReport['기본_정보']['팀명']} 성과 리포트
              </h1>
              <p className="text-md text-blue-100">
                {teamFinalReport['기본_정보']['평가_구분']} •{' '}
                {teamFinalReport['기본_정보']['업무_수행_기간']}
              </p>
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
                  <p className="text-sm text-gray-600 mb-1">팀명</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {teamFinalReport['기본_정보']['팀명']}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">팀장명</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {teamFinalReport['기본_정보']['팀장명']}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">업무 수행 기간</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {teamFinalReport['기본_정보']['업무_수행_기간']}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">평가 구분</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {teamFinalReport['기본_정보']['평가_구분']}
                  </p>
                </div>
              </div>
            </div>

            {/* 팀 종합 평가 */}
            <div
              id="overall-evaluation"
              ref={(el: any) =>
                (sectionRefs.current['overall-evaluation'] = el)
              }
              className="bg-white"
            >
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  팀 종합 평가
                </h2>
              </div>

              {/* 종합 평가 테이블 */}
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="font-semibold border border-gray-300 px-4 py-2 w-2/5">
                      평균 달성률
                    </th>
                    <th className=" w-2/5 font-semibold border border-gray-300 px-4 py-2">
                      유사팀 평균
                    </th>
                    <th className="w-2/5 font-semibold border border-gray-300 px-4 py-2">
                      비교 분석
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center text-sm">
                    <td className="border border-gray-300 px-4 py-2">
                      <span className={`px-3 py-1 rounded-full font-bold`}>
                        {teamFinalReport['팀_종합_평가']['평균_달성률']}%
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className="font-bold text-gray-700">
                        {teamFinalReport['팀_종합_평가']['유사팀_평균']}%
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span className="px-3 py-1">
                        {getComparisonBadge(
                          teamFinalReport['팀_종합_평가']['비교_분석']
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6 p-4 bg-blue-50/70 rounded-lg">
                <h4 className="text-md font-semibold text-blue-600 mb-2">
                  팀 성과 분석 코멘트
                </h4>
                <p className="text-blue-900 text-sm leading-relaxed">
                  {teamFinalReport['팀_종합_평가']['팀_성과_분석_코멘트']}
                </p>
              </div>
            </div>

            {/* 팀 업무 목표 및 달성률 */}
            <div
              id="goals-achievement"
              ref={(el: any) => (sectionRefs.current['goals-achievement'] = el)}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                팀 업무 목표 및 달성률
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-100 text-sm">
                    <tr>
                      <th className="border border-gray-200 px-4 py-3 text-center text-md font-semibold text-gray-700 w-40">
                        팀 업무 목표
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center text-md font-semibold text-gray-700">
                        달성률
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center text-md font-semibold text-gray-700 w-28">
                        전사 유사팀 평균
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center text-md font-semibold text-gray-700">
                        비교 분석
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center text-md font-semibold text-gray-700">
                        KPI 분석 코멘트
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamFinalReport['팀_업무_목표_및_달성률'][
                      '업무목표표'
                    ].map((goal: any, index: any) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 transition-colors duration-200 
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="border border-gray-200 px-4 py-3 text-center font-medium">
                          <div className="text-sm whitespace-nowrap font-medium">
                            {goal['팀_업무_목표']}
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-center whitespace-nowrap text-center place-items-center">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                              goal['달성률']
                            )} hover:opacity-90 transition-colors duration-200`}
                          >
                            {goal['달성률']}%
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-center whitespace-nowrap text-center place-items-center">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                              goal['달성률_평균_전사유사팀']
                                ? Number(goal['달성률_평균_전사유사팀'])
                                : 0
                            )} hover:opacity-90 transition-colors duration-200`}
                          >
                            {goal['달성률_평균_전사유사팀'] || '-'}
                            {goal['달성률_평균_전사유사팀'] && '%'}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-center whitespace-nowrap text-center place-items-center">
                          {getComparisonBadge(goal['비교_분석'])}
                        </td>
                        <td className="border border-gray-200 px-4 py-3">
                          <div className="text-sm text-gray-700">
                            {goal['kpi_분석_코멘트']}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50/70 rounded-lg">
                <h4 className="text-md font-semibold text-blue-600 mb-2">
                  전사 유사팀 비교분석 코멘트
                </h4>
                <p className="text-blue-900 text-sm leading-relaxed">
                  {
                    teamFinalReport['팀_업무_목표_및_달성률'][
                      '전사_유사팀_비교분석_코멘트'
                    ]
                  }
                </p>
              </div>
            </div>

            {/* 팀 성과 요약 */}
            <div
              id="performance-summary"
              ref={(el: any) =>
                (sectionRefs.current['performance-summary'] = el)
              }
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                팀 성과 요약
              </h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-center">
                        순위
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-center">
                        이름
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-center">
                        업적
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-center bg-red-100 text-red-400">
                        SK Values (4P)
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-center">
                        최종 점수
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-center">
                        기여도
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamFinalReport['팀_성과_요약']['팀원별_성과_표'].map(
                      (member: any, index: any) => (
                        <tr
                          key={index}
                          className={`
                            hover:bg-gray-50 transition-colors duration-200
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          `}
                        >
                          <td className="border border-gray-200 font-medium text-gray-700 items-center place-items-center justify-center whitespace-nowrap">
                            <div
                              className={`w-[fit-content] px-3 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${getRankBadgeColor(
                                member.순위
                              )}`}
                            >
                              {member['순위']}위
                            </div>
                          </td>
                          <td className="border border-gray-200 font-medium text-center text-gray-700">
                            <div className="text-sm font-medium text-gray-900">
                              {member['이름']}
                            </div>
                          </td>
                          <td className="border border-gray-200 font-medium text-center text-gray-700 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {member['업적']}
                            </div>
                          </td>
                          <td className="font-semibold border border-gray-200 text-center bg-red-50/50 text-gray-700 whitespace-nowrap py-3">
                            <div className="grid grid-cols-2 gap-1">
                              <div>
                                <span className="font-semibold text-red-400/90">
                                  Passionate:
                                </span>{' '}
                                {member['SK_Values_4P']['Passionate']}
                              </div>
                              <div>
                                <span className="font-semibold text-red-400/90">
                                  Proactive:
                                </span>{' '}
                                {member['SK_Values_4P']['Proactive']}
                              </div>
                              <div>
                                <span className="font-semibold text-red-400/90">
                                  Professional:
                                </span>{' '}
                                {member['SK_Values_4P']['Professional']}
                              </div>
                              <div>
                                <span className="font-semibold text-red-400/90">
                                  People:
                                </span>{' '}
                                {member['SK_Values_4P']['People']}
                              </div>
                            </div>
                          </td>
                          <td className="border border-gray-200 font-medium text-center text-gray-700 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">
                              {member['최종_점수']}
                            </div>
                          </td>
                          <td className="border border-gray-200 font-medium text-center text-gray-700 whitespace-nowrap">
                            <div className="text-sm font-semibold text-blue-600">
                              {member['기여도']}%
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* 개별 성과 요약 */}
              <div className="space-y-4">
                {teamFinalReport['팀_성과_요약']['팀원별_성과_표'].map(
                  (member: any, index: any) => (
                    <div className="mt-6 p-4 bg-gray-50/70 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CircleCheckBig className="w-5 h-5 text-gray-600" />
                        <h4 className="text-md font-semibold text-gray-600">
                          {member['이름']} 성과 요약
                        </h4>
                      </div>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {member['성과_요약']}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* 팀 조직력 및 리스크 요인 */}
            <div
              id="risks"
              ref={(el: any) => (sectionRefs.current['risks'] = el)}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                팀 조직력 및 리스크 요인
              </h2>

              {teamFinalReport['팀_조직력_및_리스크_요인'][
                '주요_리스크_목록'
              ].map((risk: any, index: any) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 border mb-6 ${getRiskSeverityColor(
                    risk['리스크_심각도']
                  )}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {risk.주요리스크}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        risk['리스크_심각도'] === 'high'
                          ? 'bg-red-200 text-red-800'
                          : risk['리스크_심각도'] === 'medium'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {risk['리스크_심각도']}
                    </span>
                  </div>

                  <table>
                    <tbody className="text-sm text-gray-800">
                      <tr>
                        <td className="py-2 font-semibold">리스크 설명</td>
                        <td className="py-2">{risk['리스크_설명']}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">발생 원인</td>
                        <td className="py-2">
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {risk['발생_원인'].map((cause: any, idx: any) => (
                              <li key={idx}>{cause}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">영향 예측</td>
                        <td className="py-2">
                          {risk['영향_예측'].map((impact: any, idx: number) => (
                            <div key={idx} className="">
                              {impact['영향 설명']}
                            </div>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-8 py-2 font-semibold whitespace-nowrap">
                          운영 개선 전략 제안
                        </td>
                        <td className="py-2">
                          {risk['운영_개선_전략_제안'].map(
                            (strategy: any, strategyIndex: any) => (
                              <li key={strategyIndex}>{strategy}</li>
                            )
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* 다음 연도 운영 제안 */}
            <div
              id="next-year"
              ref={(el: any) => (sectionRefs.current['next-year'] = el)}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                다음 연도 운영 제안
              </h2>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  핵심 인력 운용 전략
                </h3>

                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-center w-48">
                        대상
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        실행 방안
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamFinalReport['다음_연도_운영_제안'][
                      '핵심_인력_운용_전략'
                    ].map((strategy: any, index: any) => (
                      <tr
                        key={index}
                        className={`
                          hover:bg-gray-50 transition-colors duration-200
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        `}
                      >
                        <td className="border border-gray-200 font-medium text-center text-gray-700">
                          {strategy['대상']}
                        </td>
                        <td className="border border-gray-200 p-4">
                          {strategy['실행_방안']}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  협업 구조 개선 방향
                </h3>

                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-48">
                        현재 문제점
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        개선 방안
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        기대 효과
                      </th>
                      <th className="border border-gray-200 px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        목표 지표
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamFinalReport['다음_연도_운영_제안'][
                      '협업_구조_개선_방향'
                    ].map((direction: any, index: any) => (
                      <tr
                        key={index}
                        className={`
                          hover:bg-gray-50 transition-colors duration-200
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        `}
                      >
                        <td className="border border-gray-200 p-4 font-semibold">
                          {direction['현재_문제점']}
                        </td>
                        <td className="border border-gray-200 p-4">
                          {direction['개선_방안']}
                        </td>
                        <td className="border border-gray-200 p-4">
                          {direction['기대효과']}
                        </td>
                        <td className="border border-gray-200 p-4">
                          {direction['목표_지표']}
                        </td>
                      </tr>
                    ))}
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
                    {teamFinalReport['총평']['종합_의견']
                      .split('\n')
                      .map((line: string, index: number) => (
                        <p key={index} className={index > 0 ? 'mt-4' : ''}>
                          {line
                            .split(/(\*\*.*?\*\*)/)
                            .map((part: string, partIndex: number) => {
                              if (
                                part.startsWith('**') &&
                                part.endsWith('**')
                              ) {
                                return (
                                  <strong key={partIndex}>
                                    {part.slice(2, -2)}
                                  </strong>
                                )
                              }
                              return part
                            })}
                        </p>
                      ))}
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
      </div>
    </section>
  )
}

export default TeamFinalReport
