"""
팀장용 레포트 톤 보정 Agent - 상태 관리 및 메인 에이전트 클래스 (개선된 버전)
Team manager report tone correction agent - state management and main agent class (improved version)
"""

import json
from datetime import datetime
from enum import Enum
from dataclasses import dataclass
from typing import Dict, Any, List
from sqlalchemy import Engine, text
from langchain_openai import ChatOpenAI

from db_utils import ManagerDatabaseManager

class ManagerReportType(Enum):
    MANAGER_QUARTERLY = "manager_quarterly"  # 팀장용 분기별
    MANAGER_ANNUAL = "manager_annual"        # 팀장용 연말

@dataclass
class ManagerReportData:
    """팀장용 레포트 데이터를 담는 클래스"""
    id: int
    report_json: Dict[str, Any]
    report_type: ManagerReportType
    team_name: str
    team_leader: str
    period: str
    table_name: str  # "team_evaluations"

@dataclass
class ManagerToneCorrection:
    """팀장용 톤 보정 결과를 담는 클래스"""
    original_text: str
    corrected_text: str
    report_type: ManagerReportType
    llm_response: str
    processing_time: float

class ManagerReportToneAgent:
    """팀장용 레포트 톤 보정 Agent"""
    
    def __init__(self, engine: Engine, llm_client: ChatOpenAI):
        self.db_manager = ManagerDatabaseManager(engine)
        # LLMClient를 여기서 지연 import하여 순환 참조 방지
        from llm_utils import ManagerLLMClient
        self.llm_client = ManagerLLMClient(llm_client)
        self.processing_stats = {
            'total_processed': 0,
            'successful': 0,
            'failed': 0,
            'quarterly_reports': 0,
            'annual_reports': 0,
            'tone_corrected': 0
        }

    def load_reports_from_db(self) -> List[ManagerReportData]:
        """DB에서 모든 팀장용 레포트 로드"""        
        reports = []
        print("=== 팀장용 레포트 로드 시작 ===")

        try:
            # team_evaluations 테이블에서 레포트 로드
            print("\n📂 팀장용 레포트 로드 중...")
            team_reports = self.db_manager.fetch_team_evaluation_reports()
            print(f"DB에서 {len(team_reports)}개의 팀장용 레포트를 가져왔습니다.")
               
            for report_row in team_reports:
                try:
                    print(f"\n🔄 팀장용 레포트 ID {report_row['id']} 처리 중...")
                
                    # JSON 데이터 처리 - 이미 파싱된 JSON 객체라고 가정
                    report_json = report_row['report']
                    
                    # 만약 문자열이라면 JSON 파싱
                    if isinstance(report_json, str):
                        try:
                            report_json = json.loads(report_json)
                        except json.JSONDecodeError as e:
                            print(f"❌ JSON 파싱 실패: {e}")
                            continue
                    
                    if not isinstance(report_json, dict):
                        print(f"❌ 올바르지 않은 데이터 형식, 스킵")
                        continue
                        
                    print(f"✅ JSON 처리 성공")
                
                    report_data = ManagerReportData(
                        id=report_row['id'],
                        report_json=report_json,
                        report_type=self.identify_report_type(report_json),
                        team_name=self.extract_team_name(report_json),
                        team_leader=self.extract_team_leader(report_json),
                        period=self.extract_period(report_json),
                        table_name="team_evaluations"
                    )
                
                    reports.append(report_data)
                    print(f"✅ 팀장용 레포트 ID {report_row['id']} 로드 성공")
                    print(f"   - 팀명: {report_data.team_name}")
                    print(f"   - 팀장: {report_data.team_leader}")
                    print(f"   - 기간: {report_data.period}")
                
                except Exception as e:
                    print(f"❌ 레포트 처리 오류 (팀장용 레포트 ID: {report_row['id']}): {e}")
                    continue

        except Exception as e:
            print(f"❌ DB 로드 중 전체 오류: {e}")
            return []

        print(f"\n📊 팀장용 레포트 로드 완료!")
        print(f"   - 총 로드된 레포트: {len(reports)}개")
        quarterly_count = sum(1 for r in reports if r.report_type == ManagerReportType.MANAGER_QUARTERLY)
        annual_count = sum(1 for r in reports if r.report_type == ManagerReportType.MANAGER_ANNUAL)
        print(f"   - 분기별 레포트: {quarterly_count}개")
        print(f"   - 연말 레포트: {annual_count}개")

        return reports
    
    def identify_report_type(self, report_data: Dict[str, Any]) -> ManagerReportType:
        """레포트 타입 식별 - 연말/분기 구분"""
        try:
            period = self.extract_period(report_data).lower()
            print(f"추출된 기간: '{period}'")  # 디버깅용
        
            if '연말' in period:
                return ManagerReportType.MANAGER_ANNUAL
            elif '분기' in period:
                return ManagerReportType.MANAGER_QUARTERLY
        
            return ManagerReportType.MANAGER_QUARTERLY  # 기본값
        except Exception as e:
            print(f"레포트 타입 식별 오류: {e}")
            return ManagerReportType.MANAGER_QUARTERLY

    def extract_team_name(self, report_data: Dict[str, Any]) -> str:
        """팀명 추출"""
        try:
            basic_info_keys = ['팀_기본정보', '기본_정보', '기본 정보']

            for basic_key in basic_info_keys:
                if basic_key in report_data:
                    team_info = report_data[basic_key]
                    team_name = team_info.get('팀명')                
                    if team_name:
                        return team_name
        
            return "알 수 없는 팀"
        except Exception as e:
            print(f"팀명 추출 오류: {e}")
            return "알 수 없는 팀"

    def extract_team_leader(self, report_data: Dict[str, Any]) -> str:
        """팀장명 추출"""
        try:
            basic_info_keys = ['팀_기본정보', '기본_정보', '기본 정보']
        
            for basic_key in basic_info_keys:
                if basic_key in report_data:
                    team_info = report_data[basic_key]
                    team_leader = team_info.get('팀장명')
                    if team_leader:
                        return team_leader
        
            return "알 수 없음"
        except Exception as e:
            print(f"팀장명 추출 오류: {e}")
            return "알 수 없음"

    def extract_period(self, report_data: Dict[str, Any]) -> str:
        """업무 수행 기간 추출"""
        try:
            basic_info_keys = ['팀_기본정보', '기본_정보', '기본 정보']
            period_keys = ['업무_수행_기간', '업무 수행 기간']
                    
            for basic_key in basic_info_keys:
                if basic_key in report_data:
                    team_info = report_data[basic_key]
                    for period_key in period_keys:
                        period = team_info.get(period_key)
                        if period:
                            return period
        
            return "기간 미상"
        except Exception as e:
            print(f"기간 추출 오류: {e}")
            return "기간 미상"
    
    def correct_report_tone(self, report_data: ManagerReportData) -> ManagerToneCorrection:
        """LLM을 사용한 팀장용 레포트 톤 보정 실행"""
        start_time = datetime.now()
        
        try:
            original_text = json.dumps(report_data.report_json, ensure_ascii=False, indent=2)
            
            # LLM에 JSON 객체 직접 전달
            llm_response = self.llm_client.correct_tone(report_data.report_json, report_data.report_type)
            
            try:
                # LLM 응답에서 JSON 추출
                corrected_text = llm_response
                if "```json" in llm_response:
                    corrected_text = llm_response.split("```json")[1].split("```")[0].strip()
                elif "```" in llm_response:
                    corrected_text = llm_response.split("```")[1].strip()
                
                # JSON 유효성 검증
                corrected_json = json.loads(corrected_text)
                
                # 글자수 검증 (팀원별_성과_분석 > 팀원_성과표 > 기여_내용)
                self.validate_character_limits(corrected_json)
                
                print(f"✅ LLM 응답 JSON 파싱 및 검증 성공")
                
            except (json.JSONDecodeError, IndexError) as e:
                print(f"⚠️ LLM 응답 JSON 파싱 오류: {e}")
                corrected_text = original_text
            
            processing_time = (datetime.now() - start_time).total_seconds()
            
            return ManagerToneCorrection(
                original_text=original_text,
                corrected_text=corrected_text,
                report_type=report_data.report_type,
                llm_response=llm_response,
                processing_time=processing_time
            )
            
        except Exception as e:
            print(f"❌ 톤 보정 중 오류: {e}")
            processing_time = (datetime.now() - start_time).total_seconds()
            original_text = json.dumps(report_data.report_json, ensure_ascii=False, indent=2)
            
            return ManagerToneCorrection(
                original_text=original_text,
                corrected_text=original_text,
                report_type=report_data.report_type,
                llm_response=f"오류 발생: {str(e)}",
                processing_time=processing_time
            )
    
    def validate_character_limits(self, report_json: Dict[str, Any]) -> None:
        """글자수 제한 검증 (팀원별 기여_내용 200자 이내)"""
        try:
            team_analysis = report_json.get('팀원_성과_분석', {})
            team_members = team_analysis.get('팀원별_기여도', [])
            
            for member in team_members:
                contribution = member.get('기여_내용', '')
                member_name = member.get('이름', 'Unknown')
                
                if len(contribution) > 200:
                    print(f"⚠️ 글자수 초과: {member_name} - {len(contribution)}자 (기여_내용)")
                else:
                    print(f"✅ 글자수 준수: {member_name} - {len(contribution)}자 (기여_내용)")
                    
        except Exception as e:
            print(f"⚠️ 글자수 검증 오류: {e}")
    
    def save_corrected_report(self, report_data: ManagerReportData, corrected_text: str) -> bool:
        """보정된 레포트를 DB에 저장"""
        try:
            return self.db_manager.update_team_evaluation_report(report_data.id, corrected_text)
        except Exception as e:
            print(f"❌ DB 저장 오류 (ID: {report_data.id}): {e}")
            return False
    
    def process_all_reports(self) -> List[ManagerToneCorrection]:
        """모든 팀장용 레포트 처리 및 DB 저장"""
        try:
            reports = self.load_reports_from_db()
        except Exception as e:
            print(f"❌ 레포트 로드 실패: {e}")
            return []
        
        if reports is None or len(reports) == 0:
            print("⚠️ 처리할 팀장용 레포트가 없습니다.")
            return []
        
        corrections = []
        
        print(f"\n🚀 총 {len(reports)}개의 팀장용 레포트를 LLM으로 처리합니다.")
        
        for i, report_data in enumerate(reports, 1):
            print(f"\n[{i}/{len(reports)}] 처리 중: {report_data.team_name} ({report_data.team_leader}) - {report_data.period}")
            
            try:
                self.processing_stats['total_processed'] += 1
                
                if report_data.report_type == ManagerReportType.MANAGER_QUARTERLY:
                    self.processing_stats['quarterly_reports'] += 1
                else:
                    self.processing_stats['annual_reports'] += 1
                
                correction = self.correct_report_tone(report_data)
                corrections.append(correction)
                
                print(f"  ⏱️  처리 시간: {correction.processing_time:.2f}초")
                
                # 톤 보정 여부 확인
                if correction.corrected_text != correction.original_text:
                    self.processing_stats['tone_corrected'] += 1
                
                success = self.save_corrected_report(report_data, correction.corrected_text)
                if success:
                    print(f"  ✅ DB 업데이트 성공")
                    self.processing_stats['successful'] += 1
                else:
                    print(f"  ❌ DB 업데이트 실패")
                    self.processing_stats['failed'] += 1
                
            except Exception as e:
                print(f"  ❌ 처리 오류: {e}")
                self.processing_stats['failed'] += 1
                continue
        
        return corrections
    
    def get_processing_statistics(self) -> Dict[str, int]:
        """처리 통계 반환"""
        return self.processing_stats.copy()
    
    def reset_statistics(self):
        """통계 초기화"""
        self.processing_stats = {
            'total_processed': 0,
            'successful': 0,
            'failed': 0,
            'quarterly_reports': 0,
            'annual_reports': 0,
            'tone_corrected': 0
        }
        print("📊 팀장용 Agent 통계가 초기화되었습니다.")
    
    def print_summary(self):
        """처리 결과 요약 출력"""
        stats = self.processing_stats
        success_rate = (stats['successful'] / stats['total_processed'] * 100) if stats['total_processed'] > 0 else 0
        
        print(f"""
📊 ManagerReportToneAgent 처리 완료
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔢 처리 통계:
   - 총 처리된 레포트: {stats['total_processed']}개
   - 성공: {stats['successful']}개
   - 실패: {stats['failed']}개
   - 성공률: {success_rate:.1f}%

📋 레포트 타입별:
   - 팀장용 분기별 레포트: {stats['quarterly_reports']}개
   - 팀장용 연말 레포트: {stats['annual_reports']}개

🎯 톤 보정:
   - 실제 톤 보정된 레포트: {stats['tone_corrected']}개

🔧 Agent 상태: {'✅ 정상 완료' if stats['total_processed'] > 0 else '⏳ 대기 중'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        """)

# 테스트 및 검증 함수
def quick_test_manager(engine, llm_client):
    """팀장용 Agent 빠른 테스트"""
    print("=== 팀장용 Agent 빠른 테스트 ===")
    
    # Agent 초기화 테스트
    try:
        manager_agent = ManagerReportToneAgent(engine, llm_client)
        print("✅ 팀장용 Agent 초기화 성공")
        
        # 레포트 로드 테스트
        reports = manager_agent.load_reports_from_db()
        print(f"✅ 팀장용 레포트 로드 성공: {len(reports)}개")
        
        if reports:
            print("✅ 모든 기본 기능 정상 작동")
            return True
        else:
            print("⚠️ 처리할 팀장용 레포트가 없음")
            return True
            
    except Exception as e:
        print(f"❌ 팀장용 Agent 테스트 실패: {e}")
        return False