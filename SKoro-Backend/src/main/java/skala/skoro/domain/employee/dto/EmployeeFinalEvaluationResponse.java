package skala.skoro.domain.employee.dto;

import lombok.*;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.evaluation.entity.FinalEvaluationReport;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EmployeeFinalEvaluationResponse {
    private String empNo;
    private String empName;
    private String profileImage;
    private String position;
    private Integer contributionRate;
    private Integer aiAnnualAchievementRate;
    private Double score;
    private Integer ranking;

    public static EmployeeFinalEvaluationResponse from(FinalEvaluationReport finalEvaluationReport) {
        Employee employee = finalEvaluationReport.getEmployee();
        return EmployeeFinalEvaluationResponse.builder()
                .empNo(employee.getEmpNo())
                .empName(employee.getEmpName())
                .profileImage(employee.getProfileImage())
                .position(employee.getPosition())
                .contributionRate(finalEvaluationReport.getContributionRate())
                .aiAnnualAchievementRate(finalEvaluationReport.getAiAnnualAchievementRate())
                .score(finalEvaluationReport.getScore())
                .ranking(finalEvaluationReport.getRanking())
                .build();
    }
}
