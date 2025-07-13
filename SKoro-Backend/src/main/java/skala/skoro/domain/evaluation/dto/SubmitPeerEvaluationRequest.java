package skala.skoro.domain.evaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmitPeerEvaluationRequest {
    private Integer weight;
    private List<Long> keywordIds;
    private List<String> customKeywords;
}
