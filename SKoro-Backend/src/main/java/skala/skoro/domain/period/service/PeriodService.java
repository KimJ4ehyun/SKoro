package skala.skoro.domain.period.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skala.skoro.domain.evaluation.service.TeamEvaluationService;
import skala.skoro.domain.period.dto.EvaluationPeriodResponse;
import skala.skoro.domain.period.dto.PeriodAvailableResponse;
import skala.skoro.domain.period.dto.PeriodCreateRequest;
import skala.skoro.domain.period.dto.PeriodUpdateRequest;
import skala.skoro.domain.period.entity.Period;
import skala.skoro.domain.period.entity.PeriodPhase;
import skala.skoro.domain.period.repository.PeriodRepository;
import skala.skoro.global.exception.CustomException;
import java.util.List;
import java.util.stream.Collectors;

import static skala.skoro.global.exception.ErrorCode.INVALID_PHASE_TRANSITION;
import static skala.skoro.global.exception.ErrorCode.PERIOD_DOES_NOT_EXIST;

@Service
@Transactional
@RequiredArgsConstructor
public class PeriodService {

    private final PeriodRepository periodRepository;

    private final TeamEvaluationService teamEvaluationService;

    public void createPeriod(PeriodCreateRequest request) {
        int year = request.getStartDate().getYear();
        int nowOrderInYear = periodRepository.findTopByYearAndUnitOrderByOrderInYearDesc(year, request.getUnit())
                .map(Period::getOrderInYear)
                .orElse(0) + 1;

        String periodName = request.getIsFinal()
                ? String.format("%d년도 최종 평가", year)
                : String.format("%d년도 %d분기 평가", year, nowOrderInYear);

        Period savedPeriod = periodRepository.save(Period.of(request, nowOrderInYear, periodName));

        teamEvaluationService.createAllTeamEvaluations(savedPeriod);
    }

    @Transactional(readOnly = true)
    public List<PeriodAvailableResponse> findPeriodAvailable() {
        return periodRepository.findAllNotCompleted().stream()
                .map(PeriodAvailableResponse::from)
                .collect(Collectors.toList());
    }

    public void updatePeriod(Long periodId, PeriodUpdateRequest request) {
        Period period = periodRepository.findById(periodId)
                .orElseThrow(() -> new CustomException(PERIOD_DOES_NOT_EXIST));

        period.updatePeriod(request);
    }

    public void advanceToNextPhase(Long periodId) {
        Period period = periodRepository.findById(periodId)
                .orElseThrow(() -> new CustomException(PERIOD_DOES_NOT_EXIST));

        if (period.getPeriodPhase() == PeriodPhase.COMPLETED) {
            throw new CustomException(INVALID_PHASE_TRANSITION);
        }

        period.updatePeriodPhase(period.getPeriodPhase().next(period));
    }

    @Transactional(readOnly = true)
    public List<EvaluationPeriodResponse> getTeamEvaluationPeriods(String empNo) {
        return periodRepository.findPeriodsByEmpNo(empNo).stream()
                .map(EvaluationPeriodResponse::from)
                .toList();
    }

    public List<EvaluationPeriodResponse> getMemberEvaluationPeriods(String empNo) {
        return periodRepository.findMemberPeriodsByEmpNo(empNo).stream()
                .map(EvaluationPeriodResponse::from)
                .toList();
    }
}
