package skala.skoro.domain.ai.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skala.skoro.domain.ai.dto.PromptRequest;
import skala.skoro.domain.ai.dto.PromptResponse;
import skala.skoro.domain.ai.entity.Prompt;
import skala.skoro.domain.ai.repository.PromptRepository;
import skala.skoro.global.exception.CustomException;

import static skala.skoro.global.exception.ErrorCode.PROMPT_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class PromptService {

    private final PromptRepository promptRepository;

    public void upsertPrompt(PromptRequest request) {
        promptRepository.findFirstBy()
                .ifPresentOrElse(
                        p -> p.updatePrompt(request.getPrompt()),
                        () -> promptRepository.save(Prompt.from(request))
                );
    }

    @Transactional(readOnly = true)
    public PromptResponse getPrompt() {
        return promptRepository.findFirstBy()
                .map(PromptResponse::from)
                .orElseThrow(() -> new CustomException(PROMPT_NOT_FOUND));
    }
}
