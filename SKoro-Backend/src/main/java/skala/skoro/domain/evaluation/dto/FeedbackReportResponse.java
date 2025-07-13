package skala.skoro.domain.evaluation.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import skala.skoro.domain.evaluation.entity.FeedbackReport;

import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class FeedbackReportResponse {
    private Long feedbackReportId;
    private Map<String, Object> report;

    public static FeedbackReportResponse from(FeedbackReport feedbackReport) {
        return new FeedbackReportResponse(feedbackReport.getId(), feedbackReport.getReport());
    }
}
