package skala.skoro.domain.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import skala.skoro.domain.ai.dto.PromptRequest;
import skala.skoro.domain.common.BaseEntity;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "prompts")
public class Prompt extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prompt_id")
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String prompt;

    public void updatePrompt(String prompt) {
        this.prompt = prompt;
    }

    public static Prompt from(PromptRequest request) {
        return Prompt.builder()
                .prompt(request.getPrompt())
                .build();
    }
}
