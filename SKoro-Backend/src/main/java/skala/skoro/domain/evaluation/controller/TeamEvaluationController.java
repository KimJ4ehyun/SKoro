package skala.skoro.domain.evaluation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skala.skoro.domain.auth.dto.CustomUserDetails;
import skala.skoro.domain.evaluation.dto.*;
import skala.skoro.domain.evaluation.service.TeamEvaluationService;
import java.util.List;

@Tag(name = "팀 평가(분기, 최종)")
@RestController
@RequestMapping("/team-evaluation")
@RequiredArgsConstructor
public class TeamEvaluationController {

    private final TeamEvaluationService teamEvaluationService;

    @Operation(summary = "[팀장] 홈 화면 - 팀 분기 평가 상세 조회")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public ResponseEntity<List<TeamEvaluationDetailResponse>> findTeamEvaluationsByYear(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(teamEvaluationService.findTeamEvaluationsByYear(user.getUsername()));
    }

    @Operation(summary = "[팀장] 해당 기간의 팀 평가 레포트 조회")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/report/{periodId}")
    public ResponseEntity<TeamEvaluationReportResponse> getTeamEvaluationReport(@PathVariable Long periodId, @AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(teamEvaluationService.getTeamEvaluationReportByPeriodId(periodId, user.getUsername()));
    }

    @Operation(summary = "[팀장] 해당 기간의 팀 중간 평가 레포트 조회(임시)")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/report/middle/{periodId}")
    public ResponseEntity<TeamEvaluationReportResponse> getTeamMiddleReport(@PathVariable Long periodId, @AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(teamEvaluationService.getTeamMiddleReportByPeriodId(periodId, user.getUsername()));
    }
    
    @Operation(summary = "[팀장] 홈 화면 - 최종 평가인 팀의 평균 달성률, 전체 팀의 평균 달성률 조회")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/average-achievement-rate")
    public ResponseEntity<List<FinalEvaluationAchievementStatsResponse>> getFinalTeamEvaluationAverageAchievementRate(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(teamEvaluationService.getFinalTeamAndAllAverageAchievementRate(user.getUsername()));
    }

    @Operation(summary = "[팀장] 하향 평가 제출")
    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{teamEvaluationId}/submit")
    public ResponseEntity<Void> submitEvaluation(@PathVariable Long teamEvaluationId){
        teamEvaluationService.submitEvaluation(teamEvaluationId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "해당 기간에 활성화된 팀 평가 완료 여부 조회(버튼 활성화)")
    @GetMapping("/status")
    public ResponseEntity<List<TeamEvaluationStatusResponse>> getTeamEvaluationStatus(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(teamEvaluationService.getTeamEvaluationStatus(user.getUsername()));
    }
}
