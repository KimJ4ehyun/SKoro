package skala.skoro.domain.evaluation.dto;

import lombok.*;
import skala.skoro.domain.evaluation.entity.Status;
import skala.skoro.domain.evaluation.entity.TempEvaluation;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TempEvaluationResponse {
    private Long tempEvaluationId;
    private String empNo;
    private String aiReason;
    private Double score;
    private String comment;
    private String reason;
    private Status status;

    public static TempEvaluationResponse from(TempEvaluation tempEvaluation) {
        return TempEvaluationResponse.builder()
                .tempEvaluationId(tempEvaluation.getId())
                .empNo(tempEvaluation.getEmployee().getEmpNo())
                .aiReason(tempEvaluation.getAiReason())
                .score(tempEvaluation.getManagerScore() != null
                        ? tempEvaluation.getManagerScore()
                        : tempEvaluation.getScore())
                .comment(tempEvaluation.getComment())
                .reason(tempEvaluation.getReason())
                .status(tempEvaluation.getStatus())
                .build();
    }
}
