package skala.skoro.domain.employee.dto;

import lombok.*;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.evaluation.entity.FeedbackReport;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EmployeeNonFinalEvaluationResponse {
    private String empNo;
    private String empName;
    private String profileImage;
    private String position;
    private Integer contributionRate;
    private Integer aiAchievementRate;
    private String attitude;
    private Integer ranking;

    public static EmployeeNonFinalEvaluationResponse from(FeedbackReport feedbackReport) {
        Employee employee = feedbackReport.getEmployee();
        return EmployeeNonFinalEvaluationResponse.builder()
                .empNo(employee.getEmpNo())
                .empName(employee.getEmpName())
                .profileImage(employee.getProfileImage())
                .position(employee.getPosition())
                .contributionRate(feedbackReport.getContributionRate())
                .aiAchievementRate(feedbackReport.getAiAchievementRate())
                .attitude(feedbackReport.getAttitude())
                .ranking(feedbackReport.getRanking())
                .build();
    }
}
