package skala.skoro.domain.period.dto;

import lombok.*;
import skala.skoro.domain.period.entity.Period;
import skala.skoro.domain.period.entity.PeriodPhase;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PeriodAvailableResponse {
    private Long periodId;
    private String periodName;
    private Boolean isFinal;
    private LocalDate startDate;
    private LocalDate endDate;
    private PeriodPhase periodPhase;

    public static PeriodAvailableResponse from(Period period) {
        return PeriodAvailableResponse.builder()
                .periodId(period.getId())
                .periodName(period.getPeriodName())
                .isFinal(period.getIsFinal())
                .startDate(period.getStartDate())
                .endDate(period.getEndDate())
                .periodPhase(period.getPeriodPhase())
                .build();
    }
}
