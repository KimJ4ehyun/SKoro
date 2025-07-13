package skala.skoro.domain.evaluation.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.evaluation.entity.EvaluationFeedback;

public interface EvaluationFeedbackRepository extends JpaRepository<EvaluationFeedback, Long> {
}
