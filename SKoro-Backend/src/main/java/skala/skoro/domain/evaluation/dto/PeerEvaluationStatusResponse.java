package skala.skoro.domain.evaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PeerEvaluationStatusResponse {
    private Long peerEvaluationId;
    private String targetEmpNo;
    private String targetEmpName;
    private String targetEmpProfileImage;
    private boolean completed;
}
