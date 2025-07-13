package skala.skoro.domain.evaluation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.evaluation.entity.EvaluationFeedbackSummary;

public interface EvaluationFeedbackSummaryRepository extends JpaRepository<EvaluationFeedbackSummary, Long> {
}
