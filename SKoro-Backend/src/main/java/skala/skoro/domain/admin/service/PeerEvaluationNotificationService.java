package skala.skoro.domain.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.employee.entity.Role;
import skala.skoro.domain.employee.repository.EmployeeRepository;
import skala.skoro.domain.evaluation.entity.PeerEvaluation;
import skala.skoro.domain.evaluation.entity.TeamEvaluation;
import skala.skoro.domain.evaluation.entity.TeamEvaluationStatus;
import skala.skoro.domain.evaluation.repository.PeerEvaluationRepository;
import skala.skoro.domain.evaluation.repository.TeamEvaluationRepository;
import skala.skoro.domain.kpi.entity.TeamKpi;
import skala.skoro.domain.kpi.repository.TaskRepository;
import skala.skoro.domain.kpi.repository.TeamKpiRepository;
import skala.skoro.domain.period.entity.Period;
import skala.skoro.domain.period.entity.PeriodPhase;
import skala.skoro.domain.period.repository.PeriodRepository;
import skala.skoro.global.exception.CustomException;
import java.time.LocalDate;
import java.util.*;

import static skala.skoro.global.exception.ErrorCode.PERIOD_DOES_NOT_EXIST;

@Service
@Transactional
@RequiredArgsConstructor
public class PeerEvaluationNotificationService {

    private final EmailService emailService;
    private final PeriodRepository periodRepository;
    private final EmployeeRepository employeeRepository;
    private final TeamEvaluationRepository teamEvaluationRepository;
    private final TeamKpiRepository teamKpiRepository;
    private final TaskRepository taskRepository;
    private final PeerEvaluationRepository peerEvaluationRepository;

