package skala.skoro.domain.kpi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyFinalScoreResponse {
    private Integer year;
    private Double score;
}
