package skala.skoro.domain.evaluation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import skala.skoro.domain.auth.dto.CustomUserDetails;
import skala.skoro.domain.evaluation.dto.EvaluationFeedbackSaveRequest;
import skala.skoro.domain.evaluation.service.EvaluationFeedbackService;

@Tag(name = "팀장에 대한 피드백 저장")
@RestController
@RequiredArgsConstructor
@RequestMapping("/evaluation-feedback")
public class EvaluationFeedbackController {

    private final EvaluationFeedbackService evaluationFeedbackService;

    @Operation(summary = "해당 기간의 팀장에 대한 피드백 저장")
    @PostMapping
    public ResponseEntity<Void> saveFeedback(@RequestBody EvaluationFeedbackSaveRequest request, @AuthenticationPrincipal CustomUserDetails user) {
        evaluationFeedbackService.saveFeedback(request, user.getEmployee());
        return ResponseEntity.ok().build();
    }
}
