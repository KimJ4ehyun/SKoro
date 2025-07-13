package skala.skoro.domain.kpi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.employee.entity.Team;
import skala.skoro.domain.employee.service.EmployeeService;
import skala.skoro.domain.kpi.dto.*;
import skala.skoro.domain.kpi.entity.Grade;
import skala.skoro.domain.kpi.entity.Task;
import skala.skoro.domain.kpi.entity.TaskSummary;
import skala.skoro.domain.kpi.entity.TeamKpi;
import skala.skoro.domain.kpi.repository.GradeRepository;
import skala.skoro.domain.kpi.repository.TaskRepository;
import skala.skoro.domain.kpi.repository.TaskSummaryRepository;
import skala.skoro.domain.kpi.repository.TeamKpiRepository;
import skala.skoro.global.exception.CustomException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static skala.skoro.global.exception.ErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class TeamKpiService {

    private final EmployeeService employeeService;

    private final TeamKpiRepository teamKpiRepository;

    private final TaskRepository taskRepository;

    private final GradeRepository gradeRepository;

    private final TaskSummaryRepository taskSummaryRepository;

    @Transactional(readOnly = true)
    public List<TeamKpiDetailResponse> getTeamKpis(String empNo) {
        Employee employee = employeeService.findEmployeeByEmpNo(empNo);

        return teamKpiRepository.findByTeamAndYearOrderByWeightDesc(employee.getTeam(), LocalDate.now().getYear()).stream()
                .map(kpi -> {
                    List<EmployeeSimple> participants = taskRepository.findEmployeesByTeamKpiId(kpi.getId()).stream()
                            .map(EmployeeSimple::from)
                            .toList();
                    return TeamKpiDetailResponse.of(kpi, participants);
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TeamKpiWithTasksResponse> getTeamKpisWithTasksDetail(int year, String empNo) {
        Team team = employeeService.findEmployeeByEmpNo(empNo).getTeam();
        List<TeamKpi> teamKpis = teamKpiRepository.findByTeamAndYearOrderByWeightDesc(team, year);

        return teamKpis.stream()
                .map(teamKpi -> {
                    Grade grade = gradeRepository.findByTeamKpi(teamKpi)
                            .orElseThrow(() -> new CustomException(TEAM_KPI_GRADE_NOT_FOUND));

                    List<TaskSummaryResponse> taskSummaryResponses = taskRepository.findByTeamKpi(teamKpi).stream()
                            .map(task -> {
                                TaskSummary summary = taskSummaryRepository
                                        .findTopByTaskOrderByPeriod_StartDateDesc(task)
                                        .orElse(null); // summary는 없을 수도 있음

                                Grade taskGrade = gradeRepository.findByTask(task)
                                        .orElseThrow(() -> new CustomException(TASK_GRADE_NOT_FOUND));

                                return TaskSummaryResponse.of(task, task.getEmployee(), summary, taskGrade);
                            })
                            .toList();

                    return TeamKpiWithTasksResponse.of(teamKpi, grade, taskSummaryResponses);
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MyTeamKpiWithTasksResponse> getMyTeamKpisWithTasksDetail(int year, String empNo) {
        Employee employee = employeeService.findEmployeeByEmpNo(empNo);
        List<TeamKpi> teamKpis = teamKpiRepository.findTeamKpisByEmpNoAndYear(empNo, year);

        return teamKpis.stream()
                .map(teamKpi -> {
                    Grade teamKpiGrade = gradeRepository.findByTeamKpi(teamKpi)
                            .orElseThrow(() -> new CustomException(TEAM_KPI_GRADE_NOT_FOUND));

                    Task task = taskRepository.findByTeamKpiAndEmployee(teamKpi, employee)
                            .orElseThrow(() -> new CustomException(TASK_NOT_FOUND));

                    TaskSummary taskSummary = taskSummaryRepository.findTopByTaskOrderByPeriod_StartDateDesc(task)
                            .orElse(null);

                    Grade taskGrade = gradeRepository.findByTask(task)
                            .orElseThrow(() -> new CustomException(TASK_GRADE_NOT_FOUND));

                    List<EmployeeSimple> participants = taskRepository.findEmployeesByTeamKpiId(teamKpi.getId()).stream()
                            .filter(e -> !e.getEmpNo().equals(empNo))
                            .map(EmployeeSimple::from)
                            .toList();

                    return MyTeamKpiWithTasksResponse.of(teamKpi, teamKpiGrade, task, employee, taskSummary, taskGrade, participants);
                })
                .toList();
    }

    public Optional<TeamKpi> getTeamKpiByYear() {
        int year = LocalDate.now().getYear();
        return teamKpiRepository.findFirstByYear(year);
    }
}
