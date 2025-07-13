package skala.skoro.domain.ai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.ai.entity.Prompt;

import java.util.Optional;

public interface PromptRepository extends JpaRepository<Prompt, Long> {
    Optional<Prompt> findFirstBy();
}
