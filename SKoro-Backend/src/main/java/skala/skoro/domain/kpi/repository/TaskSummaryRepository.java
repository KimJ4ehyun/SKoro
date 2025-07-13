package skala.skoro.domain.kpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.kpi.entity.Task;
import skala.skoro.domain.kpi.entity.TaskSummary;
import java.util.Optional;

public interface TaskSummaryRepository extends JpaRepository<TaskSummary, Long> {
    Optional<TaskSummary> findTopByTaskOrderByPeriod_StartDateDesc(Task task);
}
