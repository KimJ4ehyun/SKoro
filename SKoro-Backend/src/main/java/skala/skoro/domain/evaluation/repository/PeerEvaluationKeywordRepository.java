package skala.skoro.domain.evaluation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.evaluation.entity.PeerEvaluation;
import skala.skoro.domain.evaluation.entity.PeerEvaluationKeyword;

import java.util.List;

public interface PeerEvaluationKeywordRepository extends JpaRepository<PeerEvaluationKeyword, Long> {
    List<PeerEvaluationKeyword> findByPeerEvaluation(PeerEvaluation peerEvaluation);
}
