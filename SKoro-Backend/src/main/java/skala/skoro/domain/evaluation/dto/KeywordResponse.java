package skala.skoro.domain.evaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import skala.skoro.domain.evaluation.entity.Sentiment;

@Getter
@Builder
@AllArgsConstructor
public class KeywordResponse {
    private Long keywordId;
    private String keywordName;
    private Sentiment sentiment;
}
