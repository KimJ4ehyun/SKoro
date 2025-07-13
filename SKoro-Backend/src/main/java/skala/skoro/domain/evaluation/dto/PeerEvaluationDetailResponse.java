package skala.skoro.domain.evaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class PeerEvaluationDetailResponse {
    private Long peerEvaluationId;
    private String targetEmpNo;
    private String targetEmpName;
    private String targetEmpProfileImage;
    private String targetEmpPosition;
    private String jointTask;
    private Integer weight;
    private List<KeywordResponse> systemKeywords;
    private List<String> selectedKeywords;
    private List<String> selectedCustomKeywords;
}
