"""
팀장용 레포트 톤 보정 Agent 메인 실행 함수 (개선된 버전)
Team manager report tone correction agent main execution function (improved version)
"""

from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

from db_utils import engine
from agent import ManagerReportToneAgent, quick_test_manager

# 환경 변수 로드
load_dotenv()

# LLM 클라이언트 설정
llm_client = ChatOpenAI(model="gpt-4o", temperature=0)
print(f"LLM Client initialized: {llm_client.model_name}")

def validate_corrections(corrections):
    """보정 결과 검증"""
    validation_results = {
        'total_corrections': len(corrections),
        'successful_tone_corrections': 0,
        'character_limit_violations': 0,
        'json_parsing_errors': 0,
        'processing_errors': 0
    }
    
    for correction in corrections:
        try:
            # 톤 보정 여부 확인
            if correction.corrected_text != correction.original_text:
                validation_results['successful_tone_corrections'] += 1
            
            # JSON 파싱 검증
            import json
            try:
                corrected_json = json.loads(correction.corrected_text)
                
                # 글자수 제한 검증 - 올바른 경로 사용
                team_analysis = corrected_json.get('팀원_성과_분석', {})
                team_members = team_analysis.get('팀원별_기여도', [])
                
                for member in team_members:
                    contribution = member.get('기여_내용', '')
                    member_name = member.get('이름', 'Unknown')
                    
                    if len(contribution) > 200:
                        validation_results['character_limit_violations'] += 1
                        print(f"⚠️ 글자수 초과: {member_name} - {len(contribution)}자 (기여_내용)")
                        
            except json.JSONDecodeError:
                validation_results['json_parsing_errors'] += 1
                
        except Exception as e:
            validation_results['processing_errors'] += 1
            print(f"⚠️ 검증 중 오류: {e}")
    
    return validation_results

def print_validation_summary(validation_results):
    """검증 결과 요약 출력"""
    print(f"""
🔍 레포트 보정 결과 검증
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 검증 통계:
   - 총 보정 시도: {validation_results['total_corrections']}개
   - 성공적인 톤 보정: {validation_results['successful_tone_corrections']}개
   - 글자수 제한 위반: {validation_results['character_limit_violations']}개
   - JSON 파싱 오류: {validation_results['json_parsing_errors']}개
   - 처리 오류: {validation_results['processing_errors']}개

✅ 품질 지표:
   - 톤 보정 성공률: {(validation_results['successful_tone_corrections'] / validation_results['total_corrections'] * 100) if validation_results['total_corrections'] > 0 else 0:.1f}%
   - 글자수 준수율: {((validation_results['total_corrections'] - validation_results['character_limit_violations']) / validation_results['total_corrections'] * 100) if validation_results['total_corrections'] > 0 else 0:.1f}%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    """)

def main_manager():
    """팀장용 Agent 메인 실행 함수"""
    print("=== 팀장용 레포트 톤 보정 Agent 실행 ===")
    
    # Agent 초기화
    manager_agent = ManagerReportToneAgent(engine, llm_client)
    
    # DB 통계 확인
    db_stats = manager_agent.db_manager.get_report_statistics()
    print(f"""
📊 데이터베이스 현황:
   - 전체 레포트: {db_stats['total_reports']}개
   - 데이터 포함: {db_stats['reports_with_data']}개
   - 데이터 없음: {db_stats['reports_without_data']}개
    """)
    
    # 모든 레포트 처리 및 DB 저장
    corrections = manager_agent.process_all_reports()
    
    # 기본 결과 출력
    print(f"\n📊 처리 완료: 총 {len(corrections)}개 팀장용 레포트")
    
    # 상세 통계 출력
    manager_agent.print_summary()
    
    # 평균 처리 시간 계산
    if corrections:
        avg_time = sum(c.processing_time for c in corrections) / len(corrections)
        print(f"\n⏱️ 평균 처리 시간: {avg_time:.2f}초")
        
        # 전체 처리 시간 계산
        total_time = sum(c.processing_time for c in corrections)
        print(f"🕐 총 처리 시간: {total_time:.2f}초")
    
    # 보정 결과 검증
    if corrections:
        validation_results = validate_corrections(corrections)
        print_validation_summary(validation_results)
    
    return corrections

def test_single_report():
    """단일 레포트 테스트 함수 (디버깅용)"""
    print("=== 단일 레포트 테스트 ===")
    
    manager_agent = ManagerReportToneAgent(engine, llm_client)
    reports = manager_agent.load_reports_from_db()
    
    if reports:
        # 첫 번째 레포트로 테스트
        test_report = reports[0]
        print(f"테스트 대상: {test_report.team_name} ({test_report.team_leader})")
        
        correction = manager_agent.correct_report_tone(test_report)
        
        print(f"원본 길이: {len(correction.original_text)}자")
        print(f"보정 길이: {len(correction.corrected_text)}자")
        print(f"처리 시간: {correction.processing_time:.2f}초")
        
        # 글자수 검증 - 올바른 경로 사용
        try:
            test_json = json.loads(correction.corrected_text) if correction.corrected_text.startswith('{') else json.loads(correction.original_text)
            manager_agent.validate_character_limits(test_json)
        except:
            print("글자수 검증 실패")
        
        return correction
    else:
        print("테스트할 레포트가 없습니다.")
        return None

if __name__ == "__main__":
    import sys
    
    # 빠른 테스트 실행
    print("=== 팀장용 시스템 테스트 시작 ===")
    test_result = quick_test_manager(engine, llm_client)
    
    if test_result:
        # 명령행 인자 확인
        if len(sys.argv) > 1 and sys.argv[1] == "--test-single":
            print("\n=== 단일 레포트 테스트 모드 ===")
            correction = test_single_report()
        else:
            print("\n=== 팀장용 메인 프로세스 시작 ===")
            corrections = main_manager()
    else:
        print("\n❌ 팀장용 시스템 테스트 실패, 메인 프로세스를 실행하지 않습니다.")
        
    print("\n🎯 실행 완료!")
    print("추가 옵션:")
    print("  python run_module_tone_team.py --test-single  # 단일 레포트 테스트")