    public void sendPeerEvaluationNotification(Long periodId) {
        Period period = periodRepository.findById(periodId)
                .orElseThrow(() -> new IllegalArgumentException("평가 기간이 존재하지 않습니다."));

        LocalDate endDate = period.getEndDate();
        LocalDate startDate = endDate.minusDays(7);
        LocalDate evaluationEndDate = startDate.plusDays(4);

        String subject = "[요청] %d년 %s PeerTalk 요청이 도착했어요!"
                .formatted(period.getYear(), period.getPeriodName());

        String html = """
                <!DOCTYPE html>
                <html lang="ko">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>SKoro PeerTalk 동료 평가 안내</title>
                    <style>
                      * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                      }
               \s
                      body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          'Malgun Gothic', '맑은 고딕', Arial, sans-serif;
                        background: #ffffff;
                        color: #333333;
                        line-height: 1.6;
                        padding: 20px;
                      }
               \s
                      .email-container {
                        /* max-width: 600px; */
                        margin: 0 auto;
                        background: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        overflow: hidden;
                      }
               \s
                      .email-header {
                        background: #ffffff;
                        border-bottom: 2px solid #3c8eff;
                        padding: 30px;
                        position: relative;
                      }
               \s
                      .sk-logo {
                        position: absolute;
                        top: 20px;
                        right: 30px;
                        width: 60px;
                        height: 30px;
                        background: #f0f0f0;
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        color: #666;
                        border: 1px solid #ddd;
                      }
               \s
                      .service-branding {
                        color: #3c8eff;
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 4px;
                      }
               \s
                      .email-title {
                        font-size: 24px;
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 8px;
                      }
               \s
                      .email-subtitle {
                        font-size: 16px;
                        color: #6b7280;
                        font-weight: 400;
                      }
               \s
                      .email-body {
                        padding: 40px;
                        background: #ffffff;
                      }
               \s
                      .greeting {
                        font-size: 18px;
                        color: #1f2937;
                        margin-bottom: 24px;
                        font-weight: 600;
                      }
               \s
                      .main-content {
                        font-size: 16px;
                        color: #374151;
                        margin-bottom: 32px;
                      }
               \s
                      .evaluation-method {
                        background: #f8faff;
                        border: 1px solid #e0ebff;
                        border-left: 4px solid #3c8eff;
                        padding: 24px;
                        margin: 24px 0;
                        border-radius: 4px;
                      }
               \s
                      .method-title {
                        font-size: 16px;
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 12px;
                      }
               \s
                      .method-list {
                        color: #374151;
                        font-size: 14px;
                      }
               \s
                      .method-item {
                        margin-bottom: 8px;
                        padding-left: 16px;
                        position: relative;
                      }
               \s
                      .method-item:before {
                        content: '•';
                        color: #3c8eff;
                        font-weight: bold;
                        position: absolute;
                        left: 0;
                      }
               \s
                      .highlight-box {
                        background: #f9fafb;
                        border: 1px solid #e5e7eb;
                        border-left: 4px solid #3c8eff;
                        padding: 24px;
                        margin: 24px 0;
                        border-radius: 4px;
                      }
               \s
                      .period-title {
                        font-size: 14px;
                        color: #6b7280;
                        margin-bottom: 8px;
                        font-weight: 500;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                      }
               \s
                      .period-date {
                        font-size: 20px;
                        font-weight: 700;
                        color: #3c8eff;
                      }
               \s
                      .cta-section {
                        background: #f8faff;
                        border: 1px solid #e0ebff;
                        border-radius: 4px;
                        padding: 24px;
                        text-align: center;
                        margin: 24px 0;
                      }
               \s
                      .cta-button {
                        display: inline-block;
                        background: #3c8eff;
                        color: #ffffff;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 4px;
                        font-weight: 600;
                        font-size: 16px;
                        transition: background-color 0.3s ease;
                      }
               \s
                      .cta-button:hover {
                        background: #2563eb;
                      }
               \s
                      .important-note {
                        background: #fffef2;
                        border: 1px solid #ffea7e;
                        border-left: 4px solid #ffde79;
                        padding: 16px;
                        margin: 20px 0;
                        border-radius: 4px;
                      }
               \s
                      .note-content {
                        color: #987715;
                        font-size: 14px;
                        font-weight: 500;
                      }
               \s
                      .signature {
                        margin-top: 40px;
                        padding-top: 24px;
                        border-top: 1px solid #e5e7eb;
                        color: #6b7280;
                      }
               \s
                      .signature-title {
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 4px;
                      }
               \s
                      .footer {
                        background: #f9fafb;
                        padding: 24px;
                        text-align: center;
                        border-top: 1px solid #e5e7eb;
                      }
               \s
                      .company-info {
                        font-size: 12px;
                        color: #6b7280;
                        line-height: 1.6;
                      }
               \s
                      .company-info strong {
                        color: #1f2937;
                      }
               \s
                      .divider {
                        height: 1px;
                        background: #e5e7eb;
                        margin: 16px 0;
                      }
               \s
                      /* 이메일 클라이언트 호환성을 위한 테이블 기반 레이아웃 */
                      table {
                        border-collapse: collapse;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                      }
               \s
                      @media (max-width: 600px) {
                        .email-header {
                          padding: 20px;
                        }
               \s
                        .sk-logo {
                          top: 15px;
                          right: 20px;
                          width: 50px;
                          height: 25px;
                        }
               \s
                        .service-branding {
                          font-size: 28px;
                        }
               \s
                        .email-title {
                          font-size: 20px;
                        }
               \s
                        .email-body {
                          padding: 24px;
                        }
                      }
                    </style>
                  </head>
                  <body>
                    <div class="email-container">
                      <div class="email-header">
                        <!-- SK 로고 이미지가 들어갈 자리 -->
                        <!--\s
                            <div class="sk-logo">
                                <img src="sk-logo.png" alt="SK Logo" style="width: 100%%; height: 100%%; object-fit: contain;" />
                            </div>\s
                        -->
                        <div class="service-branding">SKoro</div>
                        <div class="email-title">PeerTalk 동료 평가</div>
                        <div class="email-subtitle">상호 성장을 위한 동료 피드백 시스템</div>
                      </div>
               \s
                      <div class="email-body">
                        <div class="greeting">안녕하세요, SK AX 구성원 여러분!</div>
               \s
                        <div class="main-content">
                          지난 <strong>%s</strong> 동안 함께 협업한 동료들과의 경험을 바탕으로
                          <strong>SKoro PeerTalk</strong>를 진행합니다.<br /><br />
                          동료의 성장과 팀의 발전을 위한 건설적인 피드백을 나누는 소중한 시간이
                          되기를 바랍니다.
                        </div>
               \s
                        <div class="highlight-box">
                          <div class="method-title">평가 진행 방식</div>
                          <div class="method-list">
                            <div class="method-item">
                              <strong>협업 방식 선택:</strong> 동료와의 주요 협업 방식을
                              선택해주세요
                            </div>
                            <div class="method-item">
                              <strong>키워드 선택:</strong> 동료의 강점과 개선점을 키워드로
                              표현해주세요
                            </div>
                          </div>
                        </div>
               \s
                        <div class="highlight-box">
                          <div class="method-title">평가 진행 기간</div>
                          <div class="period-date">%s ~ %s</div>
                        </div>
               \s
                        <div class="cta-section">
                          <p style="margin-bottom: 16px; color: #374151; font-weight: 500">
                            동료 평가에 참여해주세요
                          </p>
                          <a
                            href="https://skoro.skala25a.project.skala-ai.com/"
                            class="cta-button"
                            target="_blank"
                            >SKoro PeerTalk 시작하기</a
                          >
                        </div>
               \s
                        <div class="important-note">
                          <div class="note-content">
                            <strong>참여 안내</strong> <br />
                            평가 소요시간은 약 10-15분이며, 모든 평가는 익명으로 처리됩니다.
                            <br />구체적이고 건설적인 피드백을 부탁드립니다.
                          </div>
                        </div>
               \s
                        <div class="signature">
                          <div class="signature-title">감사합니다.</div>
                          <div>SK AX 인사팀 & SKoro 운영팀</div>
                        </div>
                      </div>
               \s
                      <div class="footer">
                        <div class="company-info">
                          <strong>SK AX</strong><br />
                          경기도 성남시 분당구 성남대로 343번길 9 SK-U 타워<br />
                          대표전화: 02-0000-0000 | 이메일: hr@sk-ax.com<br />
                          <div class="divider"></div>
                          본 메일은 발신 전용입니다. 문의사항은 인사팀(hr@sk-ax.com)으로 연락
                          바랍니다.<br />
                          © 2025 SK AX. All rights reserved.
                        </div>
                      </div>
                    </div>
                  </body>
                </html>
       \s""".formatted(period.getPeriodName(), startDate, evaluationEndDate);

        // **전체 사원 이메일 목록 조회**
        List<Employee> allEmployees = employeeRepository.findAll();

        for (Employee employee : allEmployees) {
            String to = employee.getEmail();
            if (to != null && !to.isBlank()) {
                emailService.sendMail(to, subject, html);
            }
        }
    }

