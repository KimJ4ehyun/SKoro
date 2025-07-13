package skala.skoro.domain.evaluation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skala.skoro.domain.auth.dto.CustomUserDetails;
import skala.skoro.domain.evaluation.dto.KeywordResponse;
import skala.skoro.domain.evaluation.dto.PeerEvaluationDetailResponse;
import skala.skoro.domain.evaluation.dto.PeerEvaluationStatusResponse;
import skala.skoro.domain.evaluation.dto.SubmitPeerEvaluationRequest;
import skala.skoro.domain.evaluation.service.PeerEvaluationService;
import java.util.List;

@Tag(name = "동료 평가")
@RestController
@RequestMapping("/peer-evaluation")
@RequiredArgsConstructor
public class PeerEvaluationController {

    private final PeerEvaluationService peerEvaluationService;

    @Operation(summary = "동료 평가 리스트 조회")
    @GetMapping
    public List<PeerEvaluationStatusResponse> getPeerEvaluationStatusList(@RequestParam String empNo, @RequestParam Long periodId) {
        return peerEvaluationService.getPeerEvaluationStatusList(empNo, periodId);
    }

    @Operation(summary = "동료 평가 상세 조회")
    @GetMapping("/{peerEvaluationId}")
    public PeerEvaluationDetailResponse getDetail(@PathVariable Long peerEvaluationId) {
        return peerEvaluationService.getPeerEvaluationDetail(peerEvaluationId);
    }

    @Operation(summary = "동료 평가 제출")
    @PutMapping("/{peerEvaluationId}/submit")
    public ResponseEntity<Void> submitEvaluation(
            @PathVariable Long peerEvaluationId,
            @RequestBody SubmitPeerEvaluationRequest request) {
        peerEvaluationService.submitPeerEvaluation(peerEvaluationId, request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "기본 키워드 전체 조회")
    @GetMapping("/keywords")
    public List<KeywordResponse> getSystemKeywords() {
        return peerEvaluationService.getAllSystemKeywords();
    }

    @Operation(summary = "해당 기간 나의 동료 평가가 완료되었는지 확인")
    @GetMapping("/period/{periodId}/peer-evaluation/completed")
    public ResponseEntity<Boolean> isAllPeerEvaluationCompleted(@PathVariable Long periodId, @AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(peerEvaluationService.isAllMyPeerEvaluationCompleted(periodId, user.getUsername()));
    }

}
