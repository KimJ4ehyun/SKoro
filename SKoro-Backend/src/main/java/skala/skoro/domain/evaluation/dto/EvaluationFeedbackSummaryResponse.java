package skala.skoro.domain.evaluation.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import skala.skoro.domain.evaluation.entity.EvaluationFeedbackSummary;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EvaluationFeedbackSummaryResponse {
    private Long teamEvaluationId;
    private String content;

    public static EvaluationFeedbackSummaryResponse from(EvaluationFeedbackSummary summary) {
        return new EvaluationFeedbackSummaryResponse(summary.getTeamEvaluationId(), summary.getContent());
    }
}
