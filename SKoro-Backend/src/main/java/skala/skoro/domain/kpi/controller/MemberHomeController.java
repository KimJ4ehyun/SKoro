package skala.skoro.domain.kpi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import skala.skoro.domain.auth.dto.CustomUserDetails;
import skala.skoro.domain.kpi.dto.MyContributionResponse;
import skala.skoro.domain.kpi.dto.MyFinalScoreResponse;
import skala.skoro.domain.kpi.dto.MyTaskResponse;
import skala.skoro.domain.kpi.service.MemberHomeService;
import java.util.List;

@Tag(name = "팀원 홈 화면")
@RestController
@RequestMapping("/member/home")
@RequiredArgsConstructor
public class MemberHomeController {

    private final MemberHomeService memberHomeService;

    @Operation(summary = "홈 화면 - 본인 Task 리스트 조회")
    @GetMapping("/tasks")
    public List<MyTaskResponse> getMyTasks(@AuthenticationPrincipal CustomUserDetails user) {
        return memberHomeService.getMyTasks(user.getUsername());
    }

    @Operation(summary = "홈 화면 - 분기별 달성률 조회")
    @GetMapping("/contributions")
    public List<MyContributionResponse> getMyContributions(@AuthenticationPrincipal CustomUserDetails user) {
        return memberHomeService.getMyContributions(user.getUsername());
    }

    @Operation(summary = "홈 화면 - 연도별 최종 점수 조회")
    @GetMapping("/final-scores")
    public List<MyFinalScoreResponse> getMyFinalScores(@AuthenticationPrincipal CustomUserDetails user) {
        return memberHomeService.getMyFinalScores(user.getUsername());
    }

}
