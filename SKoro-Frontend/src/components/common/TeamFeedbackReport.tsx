import { useState, useEffect, useRef } from 'react'
import {
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Award,
  MessageSquare,
  BarChart3,
  Star,
  Lightbulb,
  Calendar,
} from 'lucide-react'
import { SKLogoWhite } from '../../assets/common'

const TeamFeedbackReport: React.FC<{
  report: any
}> = ({ report }) => {
  const [activeSection, setActiveSection] = useState('basic-info')
  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({})

  // 샘플 데이터 - 실제 사용시에는 props로 받아오세요
  const dummyTeamFeedbackReport = {
    기본_정보: {
      팀명: 'W1팀',
      팀장명: '팀장A',
      업무_수행_기간: '2024년 2분기',
    },
    팀_종합_평가: {
      평균_달성률: 67,
      유사팀_평균: 85.3,
      비교_분석: '크게 개선 필요',
      팀_성과_분석_코멘트:
        '현재 팀의 성과는 평균 달성률 67.1%로, 4명의 팀원으로 구성되어 있습니다. 주요 성과 영역을 살펴보면, AI powered ITS 혁신 부문에서 70%의 성과를 달성하여 가장 높은 기여를 보였으며, 이는 전체 KPI에서 35%의 비중을 차지합니다. 또한, Bilable Rate(가동률)도 96%로 우수한 성과를 기록하였으나, 매출과 매출이익 부문에서는 각각 30%의 달성률로 상대적으로 낮은 수치를 보이고 있습니다. 이러한 성과는 팀원 각자의 기여도에 따라 다르게 나타나며, 특히 이름(사번)님은 AI powered ITS 혁신에서 두드러진 성과를 보였고, 이름(사번)님은 가동률 향상에 기여하였습니다. 그러나 전반적으로 매출과 매출이익 부문에서의 성과는 개선이 필요하다는 점이 강조됩니다. 현재 팀의 상태는 이러한 성과를 바탕으로 향후 발전 가능성을 모색해야 할 시점에 있으며, 각 팀원의 기여가 더욱 중요해질 것입니다.',
    },
    팀_업무_목표_및_달성률: {
      kpi_목록: [
        {
          팀_업무_목표: 'Bilable Rate (가동률)',
          kpi_분석_코멘트:
            '팀원들의 평균 가동률은 82%로, 목표인 85%에 미치지 못하고 있습니다. 김개발님은 가동률 개선을 위한 프로세스를 도입했으나, 이설계님은 프로젝트 리스크 감소에 집중하여 가동률에 직접적인 영향을 미치지 않았습니다. 따라서 팀 전체 KPI 달성률은 96%로 평가됩니다.',
          달성률: 96,
          달성률_평균_전사유사팀: '',
          비교_분석: '-',
        },
        {
          팀_업무_목표: 'AI powered ITS 혁신',
          kpi_분석_코멘트:
            '팀원들의 개별 성과를 종합적으로 분석한 결과, 전체 KPI 목표의 약 70%가 달성된 것으로 평가됩니다. 김개발님은 AI 제안서 자동 생성 기능의 50%를 완료하였고, 이설계님은 코딩 자동화 아키텍처의 75%를 설계하였습니다. 박DB님은 데이터베이스 구축의 55%를 완료하였습니다. 각 팀원들이 협업을 통해 주요 작업을 진행하고 있으나, 전체 목표 달성을 위해서는 추가적인 노력이 필요합니다.',
          달성률: 70,
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
        '현재 팀의 종합 달성률은 67%로, 유사팀 평균인 85.3%에 비해 낮은 성과를 보이고 있습니다. 특히, 매출과 매출이익이 각각 30%로 저조하여 개선이 필요합니다. 반면, AI powered ITS 혁신과 가동률은 각각 70%와 96%로 긍정적인 결과를 나타내고 있습니다. 이는 팀의 기술적 역량이 높음을 시사합니다. 전반적으로 팀은 혁신적인 프로젝트에 강점을 보이나, 매출 관련 KPI에서의 부진이 성과를 저해하고 있습니다. 향후 매출 증대를 위한 전략적 접근이 필요하며, 시장 분석 및 고객 요구에 대한 이해를 바탕으로 한 개선 방안을 모색해야 할 것입니다.',
    },
    팀원_성과_분석: {
      팀원별_기여도: [
        {
          순위: 1,
          이름: '김개발',
          달성률: 60,
          누적_기여도: 40,
          기여_내용:
            '김개발(SK0002)님은 3개의 Task에 참여하여 평균 달성률 60.0%와 평균 기여도 40.3점을 기록하였습니다. AI 제안서 기능 고도화 개발에서 50%의 달성률과 27점의 기여도를 보였으며, 팀 가동률 모니터링 Task에서는 75%의 높은 달성률과 91점의 기여도로 두드러진 성과를 나타냈습니다. 신규 고객 발굴 Task에서는 55%의 달성률과 3점의 기여도로 상대적으로 낮은 성과를 보였습니다. 김개발님은 팀 평균 달성률 67.1%에 비해 개선이 필요함을 알 수 있습니다.',
        },
        {
          순위: 2,
          이름: '이설계',
          달성률: 52,
          누적_기여도: 35,
          기여_내용:
            '이설계(SK0003)님은 Solution Architect로서 평균 달성률 52.8%와 평균 기여도 39.5점을 기록하였습니다. AI 코딩 자동화 시스템 설계에서 96%의 높은 달성률과 41점의 기여도를 달성하였으나, 프로젝트 효율성 관리와 개발 프로세스 최적화에서는 각각 40%와 25%의 낮은 달성률을 보였습니다. 고객 관계 관리에서는 50%의 달성률과 96점의 기여도로 긍정적인 결과를 도출하였습니다. 이설계님은 특정 분야에서 두드러진 성과를 보이나, 다른 영역에서는 개선이 필요합니다.',
        },
        {
          순위: 3,
          이름: '박DB',
          달성률: 27,
          누적_기여도: 24,
          기여_내용:
            '박DB(SK0004)님은 DB Specialist로서 두 가지 Task에 참여하였으며, 평균 달성률 26.5%로 팀 평균 67.1%에 비해 낮은 수치를 기록하고 있습니다. AI 시스템 데이터베이스 구축 Task에서는 30%의 달성률과 30점의 기여도를 보였고, 시스템 성능 최적화 Task에서는 23%의 달성률과 86점의 기여도를 기록하였습니다. 박DB님은 낮은 달성률이 현재 역량 평가에 부정적인 영향을 미치고 있으며, 향후 전략적 접근이 필요합니다.',
        },
      ],
      기여도_기준:
        '개인별 업무 달성률과 누적 기여도를 종합하여 평가하였습니다.',
    },
    협업_네트워크: {
      협업_매트릭스: [
        {
          이름: '김개발(SK0002)',
          총_Task_수: 3,
          협업률: '100.0%',
          핵심_협업자: ['이설계(SK0003)', '박DB(SK0004)'],
          팀_내_역할:
            'AI 제안서 시스템 모듈 개발 | 핵심 개발자, 팀 효율성 개선 리더 | 기획 리더, 신규 고객 영업 실행자 | 지원 전문가',
          Peer_Talk_평가: '열정적 실행력, 우려사항 없음',
          협업_편중도: '높음(과의존 위험)',
          종합_평가:
            '김개발(SK0002)은 팀 내에서 리더형 협업 스타일을 보이며, AI 제안서 시스템 모듈 개발에 핵심적인 기여를 하고 있습니다. 협업률이 100%로 매우 높지만, 협업 편중도가 높아 과의존 위험이 있으므로, 다양한 팀원과의 협업을 통해 균형을 맞추는 것이 필요합니다.',
        },
        {
          이름: '이설계(SK0003)',
          총_Task_수: 4,
          협업률: '100.0%',
          핵심_협업자: ['김개발(SK0002)', '박DB(SK0004)'],
          팀_내_역할:
            '시스템 아키텍처 설계 | 핵심 개발자, 리스크 대응 실행 | 조율자, 고객 서비스 개선 | 조율자, 개발 효율성 개선 | 조율자',
          Peer_Talk_평가:
            '리더십 있는 의사결정력, 감정적 반응으로 인한 협업 저해',
          협업_편중도: '높음(과의존 위험)',
          종합_평가:
            '이설계(SK0003) 직원은 리더형 협업 스타일을 보이며, 팀 내에서 핵심 개발자 및 조율자로서 높은 기여도를 나타내고 있습니다. 그러나 협업 편중도가 높아 특정 동료에게 과의존하는 경향이 있으므로, 다양한 팀원과의 협업을 통해 균형을 맞추는 것이 필요합니다.',
        },
        {
          이름: '박DB(SK0004)',
          총_Task_수: 2,
          협업률: '100.0%',
          핵심_협업자: ['김개발(SK0002)', '이설계(SK0003)'],
          팀_내_역할: '데이터베이스 아키텍트 | 시스템 최적화 실행자',
          Peer_Talk_평가: '기술적 신뢰성 강함, 소통 회피 경향 주의',
          협업_편중도: '높음(과의존 위험)',
          종합_평가:
            '박DB(SK0004) 직원은 리더형 협업 스타일을 보이며, 팀 내에서 높은 기여도를 나타내고 있습니다. 그러나 협업 편중도가 높아 과의존 위험이 있으므로, 다양한 팀원과의 협업을 통해 균형을 맞추는 것이 필요합니다. 이를 통해 더욱 효과적인 시스템 최적화를 이끌어낼 수 있을 것입니다.',
        },
      ],
      팀_협업_요약:
        '팀의 전반적인 협업률이 100%로 매우 높은 수준을 유지하고 있지만, 기여도는 평균 45.9점으로 다소 낮아 보입니다. 특히 김개발(SK0002), 이설계(SK0003), 박DB(SK0004) 세 명의 팀원이 과의존 위험에 처해 있어, 이들이 팀의 핵심 역할을 수행하면서도 다른 팀원들과의 협업이 부족할 수 있음을 시사합니다. 이러한 편중된 협업 패턴은 장기적으로 팀의 지속 가능성을 저해할 수 있으므로, 각 팀원의 역할을 재조정하고, 다양한 팀원들이 적극적으로 참여할 수 있는 환경을 조성하는 것이 필요합니다.',
      협업률_설명:
        '개인이 수행한 전체 업무 중, 다른 팀원과 실제로 협업한 업무가 차지하는 비율입니다.',
      협업_편중도_설명:
        '특정 동료에게만 협업이 쏠려있는지, 혹은 여러 동료와 고르게 협업하는지를 나타내는 지표입니다.',
    },
    팀원별_코칭_제안: {
      일반_코칭: [
        {
          '팀원명(사번)': '김개발(SK0002)',
          핵심_강점: '기술 문제 해결, 아키텍처 설계',
          성장_보완점: '지식 전달 스킬, 독립적 문제 해결',
          협업_특성: '리더형, 팀 내 기술 리더십 강화',
          성과_기여_요약: '달성률 60%, 팀 내 달성률 1위',
          다음_분기_코칭_제안:
            '다음 분기에는 사내 기술 세미나에서 발표를 진행하고, 타팀과의 API 설계 협업 프로젝트에 참여하여 독립적인 개발 경험을 쌓도록 지원합니다.',
        },
        {
          '팀원명(사번)': '이설계(SK0003)',
          핵심_강점:
            'AI 코딩 자동화 시스템 아키텍처 설계, 고객 중심 솔루션 개선',
          성장_보완점: '피드백 수용 능력, 비판적 사고 및 타협 능력',
          협업_특성: '조율자형, 감정적 반응 경향',
          성과_기여_요약: '달성률 52.75%, 팀 내 달성률 2위',
          다음_분기_코칭_제안:
            '다음 분기에는 감정 관리 및 소통 기술 교육을 제공하고, 정기적인 피드백 세션을 통해 협업에서의 감정적 반응을 줄이는 훈련을 실시합니다.',
        },
        {
          '팀원명(사번)': '박DB(SK0004)',
          핵심_강점: '데이터 아키텍처 설계, 기술적 신뢰성',
          성장_보완점: '소통 기술, 주도적 참여',
          협업_특성: '조율자형, 의견 충돌 회피 경향',
          성과_기여_요약: '달성률 26.5%, 팀 내 3위',
          다음_분기_코칭_제안:
            '다음 분기에는 소통 기술 향상을 위한 워크숍에 참여하고, 정기적인 피드백 세션을 통해 태도 변화를 모니터링할 것을 권장합니다.',
        },
      ],
      집중_코칭: [
        {
          '팀원명(사번)': '이설계(SK0003)',
          핵심_이슈:
            '해당 직원은 People 점수가 3.0으로 낮고, Peer Talk에서 감정적이고 방어적인 태도로 인해 협업에 부정적인 영향을 미치고 있습니다.',
          상세_분석:
            '감정적인 반응과 방어적인 태도가 협업 과정에서 비판적이고 타협이 부족한 모습을 초래하고 있으며, 이는 팀 내 협업에 부정적인 영향을 미치고 있습니다.',
          리스크_요소:
            '감정적 반응으로 인한 협업 저해, 팀 내 소통 문제, 피드백 수용 부족',
          코칭_제안:
            '1. 감정 관리 및 소통 기술 교육 제공 2. 피드백 수용 훈련 실시 3. 팀 내 협업 프로젝트에 참여하여 긍정적인 협업 경험을 쌓도록 유도',
        },
        {
          '팀원명(사번)': '박DB(SK0004)',
          핵심_이슈:
            '협업 이슈 및 태도 이슈가 관찰됨. 의견 충돌 시 회피형 태도와 수동적인 태도가 문제.',
          상세_분석:
            '해당 직원은 협업에서 기술적 신뢰성을 보였으나, 소통 방식에서 수동적 태도가 협업의 효율성을 저하시킴. 의견 충돌 시 회피형 태도로 인해 소통이 단절되는 경향이 있음.',
          리스크_요소:
            '소통 단절로 인한 팀 내 협업 저하, 수동적인 태도로 인한 업무 효율성 감소',
          코칭_제안:
            '1. 소통 기술 향상을 위한 워크숍 참여 권장 2. 의견 충돌 시 적극적인 소통 방법 교육 3. 정기적인 피드백 세션을 통해 태도 변화 모니터링',
        },
      ],
    },
    리스크_및_향후_운영_제안: {
      주요_리스크: [
        {
          주요리스크: '과의존 위험',
          리스크_심각도: 'high',
          리스크_설명:
            '팀원 김개발(SK0002), 이설계(SK0003), 박DB(SK0004)가 서로에게 과도하게 의존하고 있으며, 이로 인해 팀의 협업이 특정 인원에게 편중되고 있습니다. 이는 장기적으로 팀의 지속 가능성을 저해할 수 있습니다.',
          발생_원인: [
            '김개발(SK0002), 이설계(SK0003), 박DB(SK0004) 모두 협업률이 100%로 매우 높지만, 기여도는 평균 45.9점으로 낮음.',
            '세 명의 팀원이 모두 서로를 주요 협업자로 지정하고 있어 협업 편중도가 높음.',
          ],
          영향_예측: [
            {
              영향_범위: 'team',
              발생_시점: 'long_term',
              영향_설명:
                '특정 팀원에게 의존하게 되어 팀의 전반적인 성과와 지속 가능성이 저하될 수 있음.',
            },
          ],
          운영_개선_전략_제안: [
            {
              전략_설명:
                '팀원 간의 협업을 다양화하기 위해, 정기적인 팀 빌딩 활동을 통해 서로 다른 팀원과의 협업 기회를 늘리고, 각 팀원의 역할을 명확히 하여 의존도를 줄이는 방안을 마련해야 함.',
            },
          ],
        },
        {
          주요리스크: '매출 및 매출이익 저조',
          리스크_심각도: 'high',
          리스크_설명:
            '팀의 매출과 매출이익 KPI 달성률이 각각 30%로 매우 낮아, 전체 성과에 부정적인 영향을 미치고 있습니다. 이는 팀의 재무적 안정성에 심각한 리스크를 초래할 수 있습니다.',
          발생_원인: [
            '매출 KPI의 달성률이 30%로 목표에 미치지 못함.',
            '매출이익 KPI의 달성률이 30%로 목표에 미치지 못함.',
          ],
          영향_예측: [
            {
              영향_범위: 'organization',
              발생_시점: 'immediate',
              영향_설명:
                '재무적 안정성이 저하되어 팀의 운영에 필요한 자원 확보에 어려움을 겪을 수 있음.',
            },
          ],
          운영_개선_전략_제안: [
            {
              전략_설명:
                '매출 증대를 위해 고객 관리 및 영업 전략을 재정비하고, 성과가 저조한 팀원에게는 추가 교육 및 멘토링을 제공하여 성과 향상을 도모해야 함.',
            },
          ],
        },
        {
          주요리스크: 'AI powered ITS 혁신 성과의 불균형',
          리스크_심각도: 'medium',
          리스크_설명:
            'AI powered ITS 혁신 KPI에서 70%의 성과를 달성했으나, 이는 팀원 간의 성과 차이가 크고, 전체 목표 달성을 위해 추가적인 노력이 필요함을 나타냅니다.',
          발생_원인: [
            'AI powered ITS 혁신 KPI의 진행률이 70%로 평가됨.',
            '팀원 간 성과 차이가 존재하여 협업의 필요성이 강조됨.',
          ],
          영향_예측: [
            {
              영향_범위: 'team',
              발생_시점: 'short_term',
              영향_설명:
                '팀원 간의 성과 차이로 인해 전체 목표 달성에 어려움을 겪을 수 있으며, 팀의 사기 저하로 이어질 수 있음.',
            },
          ],
          운영_개선_전략_제안: [
            {
              전략_설명:
                '팀원 간의 성과 차이를 줄이기 위해, 성과가 낮은 팀원에게는 구체적인 목표 설정과 함께 멘토링을 제공하고, 팀 전체의 협업을 촉진하는 워크숍을 개최해야 함.',
            },
          ],
        },
        {
          주요리스크: '소통 회피 경향',
          리스크_심각도: 'medium',
          리스크_설명:
            '박DB(SK0004)는 소통 회피 경향이 있으며, 이는 팀 내 정보 공유 및 협업에 부정적인 영향을 미칠 수 있습니다. 소통 부족은 팀의 문제 해결 능력을 저하시킬 수 있습니다.',
          발생_원인: [
            "박DB(SK0004)의 peer_talk_summary에서 '소통 회피 경향 주의'라는 언급이 있음.",
            '팀의 전반적인 협업률은 높지만, 기여도가 낮아 소통의 질이 떨어질 가능성이 있음.',
          ],
          영향_예측: [
            {
              영향_범위: 'team',
              발생_시점: 'short_term',
              영향_설명:
                '소통 부족으로 인해 팀의 문제 해결 능력이 저하되고, 협업의 질이 떨어질 수 있음.',
            },
          ],
          운영_개선_전략_제안: [
            {
              전략_설명:
                '정기적인 팀 회의를 통해 소통을 장려하고, 소통이 원활하지 않은 팀원에게는 개별적인 피드백 세션을 통해 소통의 중요성을 강조해야 함.',
            },
          ],
        },
        {
          주요리스크: '가동률 개선의 한계',
          리스크_심각도: 'medium',
          리스크_설명:
            '가동률 KPI는 96%로 우수하나, 팀원 간의 기여도 차이로 인해 전체 평균 가동률이 목표에 미치지 못하고 있습니다. 이는 팀의 효율성을 저해할 수 있습니다.',
          발생_원인: [
            '팀원들의 평균 가동률이 82%로 목표인 85%에 미치지 못함.',
            '이설계님은 가동률 개선에 직접적인 영향을 미치지 않음.',
          ],
          영향_예측: [
            {
              영향_범위: 'team',
              발생_시점: 'short_term',
              영향_설명:
                '팀의 효율성이 저하되어 프로젝트 진행 속도가 느려질 수 있음.',
            },
          ],
          운영_개선_전략_제안: [
            {
              전략_설명:
                '가동률을 높이기 위해 각 팀원의 역할과 책임을 명확히 하고, 성과가 낮은 팀원에게는 추가적인 지원과 교육을 제공하여 가동률을 개선해야 함.',
            },
          ],
        },
      ],
    },
    총평: {
      주요_인사이트:
        '**[팀 성과 방향]**  \nW1팀은 연간 평균 달성률 67%로, KPI 4개 중 AI powered ITS 혁신과 Bilable Rate에서 각각 70%와 96%의 진척도를 보였으나, 매출과 매출이익은 각각 30%에 그쳐 전반적인 성과가 저조한 상황입니다. 상대적 성과 개선이 필요하며, 전년 대비 성장률이 없다는 점은 팀의 전략적 방향성을 재조정할 필요성을 시사합니다. 중간평가 평균 3.5점은 긍정적인 신호이나, 실질적인 성과 창출 능력은 부족한 것으로 평가됩니다.\n\n**[구조적 인식]**  \nW1팀의 강점은 Bilable Rate의 높은 진척도에서 나타나듯이, 팀원들이 가동률을 효과적으로 관리하고 있다는 점입니다. 그러나 과의존 위험, 매출 및 매출이익 저조, AI powered ITS 혁신 성과의 불균형, 소통 회피 경향 등은 지속 가능한 성장에 큰 도전 과제가 되고 있습니다. 이러한 리스크를 해결하기 위해서는 팀 내 소통을 강화하고, 매출 및 매출이익을 증대시킬 수 있는 전략적 접근이 필요합니다.\n\n**[향후 운영 전략]**  \n차년도 계획은 아직 구체화되지 않았으나, W1팀은 매출 및 매출이익 증대를 위한 전략적 우선순위를 설정해야 합니다. 이를 위해 AI powered ITS 혁신의 성과를 극대화하고, 매출 목표를 50%로 설정하여 실행 가능한 방안을 마련해야 합니다. 또한, 팀 내 소통을 활성화하고, 정기적인 피드백 세션을 통해 과의존 위험을 줄이며, 가동률 개선의 한계를 극복하기 위한 교육 및 훈련 프로그램을 도입할 필요가 있습니다.',
    },
  }
  const teamFeedbackReport = report || dummyTeamFeedbackReport

  // 목차 구성
  const tableOfContents = [
    {
      id: 'basic-info',
      title: '기본 정보',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'overall-evaluation',
      title: '팀 종합 평가',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'kpi-analysis',
      title: '업무 목표 및 달성률',
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: 'member-analysis',
      title: '팀원 성과 분석',
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: 'collaboration',
      title: '협업 네트워크',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      id: 'coaching',
      title: '코칭 제안',
      icon: <Lightbulb className="w-4 h-4" />,
    },
    {
      id: 'risks',
      title: '리스크 및 운영 제안',
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    { id: 'summary', title: '총평', icon: <Star className="w-4 h-4" /> },
  ]

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionsRef.current)
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = sectionsRef.current[sectionId]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 섹션으로 스크롤
  const scrollToSection = (sectionId: number) => {
    const element = sectionsRef.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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

  // 리스크 심각도에 따른 색상
  const getRiskColor = (severity: string) => {
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

  return (
    <div className="h-full flex h-full flex-col">
      {/* 목차 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex flex-wrap gap-2 pb-4">
          {tableOfContents.map((item: any) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all print:hidden ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.icon}
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto SKoro-report-section shadow-md bg-white rounded-lg shadow-lg">
        {/* 레포트 제목 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg p-8 flex w-full justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">팀 피드백 레포트</h1>
            <div className="flex items-center justify-start gap-4">
              <span className="flex items-center gap-1 text-blue-100">
                <Users className="w-4 h-4" />
                {teamFeedbackReport.기본_정보.팀명}
              </span>
              <span className="flex items-center gap-1 text-blue-100">
                <Calendar className="w-4 h-4" />
                {teamFeedbackReport.기본_정보.업무_수행_기간}
              </span>
            </div>
          </div>

          <div className="items-center justify-end">
            <img src={SKLogoWhite} alt="SK Logo" className="h-14 w-auto" />
          </div>
        </div>

        <div className="p-8 space-y-14">
          {/* 기본 정보 */}
          <section
            id="basic-info"
            ref={(el: any) => (sectionsRef.current['basic-info'] = el)}
            className="mb-12 print:mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              {/* <User className="text-gray-800" size={24} /> */}
              <h2 className="text-2xl font-bold text-gray-800">기본 정보</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">직위</p>
                <p className="text-lg font-semibold text-gray-800">
                  {teamFeedbackReport.기본_정보.팀명}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">소속</p>
                <p className="text-lg font-semibold text-gray-800">
                  {teamFeedbackReport.기본_정보.팀장명}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">평가 기간</p>
                <p className="text-lg font-semibold text-gray-800">
                  {teamFeedbackReport.기본_정보.업무_수행_기간}
                </p>
              </div>
            </div>
          </section>

          {/* 팀 종합 평가 */}
          <section
            id="overall-evaluation"
            ref={(el: any) => (sectionsRef.current['overall-evaluation'] = el)}
            className="mb-12 print:mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              팀 종합 평가
            </h2>

            {/* 종합 평가 표 */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="font-semibold border border-gray-300 px-4 py-2 w-2/5">
                      평균 달성률
                    </th>
                    <th className=" w-2/5 font-semibold border border-gray-300 px-4 py-2">
                      유사팀 평균
                    </th>
                    <th className="w-2/5 font-semibold border border-gray-300 px-4 py-2 bg-blue-50 text-blue-400">
                      비교 분석
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center text-sm">
                    <td className="border border-gray-300 px-4 py-2">
                      <span className={`px-3 py-1 rounded-full font-bold`}>
                        {teamFeedbackReport.팀_종합_평가.평균_달성률}%
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className="font-bold text-gray-700">
                        {teamFeedbackReport.팀_종합_평가.유사팀_평균}%
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className="px-3 py-1">
                        {teamFeedbackReport.팀_종합_평가.비교_분석}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 상세 분석 */}
            <div className="mt-6 p-4 bg-blue-50/70 rounded-lg">
              <h3 className="text-md font-semibold text-blue-600 mb-2">
                팀 성과 분석
              </h3>
              <p className="text-blue-900 text-sm leading-relaxed">
                {teamFeedbackReport.팀_종합_평가.팀_성과_분석_코멘트}
              </p>
            </div>
          </section>

          {/* KPI 분석 */}
          <section
            id="kpi-analysis"
            ref={(el: any) => (sectionsRef.current['kpi-analysis'] = el)}
            className="mb-12 print:mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              팀 업무 목표 및 달성률
            </h2>

            {/* KPI 목록 표 */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      팀 업무 목표
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">
                      달성률
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      KPI 분석 코멘트
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900 text-center whitespace-nowrap">
                      비교 분석
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900 w-28 text-center">
                      전사 유사팀 평균 달성률
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamFeedbackReport.팀_업무_목표_및_달성률.kpi_목록.map(
                    (kpi: any, index: any) => (
                      <tr
                        key={index}
                        className={`
                            hover:bg-gray-50 transition-colors duration-200
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          `}
                      >
                        <td className="border border-gray-300 px-4 py-3 font-medium text-sm">
                          {kpi.팀_업무_목표}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                              kpi.달성률
                            )}`}
                          >
                            {kpi.달성률}%
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-sm leading-relaxed text-gray-700">
                          {kpi.kpi_분석_코멘트}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-sm leading-relaxed text-gray-700 text-center font-semibold">
                          {kpi.비교_분석}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                              Number(kpi.달성률_평균_전사유사팀)
                            )}`}
                          >
                            {kpi.달성률_평균_전사유사팀 === ''
                              ? '-'
                              : kpi.달성률_평균_전사유사팀 + '%'}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* 전사 유사팀 비교분석 */}
            <div className="mt-6 p-4 bg-orange-50/70 rounded-lg">
              <h3 className="text-md font-semibold text-orange-600 mb-2">
                전사 유사팀 비교분석
              </h3>
              <p className="text-orange-900 text-sm leading-relaxed">
                {
                  teamFeedbackReport.팀_업무_목표_및_달성률
                    .전사_유사팀_비교분석_코멘트
                }
              </p>
            </div>
          </section>

          {/* 팀원 성과 분석 */}
          <section
            id="member-analysis"
            ref={(el: any) => (sectionsRef.current['member-analysis'] = el)}
            className="mb-12 print:mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              팀원 성과 분석
            </h2>

            {/* 팀원별 기여도 표 */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">
                      순위
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      이름
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">
                      달성률
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">
                      누적 기여도
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                      기여 내용
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamFeedbackReport.팀원_성과_분석.팀원별_기여도.map(
                    (member: any, index: any) => (
                      <tr
                        key={index}
                        className={`
                          text-sm hover:bg-gray-50 transition-colors duration-200 leading-relaxed
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        `}
                      >
                        <td className="border border-gray-300 px-4 py-3 text-center w-16">
                          <div className="flex items-center justify-center">
                            <span className="font-bold text-lg">
                              {member.순위}
                            </span>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900 w-20">
                          {member.이름}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                              member.달성률
                            )}`}
                          >
                            {member.달성률}%
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center w-28">
                          <span
                            className={`text-sm font-bold text-gray-800 px-3 py-1 rounded-full border ${getAchievementColor(
                              member.누적_기여도
                            )}`}
                          >
                            {member.누적_기여도}%
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 leading-relaxed">
                          {member.기여_내용}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* 협업 네트워크 */}
          <section
            id="collaboration"
            ref={(el: any) => (sectionsRef.current['collaboration'] = el)}
            className="mb-12 print:mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              협업 네트워크
            </h2>

            {/* 협업 매트릭스 표 */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300 rounded-lg text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold text-gray-900">
                      이름
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-center font-semibold text-gray-900 w-20">
                      Task 수
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-center font-semibold text-gray-900">
                      협업률
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold text-gray-900">
                      핵심 협업자
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold text-gray-900">
                      팀 내 역할
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-left font-semibold text-gray-900">
                      Peer Talk 평가
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-center font-semibold text-gray-900">
                      협업 편중도
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamFeedbackReport.협업_네트워크.협업_매트릭스.map(
                    (member: any, index: any) => (
                      <tr
                        key={index}
                        className={`
                          text-sm hover:bg-gray-50 transition-colors duration-200 leading-relaxed
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        `}
                      >
                        <td className="border border-gray-300 px-3 py-3 font-medium text-gray-900 break-keep">
                          {member.이름}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-center font-bold">
                          {member['총_Task_수']}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-center">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium text-xs">
                            {member.협업률}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-3 py-3">
                          <div className="flex flex-wrap gap-1">
                            {member['핵심_협업자'].map(
                              (collaborator: any, idx: any) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                                >
                                  {collaborator}
                                </span>
                              )
                            )}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-gray-700">
                          {member['팀_내_역할']}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-gray-700">
                          {member['Peer_Talk_평가']}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-center">
                          <div className="px-2 py-1 rounded bg-yellow-50 text-yellow-600 font-medium text-xs whitespace-nowrap">
                            {member['협업_편중도']}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* 협업 요약 및 설명 */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              <div className="p-4 bg-blue-50/70 rounded-lg">
                <h3 className="text-md font-semibold text-blue-600 mb-2">
                  팀 협업 요약
                </h3>
                <p className="text-blue-900 text-sm leading-relaxed">
                  {teamFeedbackReport.협업_네트워크.팀_협업_요약}
                </p>
              </div>

              <div className="p-4 bg-gray-50/70 rounded-lg">
                <table className="text-gray-900 text-sm leading-relaxed">
                  <tbody>
                    <tr>
                      <td className="font-medium">협업률</td>
                      <td className="">
                        {teamFeedbackReport.협업_네트워크.협업률_설명}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="font-medium pr-5">협업 편중도</td>
                      <td className=" ">
                        {teamFeedbackReport.협업_네트워크.협업_편중도_설명}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 팀원별 코칭 제안 */}
          <section
            id="coaching"
            ref={(el: any) => (sectionsRef.current['coaching'] = el)}
            className="mb-12 print:mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              팀원별 코칭 제안
            </h2>

            {/* 일반 코칭 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                일반 코칭
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        팀원명(사번)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        핵심 강점
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        성장 보완점
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        협업 특성
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">
                        성과 기여
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        다음 분기 코칭 제안
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamFeedbackReport.팀원별_코칭_제안.일반_코칭.map(
                      (coaching: any, index: any) => (
                        <tr
                          key={index}
                          className={`
                            text-sm hover:bg-gray-50 transition-colors duration-200 leading-relaxed
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          `}
                        >
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900 break-keep">
                            {coaching['팀원명(사번)']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-green-700 bg-green-50">
                            {coaching['핵심_강점']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-orange-700 bg-orange-50">
                            {coaching['성장_보완점']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-blue-700">
                            {coaching['협업_특성']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium">
                            {coaching['성과_기여_요약']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {coaching['다음_분기_코칭_제안']}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 집중 코칭 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                집중 코칭
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        팀원명(사번)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        핵심 이슈
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        상세 분석
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        리스크 요소
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                        코칭 제안
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamFeedbackReport.팀원별_코칭_제안.집중_코칭.map(
                      (coaching: any, index: any) => (
                        <tr
                          key={index}
                          className={`
                            text-sm hover:bg-gray-50 transition-colors duration-200 leading-relaxed
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          `}
                        >
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900 break-keep">
                            {coaching['팀원명(사번)']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-red-700 bg-red-50">
                            {coaching['핵심_이슈']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {coaching['상세_분석']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-orange-700 bg-orange-50">
                            {coaching['리스크_요소']}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {coaching['코칭_제안']}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 리스크 및 향후 운영 제안 */}
          <section
            id="risks"
            ref={(el: any) => (sectionsRef.current['risks'] = el)}
            className="mb-12 print:mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              리스크 및 향후 운영 제안
            </h2>

            {teamFeedbackReport.리스크_및_향후_운영_제안.주요_리스크.map(
              (risk: any, index: any) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 border mb-6 ${getRiskColor(
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
                              {impact['영향_설명']}
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
                            (strategy: any, idx: number) => (
                              <div key={idx} className="">
                                {strategy['전략_설명']}
                              </div>
                            )
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}
          </section>

          {/* 총평 */}
          <section
            id="summary"
            ref={(el: any) => (sectionsRef.current['summary'] = el)}
            className="mb-12 print:mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">총평</h2>

            <div className="bg-gradient-to-r from-yellow-50/50 to-orange-50/50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-start gap-4">
                <div className="text-gray-700 leading-relaxed text-md whitespace-pre-line">
                  {teamFeedbackReport.총평.주요_인사이트
                    .split('\n')
                    .map((line: string, index: number) => (
                      <p key={index} className={index > 0 ? 'mt-4' : ''}>
                        {line
                          .split(/(\*\*.*?\*\*)/)
                          .map((part: string, partIndex: number) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <>
                                  <strong
                                    className="font-semibold"
                                    key={partIndex}
                                  >
                                    {part.slice(2, -2)}
                                  </strong>
                                </>
                              )
                            }
                            return part
                          })}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </section>

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
  )
}

export default TeamFeedbackReport
