package skala.skoro.domain.evaluation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.employee.service.EmployeeService;
import skala.skoro.domain.evaluation.dto.EvaluationFeedbackSummaryResponse;
import skala.skoro.domain.evaluation.repository.EvaluationFeedbackSummaryRepository;
import skala.skoro.domain.evaluation.repository.TeamEvaluationRepository;
import skala.skoro.global.exception.CustomException;

import static skala.skoro.global.exception.ErrorCode.EVALUATION_FEEDBACK_SUMMARY_DOES_NOT_EXIST;
import static skala.skoro.global.exception.ErrorCode.TEAM_EVALUATION_DOES_NOT_EXIST;

@Service
@Transactional
@RequiredArgsConstructor
public class EvaluationFeedbackSummaryService {

    private final EmployeeService employeeService;

    private final EvaluationFeedbackSummaryRepository evaluationFeedbackSummaryRepository;

    private final TeamEvaluationRepository teamEvaluationRepository;

    @Transactional(readOnly = true)
    public EvaluationFeedbackSummaryResponse getEvaluationFeedbackSummaryByPeriodId(Long periodId, String empNo) {
        Employee employee = employeeService.findEmployeeByEmpNo(empNo);

        return teamEvaluationRepository.findByTeamAndPeriodId(employee.getTeam(), periodId)
                .map(teamEvaluation -> evaluationFeedbackSummaryRepository.findById(teamEvaluation.getId())
                        .map(EvaluationFeedbackSummaryResponse::from)
                        .orElseThrow(() -> new CustomException(EVALUATION_FEEDBACK_SUMMARY_DOES_NOT_EXIST)))
                .orElseThrow(() -> new CustomException(TEAM_EVALUATION_DOES_NOT_EXIST));
    }
}
