package skala.skoro.domain.kpi.dto;

import lombok.*;
import skala.skoro.domain.kpi.entity.TeamKpi;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TeamKpiDetailResponse {
    private Long teamKpiId;
    private Integer year;
    private String kpiName;
    private Integer weight;
    private String description;
    private List<EmployeeSimple> participants;

    public static TeamKpiDetailResponse of(TeamKpi teamKpi, List<EmployeeSimple> employeeSimple) {
        return TeamKpiDetailResponse.builder()
                .teamKpiId(teamKpi.getId())
                .year(teamKpi.getYear())
                .kpiName(teamKpi.getKpiName())
                .weight(teamKpi.getWeight())
                .description(teamKpi.getKpiDescription())
                .participants(employeeSimple)
                .build();
    }
}
