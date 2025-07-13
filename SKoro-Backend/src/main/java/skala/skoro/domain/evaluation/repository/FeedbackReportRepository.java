package skala.skoro.domain.evaluation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.evaluation.entity.FeedbackReport;
import skala.skoro.domain.evaluation.entity.TeamEvaluation;
import skala.skoro.domain.kpi.dto.MyContributionResponse;
import java.util.List;
import java.util.Optional;

public interface FeedbackReportRepository extends JpaRepository<FeedbackReport, Long> {
    List<FeedbackReport> findByTeamEvaluationIdOrderByRankingAsc(Long teamEvaluationId);

    Optional<FeedbackReport> findByTeamEvaluationAndEmployee(TeamEvaluation teamEvaluation, Employee employee);

    @Query("""
        select new skala.skoro.domain.kpi.dto.MyContributionResponse(
            p.year, p.orderInYear, avg(f.contributionRate)
        )
        from FeedbackReport f
        join TeamEvaluation te on f.teamEvaluation.id = te.id
        join Period p on te.period.id = p.id
        where f.employee.empNo = :empNo
        group by p.year, p.orderInYear
        order by p.year, p.orderInYear
    """)
    List<MyContributionResponse> findContributionByEmpNoGrouped(@Param("empNo") String empNo);
}
