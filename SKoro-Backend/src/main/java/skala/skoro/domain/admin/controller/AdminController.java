package skala.skoro.domain.admin.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import skala.skoro.domain.admin.service.PeerEvaluationNotificationService;
import skala.skoro.domain.evaluation.service.PeerEvaluationService;
import skala.skoro.domain.evaluation.service.TeamEvaluationService;
import skala.skoro.domain.kpi.service.TaskService;
import skala.skoro.domain.period.dto.PeriodAvailableResponse;
import skala.skoro.domain.period.dto.PeriodCreateRequest;
import skala.skoro.domain.period.dto.PeriodUpdateRequest;
import skala.skoro.domain.period.service.PeriodService;
import java.util.List;

@Tag(name = "관리자 기능")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final PeriodService periodService;

    private final PeerEvaluationService peerEvaluationService;

    private final PeerEvaluationNotificationService peerEvaluationNotificationService;

    private final TaskService taskService;

    private final TeamEvaluationService teamEvaluationService;

    @Operation(summary = "[관리자] 평가 기간 생성")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/period")
    public ResponseEntity<?> createPeriod(@RequestBody PeriodCreateRequest request) {
        periodService.createPeriod(request);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Operation(summary = "[관리자] 현재 진행 중인 혹은 다가올 평가 기간이 있으면 조회")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/period/available")
    public ResponseEntity<List<PeriodAvailableResponse>> findPeriodsAvailable() {
        return ResponseEntity.ok(periodService.findPeriodAvailable());
    }

    @Operation(summary = "[관리자] 평가 기간 수정")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/period/{periodId}")
    public ResponseEntity<?> updatePeriod(@PathVariable Long periodId,
                                          @RequestBody PeriodUpdateRequest request) {
        periodService.updatePeriod(periodId, request);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "[관리자] 다음 평가 단계로 전환")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/period/{periodId}/next-phase")
    public ResponseEntity<?> advanceToNextPhase(@PathVariable Long periodId) {
        periodService.advanceToNextPhase(periodId);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "[관리자] 동료 평가 동료 매칭 및 동료 평가 시작 메일 발송")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/notify/peer-evaluation")
    public ResponseEntity<Void> notifyPeerEvaluation(@RequestParam Long periodId) {
        peerEvaluationNotificationService.startPeerEvaluation(periodId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "[관리자] 올해 개인 TASK 생성 여부 확인")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/tasks/generated")
    public ResponseEntity<Boolean> isCurrentYearTasksGenerated() {
        return ResponseEntity.ok(taskService.isCurrentYearTasksGenerated());
    }

    @Operation(summary = "[관리자] 해당 기간의 동료 평가가 완료되었는지 확인")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/period/{periodId}/peer-evaluation/completed")
    public ResponseEntity<Boolean> isAllPeerEvaluationCompleted(@PathVariable Long periodId) {
        return ResponseEntity.ok(peerEvaluationService.isAllPeerEvaluationCompleted(periodId));
    }

    @Operation(summary = "[관리자] 해당 기간의 하향 평가가 완료되었는지 확인")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/period/{periodId}/team-evaluation/submitted")
    public ResponseEntity<Boolean> isAllManagerEvaluationSubmitted(@PathVariable Long periodId) {
        return ResponseEntity.ok(teamEvaluationService.isAllManagerEvaluationSubmitted(periodId));
    }
}
