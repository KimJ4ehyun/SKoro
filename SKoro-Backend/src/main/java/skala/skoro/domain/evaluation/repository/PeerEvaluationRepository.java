package skala.skoro.domain.evaluation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.evaluation.entity.PeerEvaluation;
import java.util.List;
import java.util.Optional;

public interface PeerEvaluationRepository extends JpaRepository<PeerEvaluation, Long> {
    List<PeerEvaluation> findByEmployee_EmpNoAndTeamEvaluation_Period_Id(String empNo, Long periodId);

    Optional<PeerEvaluation> findById(Long peerEvaluationId);

    Boolean existsByTeamEvaluation_Period_IdAndIsCompletedFalse(Long periodId);

    Boolean existsByTeamEvaluation_Period_IdAndEmployee_EmpNoAndIsCompletedFalse(Long periodId, String empNo);
}
