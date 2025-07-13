package skala.skoro.domain.ai.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PromptRequest {
    private String prompt;
}
