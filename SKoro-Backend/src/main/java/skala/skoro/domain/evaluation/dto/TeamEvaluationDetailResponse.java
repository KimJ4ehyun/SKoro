package skala.skoro.domain.evaluation.dto;

import lombok.*;
import skala.skoro.domain.evaluation.entity.TeamEvaluation;
import skala.skoro.domain.period.entity.Period;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TeamEvaluationDetailResponse {
    private Long teamEvaluationId;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isFinal;
    private Integer year;
    private String periodName;
    private String relativePerformance;
    private Integer yearOverYearGrowth;
    private Integer averageAchievementRate;

    public static TeamEvaluationDetailResponse from(TeamEvaluation teamEvaluation) {
        Period period = teamEvaluation.getPeriod();
        return TeamEvaluationDetailResponse.builder()
                .teamEvaluationId(teamEvaluation.getId())
                .startDate(period.getStartDate())
                .endDate(period.getEndDate())
                .isFinal(period.getIsFinal())
                .year(period.getYear())
                .periodName(period.getPeriodName())
                .relativePerformance(teamEvaluation.getRelativePerformance())
                .yearOverYearGrowth(teamEvaluation.getYearOverYearGrowth())
                .averageAchievementRate(teamEvaluation.getAverageAchievementRate())
                .build();
    }
}
