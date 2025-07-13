package skala.skoro.domain.period.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import skala.skoro.domain.auth.dto.CustomUserDetails;
import skala.skoro.domain.period.dto.EvaluationPeriodResponse;
import skala.skoro.domain.period.service.PeriodService;
import java.util.List;

@Tag(name = "기간")
@RestController
@RequiredArgsConstructor
public class PeriodController {

    private final PeriodService periodService;

    @Operation(summary = "팀의 평가 기간 목록 조회(연도, 분기 선택할 때 사용)")
    @GetMapping("/periods")
    public ResponseEntity<List<EvaluationPeriodResponse>> getTeamEvaluationPeriods(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(periodService.getTeamEvaluationPeriods(user.getUsername()));
    }

    @Operation(summary = "팀원의 평가 기간 목록 조회(연도, 분기 선택할 때 사용)")
    @GetMapping("/periods/{empNo}")
    public ResponseEntity<List<EvaluationPeriodResponse>> getMemberEvaluationPeriods(@PathVariable String empNo) {
        return ResponseEntity.ok(periodService.getMemberEvaluationPeriods(empNo));
    }
}
