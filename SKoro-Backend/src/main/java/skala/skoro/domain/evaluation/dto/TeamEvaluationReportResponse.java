package skala.skoro.domain.evaluation.dto;

import lombok.*;
import skala.skoro.domain.evaluation.entity.TeamEvaluation;

import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TeamEvaluationReportResponse {
    private Long teamEvaluationId;
    private Map<String, Object> report;

    public static TeamEvaluationReportResponse from(TeamEvaluation teamEvaluation) {
        return new TeamEvaluationReportResponse(teamEvaluation.getId(), teamEvaluation.getReport());
    }

    public static TeamEvaluationReportResponse fromMiddle(TeamEvaluation teamEvaluation) {
        return new TeamEvaluationReportResponse(teamEvaluation.getId(), teamEvaluation.getMiddleReport());
    }
}
