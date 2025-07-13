package skala.skoro.domain.kpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.kpi.entity.Grade;
import skala.skoro.domain.kpi.entity.Task;
import skala.skoro.domain.kpi.entity.TeamKpi;

import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    Optional<Grade> findByTeamKpi(TeamKpi teamKpi);

    Optional<Grade> findByTask(Task task);
}
