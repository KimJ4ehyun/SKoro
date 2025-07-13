package skala.skoro.domain.evaluation.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.evaluation.entity.FinalEvaluationReport;
import skala.skoro.domain.evaluation.entity.TeamEvaluation;
import skala.skoro.domain.kpi.dto.MyFinalScoreResponse;
import java.util.List;
import java.util.Optional;

public interface FinalEvaluationReportRepository extends JpaRepository<FinalEvaluationReport, Long> {
    List<FinalEvaluationReport> findByTeamEvaluationIdOrderByRankingAsc(Long teamEvaluationId);

    Optional<FinalEvaluationReport> findByTeamEvaluationAndEmployee(TeamEvaluation teamEvaluation, Employee employee);

    @Query("""
        select new skala.skoro.domain.kpi.dto.MyFinalScoreResponse(
            p.year,
            max(f.score)
        )
        from FinalEvaluationReport f
        join f.teamEvaluation te
        join te.period p
        where f.employee.empNo = :empNo
        group by p.year
        order by p.year
    """)
    List<MyFinalScoreResponse> findFinalScoreByEmpNoGrouped(@Param("empNo") String empNo);
}