    public void generatePeerEvaluations(Long teamEvaluationId) {
        TeamEvaluation teamEval = teamEvaluationRepository.findById(teamEvaluationId)
                .orElseThrow(() -> new IllegalArgumentException("팀 평가 없음"));

        Long teamId = teamEval.getTeam().getId();

        Map<String, PeerEvaluation> createdPairs = new HashMap<>();

        // 2. 해당 팀의 KPI 전체 조회
        List<TeamKpi> teamKpis = teamKpiRepository.findByTeam_IdAndYear(teamId, LocalDate.now().getYear());

        for (TeamKpi teamKpi : teamKpis) {
            Long teamKpiId = teamKpi.getId();
            String kpiName = teamKpi.getKpiName();

            // 3. 해당 KPI를 수행한 사원들 조회
            List<String> empNos = taskRepository.findEmployeesByTeamKpiId(teamKpiId).stream()
                    .filter(employee -> Role.MEMBER.equals(employee.getRole()))
                    .map(Employee::getEmpNo)
                    .toList();

            // 4. 사원-사원(자기 자신 제외) 모든 조합으로 동료 평가 레코드 생성
            for (String evaluator : empNos) {
                for (String target : empNos) {
                    if (!evaluator.equals(target)) {
                        String key = evaluator + "->" + target;

                        if (createdPairs.containsKey(key)) {
                            createdPairs.get(key).updateJointTask(kpiName);
                        } else {
                            Employee evaluatorEmp = employeeRepository.findById(evaluator)
                                    .orElseThrow(() -> new IllegalArgumentException("사번 없음: " + evaluator));
                            Employee targetEmp = employeeRepository.findById(target)
                                    .orElseThrow(() -> new IllegalArgumentException("사번 없음: " + target));

                            PeerEvaluation entity = PeerEvaluation.builder()
                                    .isCompleted(false)
                                    .jointTask(kpiName)
                                    .employee(evaluatorEmp)
                                    .targetEmployee(targetEmp)
                                    .teamEvaluation(teamEval)
                                    .build();

                            createdPairs.put(key, entity);
                        }
                    }
                }
            }
        }
        peerEvaluationRepository.saveAll(createdPairs.values());
    }

    // 동료평가 시작: 메일 발송 + 동료평가 매핑 자동 생성
    public void startPeerEvaluation(Long periodId) {
        // 1. 메일 발송
        sendPeerEvaluationNotification(periodId);

        // 2. 팀별 동료평가 자동 생성
        // - 해당 period에 연결된 모든 TeamEvaluation을 찾아서 반복
        List<TeamEvaluation> teamEvals = teamEvaluationRepository.findByPeriod_Id(periodId);
        for (TeamEvaluation teamEval : teamEvals) {
            generatePeerEvaluations(teamEval.getId());
            teamEval.updateStatus(TeamEvaluationStatus.IN_PROGRESS);
        }

        Period period = periodRepository.findById(periodId)
                .orElseThrow(() -> new CustomException(PERIOD_DOES_NOT_EXIST));

        period.updatePeriodPhase(PeriodPhase.PEER_EVALUATION);
    }
}
