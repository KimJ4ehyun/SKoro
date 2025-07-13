package skala.skoro.domain.evaluation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import skala.skoro.domain.auth.dto.CustomUserDetails;
import skala.skoro.domain.evaluation.dto.EvaluationFeedbackSummaryResponse;
import skala.skoro.domain.evaluation.service.EvaluationFeedbackSummaryService;

@Tag(name = "팀장에 대한 평가 피드백 요약")
@RestController
@RequestMapping("/evaluation-feedback-summary")
@RequiredArgsConstructor
public class EvaluationFeedbackSummaryController {

    private final EvaluationFeedbackSummaryService evaluationFeedbackSummaryService;

    @Operation(summary = "[팀장] 해당 기간의 팀장에 대한 평가 피드백 요약 조회")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/{periodId}")
    public ResponseEntity<EvaluationFeedbackSummaryResponse> getEvaluationFeedbackSummary(@PathVariable("periodId") Long periodId, @AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(evaluationFeedbackSummaryService.getEvaluationFeedbackSummaryByPeriodId(periodId, user.getUsername()));
    }
}
