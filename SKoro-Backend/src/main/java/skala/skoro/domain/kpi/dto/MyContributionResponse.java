package skala.skoro.domain.kpi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyContributionResponse {
    private Integer year;
    private Integer quarter;
    private Double avgContributionRate;
}
