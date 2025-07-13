import { useState, useEffect, useRef } from 'react'
import {
  ChevronRight,
  Users,
  Target,
  TrendingUp,
  FileText,
  Award,
  MessageSquare,
  CircleCheckBig,
  CheckCheck,
} from 'lucide-react'
import { SKLogoWhite } from '../../assets/common'

const TeamTemporaryReport = () => {
  const [activeSection, setActiveSection] = useState('basic-info')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const teamTemporaryReport = {
    기본_정보: {
      팀명: 'W1팀',
      팀장명: '팀장A',
      업무_수행_기간: '2024년 연말',
    },
    팀원_평가_요약표: {
      표: [
        {
          이름: '김개발(SK0002)',
          AI_추천_점수: 3.72,
          총_Task_수: 3,
          협업률: '100.0%',
          핵심_협업자: ['이설계(SK0003)', '박DB(SK0004)'],
          팀_내_역할:
            'AI 제안서 시스템 개발 | 핵심 개발자, 팀 가동률 관리 | 조율자, 신규 고객 발굴 | 기획 리더',
          Peer_Talk_평가: 'AI 제안서 자동 생성 완성, 부정적 피드백 없음',
          협업_편중도: '높음(과의존 위험)',
          종합_평가:
            '김개발(SK0002)은 팀 내에서 리더형 협업 스타일을 보이며, AI 제안서 시스템 개발과 신규 고객 발굴에 있어 높은 기여도를 나타내고 있습니다. 그러나 협업 편중도가 높아 과의존 위험이 있으므로, 다양한 팀원과의 협업을 통해 균형 잡힌 협업을 강화하는 것이 필요합니다.',
        },
        {
          이름: '이설계(SK0003)',
          AI_추천_점수: 3.62,
          총_Task_수: 4,
          협업률: '100.0%',
          핵심_협업자: ['김개발(SK0002)', '박DB(SK0004)'],
          팀_내_역할:
            'AI 코딩 자동화 시스템 아키텍처 설계 | 기획 리더, 프로젝트 관리 체계 구축 | 기획 리더, 고객 만족도 관리 | 기획 리더, 개발 원가 관리 | 기획 리더',
          Peer_Talk_평가: 'AI 아키텍처 설계 능력, 비판적 피드백 수용 어려움',
          협업_편중도: '높음(과의존 위험)',
          종합_평가:
            '이설계(SK0003)는 기획 리더로서 팀 내에서 높은 협업률을 보이며, 프로젝트 관리와 고객 만족도 관리에 기여하고 있습니다. 그러나 협업 편중도가 높아 김개발(SK0002)과 박DB(SK0004)에 과의존하는 경향이 있어, 독립적인 문제 해결 능력을 강화하는 것이 필요합니다. 팀 기여도는 높으나, 다양한 협업자와의 균형 잡힌 협업을 통해 더욱 발전할 수 있을 것입니다.',
        },
        {
          이름: '박DB(SK0004)',
          AI_추천_점수: 3.02,
          총_Task_수: 2,
          협업률: '100.0%',
          핵심_협업자: ['김개발(SK0002)', '이설계(SK0003)'],
          팀_내_역할: 'AI 데이터베이스 시스템 관리 | 운영비 최적화',
          Peer_Talk_평가: '책임감과 성실함, 소통 개선 필요',
          협업_편중도: '높음(과의존 위험)',
          종합_평가:
            '박DB(SK0004) 직원은 리더형 협업 스타일을 보이며, 팀 내에서 높은 기여도를 나타내고 있습니다. 그러나 협업 편중도가 높아 과의존 위험이 있으므로, 다양한 팀원과의 협업을 통해 균형 잡힌 협업 네트워크를 구축하는 것이 필요합니다.',
        },
      ],
      팀_협업_요약:
        '팀의 전반적인 협업 현황은 매우 긍정적이며, 전체 평균 협업률이 100%에 달하는 것은 팀원 간의 원활한 소통과 협력이 이루어지고 있음을 나타냅니다. 그러나 기여도가 평균 43.3점으로 다소 낮고, 특히 김개발, 이설계, 박DB 세 명의 팀원이 과의존 위험에 처해 있는 점은 우려스러운 부분입니다. 이들은 팀의 핵심 역할을 맡고 있지만, 지나치게 의존하는 경향이 있어 장기적으로 팀의 지속 가능성과 다양성을 저해할 수 있습니다. 따라서, 이들의 역할을 분산시키고 다른 팀원들의 참여를 유도하는 방안을 모색하는 것이 필요하며, 이를 통해 팀의 전반적인 기여도를 높이고 협업의 균형을 맞출 수 있을 것입니다.',
      협업률_설명:
        '개인이 수행한 전체 업무 중, 다른 팀원과 실제로 협업한 업무가 차지하는 비율입니다.',
      협업_편중도_설명:
        '특정 동료에게만 협업이 쏠려있는지, 혹은 여러 동료와 고르게 협업하는지를 나타내는 지표입니다.',
    },
    팀원별_평가_근거: [
      {
        기본_내용: {
          이름: '김개발',
          직무: 'Backend Engineer',
          CL_레벨: 'CL3',
        },
        AI_점수_산출_기준: {
          업적: {
            점수: 3.2,
            실적_요약:
              '김개발(SK0002)님은 3개의 주요 Task에 참여하여 평균 달성률 95.0%를 기록하며 팀 성과에 기여하였습니다. AI 제안서 기능 고도화와 팀 가동률 모니터링 Task에서 각각 100% 달성률을 보였고, 기여도는 35점과 83점으로 중요한 역할을 수행하였습니다. 신규 고객 발굴 Task에서는 85% 달성률을 기록하였으나 기여도는 10점으로 낮았습니다. 이러한 성과는 팀 평균 달성률 104.8% 초과 달성에 기여하였으며, 향후 지속적인 성과 향상을 기대할 수 있는 기반을 마련하였습니다.',
          },
          SK_Values: {
            Passive: {
              점수: 4.5,
              평가_근거:
                '김개발은 다양한 프로젝트에서 주도적으로 역할을 수행하며, 목표를 초과 달성하는 성과를 지속적으로 보여주었습니다. 특히, AI 제안서 시스템 개발과 팀 가동률 향상에 기여하며, 협업을 통해 긍정적인 결과를 도출했습니다. 이러한 성과는 그의 높은 주인의식과 열정적인 업무 태도를 반영합니다.',
            },
            Proactive: {
              점수: 4.5,
              평가_근거:
                '김개발은 팀의 생산성 향상과 신규 고객 확보를 위해 능동적으로 문제를 분석하고 해결책을 제시했습니다. 특히, AI 제안서 자동 생성 시스템 개발과 가동률 개선을 통해 팀의 효율성을 크게 향상시켰으며, 고객 발굴 체계를 정착시켜 영업 성과를 높였습니다. 이러한 성과는 김개발이 주도적으로 혁신적인 아이디어를 실행하고, 팀의 변화를 이끌어낸 결과입니다.',
            },
            Professional: {
              점수: 4.5,
              평가_근거:
                '김개발은 AI 제안서 자동 생성 시스템의 핵심 개발자로서 요구사항 분석과 알고리즘 설계에 기여하며, 팀의 생산성 향상에 중요한 역할을 했습니다. 또한, 팀 가동률을 효과적으로 분석하고 개선하여 목표를 초과 달성하였으며, 신규 고객 발굴 및 계약 체결에서도 뛰어난 성과를 보였습니다. 이러한 성과들은 그의 전문성이 높고, 팀 내에서 기술과 지식을 효과적으로 전파하고 있다는 것을 보여줍니다.',
            },
            People: {
              점수: 4.5,
              평가_근거:
                '김개발은 팀워크를 극대화하고, 동료들과의 협업을 통해 팀의 목표 달성에 크게 기여했습니다. 특히, 다양한 프로젝트에서 주도적인 역할을 수행하며 팀의 결속력을 강화하고, 긍정적인 소통을 통해 팀 분위기를 이끌어갔습니다. 그러나 협업 편중도가 높아 다양한 팀원과의 협업을 통해 균형 잡힌 협업을 지향할 필요가 있습니다.',
            },
          },
          종합_원점수: 3.72,
          AI_추천_점수_CL_정규화: 3.72,
          평가_근거_요약:
            '김개발(SK0002)님은 3개의 주요 Task에 참여하여 평균 달성률 95.0%를 기록하였으며, 달성률 점수는 3.2점으로 B등급에 해당합니다. AI 제안서 기능 고도화와 팀 가동률 모니터링 Task에서 각각 100% 달성률을 기록하여 팀 내에서 중요한 역할을 수행하였습니다. 4P 평가에서는 Passionate, Proactive, Professional, People 모두 4.5점을 기록하여 총 평균 4.5점으로 매우 우수한 성과를 나타냈습니다. 최종 정규화 점수는 3.72점으로, 팀 내 CL3 기준에 따라 원시 점수를 유지하였습니다.',
        },
        연간_핵심_성과_기여도: {
          Task_표: [
            {
              Task명: 'AI 제안서 기능 고도화 개발',
              핵심_Task:
                'AI 제안서 자동 생성 기능 100% 완성. 실제 업무에 적용하여 제안서 작성 시간 42% 단축. 이설계님과 운영 가이드, 박DB님과 데이터 관리 협업 완료.',
              누적_달성률_퍼센트: 100,
              분석_코멘트:
                '2023년 팀은 평균 104.8%의 성과 달성률을 기록하며, 김개발(SK0002)님은 AI 제안서 자동 생성 기능을 100% 완성하여 제안서 작성 시간을 42% 단축하는 성과를 이루었습니다. 이설계님과의 협업을 통해 팀의 시너지를 극대화하였으며, 김개발님은 35점의 기여도를 기록하며 팀 목표 달성에 중대한 역할을 하였습니다.',
            },
            {
              Task명: '팀 가동률 모니터링 및 개선',
              핵심_Task:
                '팀 평균 가동률 86% 목표 초과 달성. 지속적인 모니터링 및 개선 체계 완전 구축. 이설계님과 유지 전략, 박DB님과 모니터링 시스템 협업 완료.',
              누적_달성률_퍼센트: 100,
              분석_코멘트:
                '2023년 팀은 평균 104.8%의 성과 달성률을 기록하며 지속적인 성장 추이를 보였습니다. 김개발(SK0002)님은 팀 평균 가동률 목표인 85%를 초과 달성하여 86%를 기록하였으며, 이는 팀 성과에 긍정적인 영향을 미쳤습니다. 김개발님은 이설계님과의 협업을 통해 지속적인 모니터링 체계를 구축하였고, 기여도는 83점으로 팀의 목표 달성에 중요한 역할을 하였습니다.',
            },
            {
              Task명: '신규 고객 발굴 및 영업 지원',
              핵심_Task:
                '신규 계약 총 1.8건 체결 완료(총 6.5억원 규모). 신규 고객 발굴 체계 정착. 이설계님과 추천 시스템, 박DB님과 성과 분석 협업 완료.',
              누적_달성률_퍼센트: 85,
              분석_코멘트:
                '2023년 김개발(SK0002)님은 신규 고객 발굴 및 영업 지원 분야에서 1.8건의 신규 계약을 체결하며 6.5억원 규모의 성과를 달성했습니다. 이는 팀 평균 달성률 104.8%에 비해 85%의 달성률을 기록한 것으로, 목표에 근접한 성과를 보여줍니다. 이설계님과의 협업을 통해 신규 고객 발굴 체계를 정착시키는 데 기여하였습니다.',
            },
          ],
          개인_종합_달성률: 76,
          종합_기여_코멘트:
            '김개발(SK0002)님은 올해 총 3개의 Task에 참여하여 평균 달성률 76.7%와 평균 기여도 44.0점을 기록하였습니다. 특히, AI 제안서 기능 고도화 개발에서 85%의 달성률을 보이며 33점의 기여도를 나타냈고, 팀 가동률 모니터링 및 개선 Task에서는 95%의 높은 달성률과 85점의 기여도로 팀에 중요한 기여를 하였습니다. 반면, 신규 고객 발굴 및 영업 지원 Task에서는 50%의 달성률과 14점의 기여도로 상대적으로 낮은 성과를 보였습니다. 이러한 성과를 통해 김개발님은 팀 평균 달성률 92.0%에 비해 다소 낮은 성과를 기록하였으나, 가동률 개선에 대한 기여는 두드러진 점으로 평가됩니다. 현재 역량은 특정 Task에서의 높은 성과와 낮은 성과가 혼재되어 있으며, 향후 성장 포인트로는 신규 고객 발굴 및 영업 지원 분야에서의 개선이 필요할 것으로 보입니다.',
        },
        Peer_Talk: {
          강점: '해당 직원은 AI 제안서 자동 생성 기능의 85% 완성을 주도하며, 열정적이고 주도적인 자세로 프로젝트를 이끌었습니다. 능동적으로 통합 테스트와 성능 최적화를 진행하여 프로젝트의 완성도를 높이는 데 기여했습니다.',
          우려: '현재 분석된 데이터에서는 특별한 우려사항이 발견되지 않았습니다.',
          협업_관찰:
            '해당 직원은 이설계님과의 성능 튜닝 및 박DB님과의 DB 최적화 협업을 통해 문제해결력을 발휘하였으며, 신뢰할 수 있는 열린 소통으로 팀워크를 향상시켰습니다.',
        },
      },
      {
        기본_내용: {
          이름: '이설계',
          직무: 'Solution Architect',
          CL_레벨: 'CL3',
        },
        AI_점수_산출_기준: {
          업적: {
            점수: 3.2,
            실적_요약:
              '이설계(SK0003)님은 4개의 주요 Task에 참여하여 평균 달성률 94.2%와 평균 기여도 46.8점을 기록하였습니다. AI 코딩 자동화 시스템 설계에서 120%의 높은 달성률을 보이며 35점의 기여도를 기록하였고, 고객 관계 관리 Task에서는 90%의 달성률과 89점의 기여도를 나타냈습니다. 이러한 성과는 팀 평균 달성률 104.8%에 기여하며, 이설계님은 팀 내에서 중요한 역할을 수행하고 있습니다.',
          },
          SK_Values: {
            Passive: {
              점수: 4.5,
              평가_근거:
                '이설계는 다양한 프로젝트에서 주인의식을 가지고 적극적으로 업무를 추진하며, 팀원들과의 협업을 통해 뛰어난 성과를 달성했습니다. 특히, 리스크 관리와 고객 만족도 개선에서의 성과는 그의 열정과 헌신을 잘 보여줍니다. 또한, 반복적인 업무를 자동화하여 효율성을 높이는 데 기여한 점도 긍정적입니다.',
            },
            Proactive: {
              점수: 4.5,
              평가_근거:
                '이설계는 반복적인 문제를 능동적으로 해결하기 위해 AI 코딩 자동화 시스템을 도입하고, 리스크 관리 및 고객 만족도 개선을 위한 체계적인 접근을 통해 조직의 효율성을 높이는 데 기여했습니다. 이러한 성과는 단순한 문제 해결을 넘어, 미래의 비즈니스 기회를 창출하고 조직의 방향성을 제시하는 데 중요한 역할을 했습니다.',
            },
            Professional: {
              점수: 4.5,
              평가_근거:
                '이설계는 다양한 프로젝트에서 리더십을 발휘하며, 기술적 전문성을 바탕으로 팀의 생산성과 고객 만족도를 크게 향상시켰습니다. 특히, AI 코딩 자동화 시스템과 리스크 관리 시스템 구축에서 보여준 성과는 그의 전문성을 잘 나타냅니다. 또한, 동료들과의 협업을 통해 복잡한 문제를 효과적으로 해결하고, 팀의 전반적인 전문성 향상에 기여했습니다.',
            },
            People: {
              점수: 3.5,
              평가_근거:
                '이설계는 팀 프로젝트에 적극적으로 참여하고, 동료들과의 협업을 통해 팀 목표 달성에 기여하고 있습니다. 그러나 감정적이고 방어적인 태도로 인해 팀원들과의 원활한 소통에 어려움을 겪고 있으며, 이는 팀워크에 부정적인 영향을 미칠 수 있습니다. 따라서 원활한 소통과 상호 존중을 기반으로 한 협업이 필요합니다.',
            },
          },
          종합_원점수: 3.62,
          AI_추천_점수_CL_정규화: 3.62,
          평가_근거_요약:
            '이설계(SK0003)님은 4개의 주요 Task에 참여하여 평균 달성률 94.2%를 기록하였으며, 이는 B등급에 해당합니다. AI 코딩 자동화 시스템 설계에서 120%의 높은 달성률을 보이며 35점의 기여도를 기록하였습니다. 고객 관계 관리 Task에서는 90%의 달성률과 89점의 기여도를 나타냈습니다. 4P 평가 결과에서 Passionate, Proactive, Professional 모두 4.5점을 기록하였고, People 항목에서 3.5점을 기록하여 팀 내 협업에서의 개선이 필요함을 시사합니다.',
        },
        연간_핵심_성과_기여도: {
          Task_표: [
            {
              Task명: 'AI 코딩 자동화 시스템 설계',
              핵심_Task:
                'AI 코딩 자동화 시스템 아키텍처 설계 100% 완료. 구현 가이드 및 개발 표준 수립. 김개발님과 표준 가이드, 박DB님과 데이터 정책 협업 완료.',
              누적_달성률_퍼센트: 120,
              분석_코멘트:
                '2023년 팀은 연간 목표 달성률 104.8%를 기록하며 안정적인 성장을 이어갔습니다. 이설계(SK0003)님은 AI 코딩 자동화 시스템 아키텍처 설계를 100% 완료하고, 팀의 성과에 크게 기여하였습니다. 김개발님과의 협업을 통해 표준 가이드를 성공적으로 정립하며 팀의 전반적인 기여도를 높였습니다.',
            },
            {
              Task명: '프로젝트 효율성 관리',
              핵심_Task:
                '프로젝트 지연 리스크 17% 감소 목표 달성. 효율적인 프로젝트 관리 체계 정착. 김개발님과 통합 관리, 박DB님과 모니터링 협업 완료.',
              누적_달성률_퍼센트: 85,
              분석_코멘트:
                '2023년 팀은 평균 104.8%의 성과 달성률을 기록하며, 이설계(SK0003)님은 프로젝트 지연 리스크를 20% 감소시키는 목표를 설정하고, 실제로 17% 감소를 달성하여 목표에 근접한 성과를 보였습니다. 김개발님과의 통합 관리 및 박DB님과의 협업을 통해 효율적인 프로젝트 관리 체계를 정착시켰습니다.',
            },
            {
              Task명: '고객 관계 관리 및 만족도 향상',
              핵심_Task:
                '고객 만족도 8.2% 향상 목표 달성. 고객 관계 관리 체계 완전 정착. 김개발님과 자동화 시스템, 박DB님과 예측 모델 협업 완료.',
              누적_달성률_퍼센트: 90,
              분석_코멘트:
                '2023년 이설계(SK0003)님은 고객 관계 관리 및 만족도 향상 목표를 설정하고, 고객 만족도를 10% 향상시키기 위해 노력하였습니다. 고객 만족도는 8.2% 향상되어 목표 달성률 90%를 기록하였으며, 이는 팀 평균 달성률 104.8%에 비해 다소 낮은 수치입니다. 김개발님과의 협업을 통해 고객 관계 관리 체계를 정착시키는 데 기여하였습니다.',
            },
            {
              Task명: '개발 프로세스 최적화를 통한 원가 절감',
              핵심_Task:
                '개발 원가 8.1% 절감 목표 달성. 효율적인 개발 프로세스 완전 정착. 김개발님과 AI 지원 체계, 박DB님과 모니터링 시스템 협업 완료.',
              누적_달성률_퍼센트: 82,
              분석_코멘트:
                '2023년 팀은 연간 목표 달성률 104.8%를 기록하며 긍정적인 성장 추이를 보였습니다. 이설계(SK0003)님은 개발 프로세스 최적화를 통해 원가 절감 목표 10% 중 8.1%를 달성하며, 효율적인 개발 프로세스를 정착시켰습니다. 김개발님과의 협업을 통해 팀의 기여도를 높였습니다.',
            },
          ],
          개인_종합_달성률: 71,
          종합_기여_코멘트:
            '이설계(SK0003)님은 Solution Architect로서 다양한 프로젝트에 참여하여 전체 평균 달성률 70.8%와 평균 기여도 45.0점을 기록하였습니다. 특히 AI 코딩 자동화 시스템 설계에서 98%의 높은 달성률을 보이며 37점의 기여도를 달성한 것은 주목할 만한 성과입니다. 그러나 프로젝트 효율성 관리와 고객 관계 관리에서 각각 70%와 50%의 달성률을 기록하며 개선이 필요한 부분이 드러났습니다. 개발 프로세스 최적화를 통한 원가 절감에서도 65%의 달성률을 보였으나, 기여도는 44점으로 상대적으로 낮은 편입니다. 이설계님은 4개의 Task에 참여하며 팀 평균 달성률 92.0%에 비해 다소 낮은 성과를 보였으나, AI 코딩 자동화 시스템 설계에서의 성과는 향후 성장 포인트로 작용할 수 있습니다. 현재 역량 평가에서 이설계님은 특정 분야에서 뛰어난 성과를 보였으나, 전반적인 프로젝트 관리 및 고객 관계 개선에 대한 추가적인 노력이 필요합니다.',
        },
        Peer_Talk: {
          강점: '해당 직원은 AI 코딩 자동화 아키텍처 설계의 대부분을 꼼꼼하게 완료하고, 프로토타입 구현 및 검증을 성공적으로 수행했습니다. 또한, 코드 생성 엔진과 저장소 시스템 협업에서 리더십을 발휘하며 의사결정 과정에서 감정적인 반응을 잘 관리하여 업무 스트레스를 효과적으로 극복하는 능력을 보여주었습니다.',
          우려: '해당 직원은 AI 코딩 자동화 아키텍처 설계와 프로토타입 구현 과정에서 감정적이고 방어적인 태도로 인해 팀원들과의 협업에 어려움을 겪었습니다. 또한, 비판적이고 권위적인 태도로 인해 팀 내에서 갑질로 비춰질 수 있는 상황을 초래할 수 있습니다. 이러한 부분에 대한 개선이 필요합니다.',
          협업_관찰:
            '해당 직원은 리더십을 발휘하여 협업을 이끌어가는 능력을 보였으나, 감정적이고 방어적인 태도로 인해 팀원들과의 원활한 협업에 어려움을 겪었습니다. 이는 팀 내에서의 의사소통과 협력에 부정적인 영향을 미칠 수 있으므로, 보다 개방적이고 수용적인 태도를 통해 팀원들과의 관계를 개선할 필요가 있습니다.',
        },
      },
      {
        기본_내용: {
          이름: '박DB',
          직무: 'DB Specialist',
          CL_레벨: 'CL3',
        },
        AI_점수_산출_기준: {
          업적: {
            점수: 2.2,
            실적_요약:
              '박DB(SK0004)님은 두 가지 주요 Task에 참여하여 평균 달성률 70.5%와 평균 기여도 40.5점을 기록하였습니다. AI 시스템 데이터베이스 구축 Task에서는 81%의 달성률을 보이며 29점의 기여도를 나타냈고, 시스템 성능 최적화 Task에서는 60%의 달성률과 52점의 기여도를 기록하였습니다. 이러한 성과는 팀 평균 달성률 104.8%에 비해 다소 낮은 수치이나, 박DB님이 기여한 영역에서의 성과는 팀 목표 달성에 중요한 역할을 했습니다.',
          },
          SK_Values: {
            Passive: {
              점수: 4.5,
              평가_근거:
                '박DB는 다양한 프로젝트에서 주인의식을 가지고 적극적으로 업무를 추진하며, 성과를 지속적으로 초과 달성하였습니다. 특히, 여러 협업을 통해 문제를 해결하고, 성과를 도출하는 데 기여한 점이 두드러집니다. 그러나 목표 달성률이 140% 이상 150% 미만으로, 지속적인 최고 수준의 노력을 보여주었지만, 압도적인 성과에는 미치지 못했습니다.',
            },
            Proactive: {
              점수: 4.5,
              평가_근거:
                '박DB는 AI 시스템의 데이터 요구사항 분석과 성능 최적화 작업을 통해 조직의 효율성을 높이고 운영비 절감에 기여했습니다. 특히, 시스템 성능 분석과 병목 지점 식별을 통해 구체적인 개선 방안을 제시하고 실행하여 성과를 달성했습니다. 이러한 점에서 박DB는 혁신적인 아이디어를 실행하고, 팀 및 조직의 변화를 주도하는 능동적인 태도를 보였습니다.',
            },
            Professional: {
              점수: 4.5,
              평가_근거:
                '박DB는 AI 시스템의 데이터베이스 구축 및 최적화 과정에서 다양한 역할을 수행하며, 팀의 생산성을 높이는 데 기여했습니다. 특히, 성능 분석과 최적화 작업을 통해 운영비 절감과 시스템 성능 향상에 기여한 점이 두드러집니다. 또한, 동료들과의 협업을 통해 복잡한 문제를 해결하고, 기술적 지식을 효과적으로 전파한 점에서 전문성을 인정받을 수 있습니다.',
            },
            People: {
              점수: 3.5,
              평가_근거:
                '박DB는 팀 내에서 데이터베이스 구축 및 성능 최적화에 기여하며, 협업률이 100%로 매우 높지만, 협업 과정에서 회피형 태도와 무관심을 보임으로써 소통이 원활하지 않았습니다. 이러한 점에서 원활한 소통 및 상호 존중의 기준을 충족하지 못해 3.5점을 부여하였습니다.',
            },
          },
          종합_원점수: 3.02,
          AI_추천_점수_CL_정규화: 3.02,
          평가_근거_요약:
            '박DB(SK0004)님은 두 가지 주요 Task에 참여하여 평균 달성률 70.5%와 평균 기여도 40.5점을 기록하였습니다. 달성률 점수는 2.2점으로 C등급에 해당하며, 이는 목표 미달을 나타냅니다. AI 시스템 데이터베이스 구축 Task에서는 81%의 달성률을 보였으나, 시스템 성능 최적화 Task에서는 60%의 달성률을 기록하여 팀 평균 달성률 104.8%에 비해 낮습니다. 4P 평가 결과는 Passionate, Proactive, Professional 모두 4.5점으로 우수하나, People 점수는 3.5점으로 상대적으로 낮습니다.',
        },
        연간_핵심_성과_기여도: {
          Task_표: [
            {
              Task명: 'AI 시스템 데이터베이스 구축',
              핵심_Task:
                'AI 학습 데이터 DB 구조 85% 완성. 데이터 수집/저장/관리 시스템 구축. 김개발님과 연동 테스트, 이설계님과 관리 정책 협업 완료.',
              누적_달성률_퍼센트: 81,
              분석_코멘트:
                '2023년 박DB(SK0004)님은 AI 학습 데이터 DB 구조 완성 목표를 향해 81%의 달성률을 기록하며 팀 평균 달성률 104.8%에 기여하였습니다. 데이터 수집, 저장, 관리 시스템을 성공적으로 구축하였고, 김개발님과의 연동 테스트 및 이설계님과의 협업을 통해 팀 성과에 긍정적인 영향을 미쳤습니다.',
            },
            {
              Task명: '시스템 성능 최적화를 통한 운영비 절감',
              핵심_Task:
                '인프라 운영비 9% 절감 달성(목표 대비 90%). 지속적인 성능 모니터링 및 최적화 체계 구축. 김개발님과 AI 시스템 최적화, 이설계님과 비용 효율성 협업 완료.',
              누적_달성률_퍼센트: 60,
              분석_코멘트:
                '2023년 박DB(SK0004)님은 시스템 성능 최적화를 통해 인프라 운영비를 9% 절감하는 성과를 달성하였으며, 이는 설정된 목표인 15% 대비 90%에 해당합니다. 지속적인 성능 모니터링 및 최적화 체계를 구축하여 팀의 성장에 기여하였습니다.',
            },
          ],
          개인_종합_달성률: 68,
          종합_기여_코멘트:
            '박DB(SK0004)님은 DB Specialist로서 두 가지 주요 Task에 참여하여 평균 달성률 64.0%와 평균 기여도 42.0점을 기록하였습니다. AI 시스템 데이터베이스 구축 Task에서는 75%의 달성률을 보이며 29점의 기여도를 나타냈고, 시스템 성능 최적화를 통한 운영비 절감 Task에서는 53%의 달성률과 55점의 기여도를 기록했습니다. 이러한 성과는 팀 평균 달성률 92.0%에 비해 다소 낮은 수치이나, 박DB님은 두 Task에서 각각의 목표를 향해 지속적으로 노력하고 있음을 보여줍니다. 현재 역량 평가에 따르면, 박DB님은 데이터베이스 구축에 대한 높은 이해도를 바탕으로 성과를 내고 있으나, 시스템 최적화 부분에서의 개선이 필요합니다. 향후 성장을 위해서는 최적화 Task에서의 성과를 높이는 것이 중요한 성장 포인트로 판단됩니다.',
        },
        Peer_Talk: {
          강점: '해당 직원은 AI 학습 데이터 DB 구조의 75%를 성실하게 완성하고, 성능 최적화 및 인덱스 설계를 성공적으로 마무리했습니다. 문제해결력을 발휘하여 신뢰할 수 있는 결과를 도출하였으며, 열린 소통을 통해 기술적 성장을 이루었습니다.',
          우려: '해당 직원은 협업 과정에서 회피형 태도와 무관심을 보임으로써 소통이 단절되고 수동적인 모습을 보여 업무 진행에 어려움을 초래했습니다. 이러한 부분은 개선이 필요합니다.',
          협업_관찰:
            '해당 직원은 김개발님과의 데이터 적재 및 이설계님과의 성능 튜닝 협업을 통해 문제해결력을 발휘했으나, 일부 협업 과정에서 회피형 태도와 무관심으로 인해 소통이 원활하지 않았습니다.',
        },
      },
    ],
  }

  // 목차 아이템들
  const tableOfContents = [
    { id: 'basic-info', title: '기본 정보', icon: FileText },
    { id: 'team-summary', title: '팀원 평가 요약', icon: Users },
    { id: 'team-collaboration', title: '팀 협업 현황', icon: Target },
    { id: 'individual-evaluations', title: '팀원별 상세 평가', icon: Award },
  ]

  // 스크롤 감지 및 활성 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionRefs.current)
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[sections[i]]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 섹션으로 스크롤 이동
  const scrollToSection = (sectionId: number) => {
    const section = sectionRefs.current[sectionId]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 점수에 따른 색상 반환
  const getScoreColor = (score: number) => {
    if (score >= 4.0) return 'text-green-600 bg-green-50'
    if (score >= 3.5) return 'text-blue-400 bg-blue-50'
    if (score >= 3.0) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  // 달성률에 따른 색상 반환
  const getAchievementColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 bg-green-50 border border-green-200'
    if (rate >= 80) return 'text-blue-400 bg-blue-50 border border-blue-200'
    if (rate >= 70)
      return 'text-yellow-600 bg-yellow-50 border border-yellow-200'
    if (rate >= 60)
      return 'text-orange-600 bg-orange-50 border border-orange-200'
    if (rate >= 50)
      return 'text-purple-600 bg-purple-50 border border-purple-200'
    if (rate >= 30) return 'text-red-600 bg-red-50 border border-red-200'
    if (rate >= 20) return 'text-gray-600 bg-gray-50 border border-gray-200'
    return 'text-gray-400 bg-gray-100 border border-gray-300'
  }

  return (
    <section className="h-full flex h-full flex-col">
      {/* 목차 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex flex-wrap gap-2 pb-4">
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
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.title}</span>
                {activeSection === item.id && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-auto SKoro-report-section shadow-md bg-white rounded-lg shadow-lg">
        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-h-0 overflow-auto SKoro-report-section shadow-md bg-white rounded-lg shadow-lg">
          {/* header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 flex w-full justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {teamTemporaryReport.기본_정보['업무_수행_기간']} 중간 레포트
              </h1>
              <div className="text-blue-100 flex items-center gap-8 text-md">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {teamTemporaryReport.기본_정보.팀명}
                </span>
                <span>팀장: {teamTemporaryReport.기본_정보.팀장명}</span>
                <span>
                  기간: {teamTemporaryReport.기본_정보['업무_수행_기간']}
                </span>
              </div>
            </div>
            <div className="items-center justify-end">
              <img src={SKLogoWhite} alt="SK Logo" className="h-14 w-auto" />
            </div>
          </div>

          <div className="p-8 space-y-14">
            {/* 기본 정보 */}
            <div
              ref={(el: any) => (sectionRefs.current['basic-info'] = el)}
              className=""
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                기본 정보
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">팀명</div>
                  <div className="font-semibold text-gray-900">
                    {teamTemporaryReport.기본_정보.팀명}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">팀장명</div>
                  <div className="font-semibold text-gray-900">
                    {teamTemporaryReport.기본_정보.팀장명}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    업무 수행 기간
                  </div>
                  <div className="font-semibold text-gray-900">
                    {teamTemporaryReport.기본_정보['업무_수행_기간']}
                  </div>
                </div>
              </div>
            </div>

            {/* 팀원 평가 요약표 */}
            <div
              ref={(el: any) => (sectionRefs.current['team-summary'] = el)}
              className=""
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                팀원 평가 요약
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        이름
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">
                        AI 추천 점수
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900 whitespace-nowrap">
                        총 Task 수
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">
                        협업률
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        핵심 협업자
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        팀 내 역할
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        Peer Talk 평가
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">
                        협업 편중도
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamTemporaryReport.팀원_평가_요약표.표.map(
                      (member, index) => (
                        <tr key={index} className="hover:bg-gray-25">
                          <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900 break-keep">
                            {member.이름}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(
                                member['AI_추천_점수']
                              )}`}
                            >
                              {member['AI_추천_점수']}
                            </span>
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-center text-gray-900 font-bold">
                            {member['총_Task_수']}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-600">
                              {member.협업률}
                            </span>
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {member['핵심_협업자'].map(
                                (collaborator, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700"
                                  >
                                    {collaborator}
                                  </span>
                                )
                              )}
                            </div>
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            {member['팀_내_역할']}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            {member['Peer_Talk_평가']}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-center">
                            <span className="px-2 py-1 rounded bg-yellow-50 text-yellow-600 font-medium text-xs whitespace-nowrap">
                              {member['협업_편중도']}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* 개별 종합 평가 */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <CircleCheckBig className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    개별 종합 평가
                  </h3>
                </div>
                {teamTemporaryReport.팀원_평가_요약표.표.map(
                  (member, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {member.이름}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {member['종합_평가']}
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* 팀 협업 현황 */}
              <div className="mt-6 space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    팀 협업 종합 요약
                  </h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {teamTemporaryReport.팀원_평가_요약표.팀_협업_요약}
                  </p>
                </div>

                {/* 협업 요약 및 설명 */}
                <div className="p-4 bg-gray-50/70 rounded-lg">
                  <table className="text-gray-900 text-sm leading-relaxed">
                    <tbody>
                      <tr>
                        <td className="font-medium">협업률</td>
                        <td className="">
                          {teamTemporaryReport.팀원_평가_요약표.협업률_설명}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="font-medium pr-5">협업 편중도</td>
                        <td className=" ">
                          {
                            teamTemporaryReport.팀원_평가_요약표
                              .협업_편중도_설명
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 팀원별 상세 평가 */}
            <div
              ref={(el: any) =>
                (sectionRefs.current['individual-evaluations'] = el)
              }
              className=""
            >
              {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">
                팀원별 상세 평가
              </h2> */}

              {teamTemporaryReport.팀원별_평가_근거.map((member, index) => (
                <div className="page-break-before">
                  {/* 첫 index에 대해서 h2 태그 제공 */}
                  {index === 0 && (
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      팀원별 상세 평가
                    </h2>
                  )}

                  {/* 팀원 상세 평가 카드 */}
                  <div
                    key={index}
                    style={{ marginBottom: '2rem' }}
                    className="mb-8 last:mb-0 border border-gray-200 rounded-lg"
                  >
                    <div className="pt-6 pb-4 pl-2 pr-4 rounded-t-lg border-b border-gray-200 mx-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {member.기본_내용.이름}
                          </h3>
                          <p className="">
                            {member.기본_내용.직무} • {member.기본_내용.CL_레벨}
                          </p>
                        </div>
                        <div className="text-right flex gap-8">
                          <div>
                            <div className="text-2xl font-bold text-blue-600">
                              {
                                member.AI_점수_산출_기준[
                                  'AI_추천_점수_CL_정규화'
                                ]
                              }
                            </div>
                            <div className="text-sm text-blue-500">
                              AI 추천 점수
                            </div>
                          </div>

                          <div>
                            <div className="text-2xl font-bold text-blue-600">
                              {member.연간_핵심_성과_기여도['개인_종합_달성률']}
                              %
                            </div>
                            <div className="text-sm text-blue-500">
                              개인 종합 달성률
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 space-y-6">
                      <div className="p-4 bg-blue-50/70 rounded-lg">
                        <h3 className="text-md font-semibold text-blue-600 mb-2">
                          평가 근거 요약
                        </h3>
                        <p className="text-blue-900 text-sm leading-relaxed">
                          {member.연간_핵심_성과_기여도['종합_기여_코멘트']}
                        </p>
                      </div>

                      {/* AI 점수 산출 기준 표 */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCheck className="w-5 h-5 text-gray-600" />
                          <h4 className="text-lg font-semibold text-gray-900">
                            AI 점수 산출 기준
                          </h4>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-200">
                            <thead>
                              <tr className="bg-gray-100 text-sm">
                                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900 text-center">
                                  평가 항목
                                </th>
                                <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">
                                  점수
                                </th>
                                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                                  평가 근거
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900 text-center bg-gray-50/70">
                                  업적
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-center">
                                  <span
                                    className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full ${getScoreColor(
                                      member.AI_점수_산출_기준.업적.점수
                                    )}`}
                                  >
                                    {member.AI_점수_산출_기준.업적.점수}
                                  </span>
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                  {member.AI_점수_산출_기준.업적['실적_요약']}
                                </td>
                              </tr>
                              {Object.entries(
                                member.AI_점수_산출_기준.SK_Values
                              ).map(([key, value]) => (
                                <tr key={key} className="">
                                  <td className="border border-gray-200 px-4 py-3 font-medium text-red-400 bg-red-50/70 text-center">
                                    {key}
                                  </td>
                                  <td className="border border-gray-200 px-4 py-3 text-center">
                                    <span
                                      className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full ${getScoreColor(
                                        value.점수
                                      )}`}
                                    >
                                      {value.점수}
                                    </span>
                                  </td>
                                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                    {value['평가_근거']}
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-blue-50/50">
                                <td className="border border-gray-200 px-4 py-3 font-medium text-blue-900 text-center">
                                  종합 원점수
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-center">
                                  <span
                                    className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full ${getScoreColor(
                                      member.AI_점수_산출_기준['종합_원점수']
                                    )}`}
                                  >
                                    {member.AI_점수_산출_기준['종합_원점수']}
                                  </span>
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-sm text-blue-900 leading-relaxed">
                                  {member.AI_점수_산출_기준['평가_근거_요약']}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 연간 핵심 성과 기여도 */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          연간 핵심 성과 기여도
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300 rounded-lg">
                            <thead>
                              <tr className="bg-gray-100 text-sm whitespace-nowrap">
                                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900 min-w-24">
                                  Task명
                                </th>
                                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                                  핵심 Task
                                </th>
                                <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">
                                  누적 달성률
                                </th>
                                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                                  분석 코멘트
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {member.연간_핵심_성과_기여도.Task_표.map(
                                (task, taskIndex) => (
                                  <tr
                                    key={taskIndex}
                                    className={`
                                    hover:bg-gray-50 transition-colors duration-200 leading-relaxed
                                    ${
                                      taskIndex % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-gray-50/50'
                                    }
                                  `}
                                  >
                                    <td className="border border-gray-200 px-4 py-3 font-medium text-sm break-keep text-gray-900">
                                      {task.Task명}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                      {task['핵심_Task']}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-3 text-center">
                                      <span
                                        className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                                          task['누적_달성률_퍼센트']
                                        )}`}
                                      >
                                        {task['누적_달성률_퍼센트']}%
                                      </span>
                                    </td>
                                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                      {task['분석_코멘트']}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Peer Talk 평가 */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          Peer Talk 평가
                        </h4>

                        <div className="flex gap-6">
                          <div className="flex-1 p-6 bg-green-50/70 border-l-4 border-green-300 rounded-r-lg">
                            <h4 className="text-md font-semibold text-green-800 mb-3">
                              강점
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {member.Peer_Talk.강점}
                            </p>
                          </div>
                          <div className="flex-1 p-6 bg-yellow-50/70 border-l-4 border-yellow-300 rounded-r-lg">
                            <h4 className="text-md font-semibold text-yellow-800 mb-3">
                              우려
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {member.Peer_Talk.우려}
                            </p>
                          </div>
                          <div className="flex-1 p-6 bg-blue-50/70 border-l-4 border-blue-300 rounded-r-lg">
                            <h4 className="text-md font-semibold text-blue-800 mb-3">
                              협업 관찰
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {member.Peer_Talk['협업_관찰']}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

export default TeamTemporaryReport
