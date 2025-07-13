package skala.skoro.domain.kpi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import skala.skoro.domain.auth.dto.CustomUserDetails;
import skala.skoro.domain.kpi.dto.MyTeamKpiWithTasksResponse;
import skala.skoro.domain.kpi.dto.TeamKpiDetailResponse;
import skala.skoro.domain.kpi.dto.TeamKpiWithTasksResponse;
import skala.skoro.domain.kpi.service.TeamKpiService;
import java.util.List;

@Tag(name = "팀 KPI")
@RestController
@RequestMapping("/team-kpis")
@RequiredArgsConstructor
public class TeamKpiController {

    private final TeamKpiService teamKpiService;

    @Operation(summary = "[팀장] 팀 TASK 리스트 조회")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public ResponseEntity<List<TeamKpiDetailResponse>> getTeamKpis(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(teamKpiService.getTeamKpis(user.getUsername()));
    }

    @Operation(summary = "[팀장] 팀 목표 리스트 상세 조회")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/detail")
    public ResponseEntity<List<TeamKpiWithTasksResponse>> getTeamKpisDetail(@RequestParam int year, @AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(teamKpiService.getTeamKpisWithTasksDetail(year, user.getUsername()));
    }

    @Operation(summary = "팀 목표 리스트 상세 조회")
    @GetMapping("/my-detail")
    public ResponseEntity<List<MyTeamKpiWithTasksResponse>> getMyTeamKpisDetail(@RequestParam int year, @AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(teamKpiService.getMyTeamKpisWithTasksDetail(year, user.getUsername()));
    }
}
