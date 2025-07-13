package skala.skoro.domain.evaluation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.evaluation.entity.Status;
import skala.skoro.domain.evaluation.entity.TeamEvaluation;
import skala.skoro.domain.evaluation.entity.TempEvaluation;
import java.util.Optional;

public interface TempEvaluationRepository extends JpaRepository<TempEvaluation, Long> {
    Optional<TempEvaluation> findByEmployeeAndTeamEvaluation_Id(Employee employee, Long teamEvaluationId);

    boolean existsByTeamEvaluationAndStatusNot(TeamEvaluation teamEvaluation, Status status);
}