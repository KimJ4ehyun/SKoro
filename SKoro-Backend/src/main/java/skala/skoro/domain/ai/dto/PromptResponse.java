package skala.skoro.domain.ai.dto;

import lombok.*;
import skala.skoro.domain.ai.entity.Prompt;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PromptResponse {
    private Long promptId;
    private String prompt;

    public static PromptResponse from(Prompt prompt) {
        return PromptResponse.builder()
                .promptId(prompt.getId())
                .prompt(prompt.getPrompt())
                .build();
    }
}
