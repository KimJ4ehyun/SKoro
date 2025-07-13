package skala.skoro.domain.evaluation.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import skala.skoro.domain.evaluation.entity.FinalEvaluationReport;
import skala.skoro.domain.evaluation.entity.TeamEvaluation;

import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class FinalEvaluationReportResponse {
    private Long finalEvaluationReportId;
    private Map<String, Object> report;

    public static FinalEvaluationReportResponse from(FinalEvaluationReport finalEvaluationReport) {
        return new FinalEvaluationReportResponse(finalEvaluationReport.getId(), finalEvaluationReport.getReport());
    }
}
