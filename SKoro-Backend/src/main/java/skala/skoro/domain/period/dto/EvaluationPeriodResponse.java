package skala.skoro.domain.period.dto;

import lombok.*;
import skala.skoro.domain.period.entity.Period;
import skala.skoro.domain.period.entity.Unit;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EvaluationPeriodResponse {
    private Long periodId;
    private Integer year;
    private String periodName;
    private boolean isFinal;
    private Unit unit;
    private Integer orderInYear;
    private LocalDate startDate;
    private LocalDate endDate;

    public static EvaluationPeriodResponse from(Period period) {
        return EvaluationPeriodResponse.builder()
                .periodId(period.getId())
                .year(period.getYear())
                .periodName(period.getPeriodName())
                .isFinal(period.getIsFinal())
                .unit(period.getUnit())
                .orderInYear(period.getOrderInYear())
                .startDate(period.getStartDate())
                .endDate(period.getEndDate())
                .build();
    }
}
