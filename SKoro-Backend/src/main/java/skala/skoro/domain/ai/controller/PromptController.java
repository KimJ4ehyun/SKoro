package skala.skoro.domain.ai.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import skala.skoro.domain.ai.dto.PromptRequest;
import skala.skoro.domain.ai.dto.PromptResponse;
import skala.skoro.domain.ai.service.PromptService;

@Tag(name = "프롬프트")
@RestController
@RequestMapping("/prompts")
@RequiredArgsConstructor
public class PromptController {

    private final PromptService promptService;

    @Operation(summary = "[관리자] 프롬프트 저장")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<Void> upsertPrompt(@RequestBody PromptRequest request) {
        promptService.upsertPrompt(request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "[관리자] 프롬프트 조회")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<PromptResponse> getPrompt() {
        return ResponseEntity.ok(promptService.getPrompt());
    }
}
