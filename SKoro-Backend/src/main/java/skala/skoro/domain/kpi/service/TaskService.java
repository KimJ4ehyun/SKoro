package skala.skoro.domain.kpi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skala.skoro.domain.kpi.repository.TaskRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepository;

    private final TeamKpiService teamKpiService;

    public Boolean isCurrentYearTasksGenerated() {
        return teamKpiService.getTeamKpiByYear()
                .map(taskRepository::existsByTeamKpi)
                .orElse(false);
    }
}
