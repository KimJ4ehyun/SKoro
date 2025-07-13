package skala.skoro.domain.employee.controller;

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
import skala.skoro.domain.employee.dto.*;
import skala.skoro.domain.employee.service.EmployeeService;
import java.util.List;

@Tag(name = "사원")
@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @Operation(summary = "팀원 리스트 조회(이름, 사진)")
    @GetMapping
    public ResponseEntity<List<EmployeeSummaryResponse>> getEmployeesByPeriodAndTeam(@AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(employeeService.getEmployeesByTeam(user.getUsername()));
    }

    @Operation(summary = "팀원 리스트 조회(이름, 사진, 하향 평가 완료 여부)")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/{teamEvaluationId}/status")
    public ResponseEntity<List<EmployeeSummaryAndStatusResponse>> getEmployeesAndStatusByPeriodAndTeam(@PathVariable Long teamEvaluationId, @AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(employeeService.getEmployeesAndStatusByTeam(teamEvaluationId, user.getUsername()));
    }

    @Operation(summary = "팀원 정보 조회(동료평가)")
    @GetMapping("/{empNo}")
    public ResponseEntity<EmployeeDetailResponse> getEmployeeDetailByEmpNo(@PathVariable String empNo){
        return ResponseEntity.ok(employeeService.getEmployeeDetailByEmpNo(empNo));
    }

    @Operation(summary = "[팀장] 팀 관리 화면 - 최종 평가 카드 조회")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/{periodId}/final")
    public ResponseEntity<List<EmployeeFinalEvaluationResponse>> getFinalEmployeeSummary(@PathVariable Long periodId, @AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(employeeService.getFinalEmployeeEvaluationsByPeriod(periodId, user.getUsername()));
    }
    
    @Operation(summary = "[팀장] 팀 관리 화면 - 분기 평가 카드 조회")
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/{periodId}/non-final")
    public ResponseEntity<List<EmployeeNonFinalEvaluationResponse>> getNonFinalEmployeeSummary(@PathVariable Long periodId, @AuthenticationPrincipal CustomUserDetails user){
        return ResponseEntity.ok(employeeService.getNonFinalEmployeeEvaluationsByPeriod(periodId, user.getUsername()));
    }
}
