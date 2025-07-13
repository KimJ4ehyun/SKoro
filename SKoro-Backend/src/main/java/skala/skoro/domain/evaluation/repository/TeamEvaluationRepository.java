package skala.skoro.domain.evaluation.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import skala.skoro.domain.employee.entity.Team;
import skala.skoro.domain.evaluation.entity.TeamEvaluation;
import skala.skoro.domain.evaluation.entity.TeamEvaluationStatus;
import skala.skoro.domain.period.entity.Period;
import java.util.List;
import java.util.Optional;

public interface TeamEvaluationRepository extends JpaRepository<TeamEvaluation, Long> {
    Optional<TeamEvaluation> findByTeamAndPeriodId(Team team, Long periodId);

    // 해당 팀이 참가한 최종 평가의 연도, 해당 팀 평균 달성률, 전체 팀 평균 달성률 조회
    @Query(value = """
        SELECT
            p.year AS year,
            ROUND(AVG(CASE WHEN te.team_id = :teamId THEN te.average_achievement_rate END), 1) AS team_avg,
            ROUND(AVG(te.average_achievement_rate), 1) AS all_avg
        FROM team_evaluations te
        JOIN periods p ON te.period_id = p.period_id
        WHERE p.is_final = 1
        GROUP BY p.year
        ORDER BY p.year DESC
    """, nativeQuery = true)
    List<Object[]> findTeamAndAllAverageByYear(@Param("teamId") Long teamId);

    Optional<TeamEvaluation> findByTeamAndPeriod(Team team, Period period);

    // 평가 기간 중인 팀 평가를 조회
    @Query(value = """
        SELECT
            te
        FROM TeamEvaluation te
        WHERE te.team = :team
        AND te.status NOT IN :statuses
    """)
    List<TeamEvaluation> findByTeamAndStatusNotIn(@Param("team") Team team, @Param("statuses") List<TeamEvaluationStatus> statuses);

    List<TeamEvaluation> findByPeriod_Id(Long periodId);

    Optional<TeamEvaluation> findByTeamAndPeriod_Id(Team team, Long periodId);
}
