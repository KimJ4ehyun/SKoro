package skala.skoro.domain.evaluation.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class FinalEvaluationAchievementStatsResponse {
    private Integer year;
    private Double teamAverageAchievementRate;
    private Double AllTeamAverageAchievementRate;

    public static FinalEvaluationAchievementStatsResponse from(Object[] row) {
        return new FinalEvaluationAchievementStatsResponse(
                ((Integer) row[0]),
                row[1] != null ? ((BigDecimal) row[1]).doubleValue() : null,
                row[2] != null ? ((BigDecimal) row[2]).doubleValue() : null
        );
    }
}
