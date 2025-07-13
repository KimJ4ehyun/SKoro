package skala.skoro.domain.period.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import skala.skoro.domain.period.entity.Unit;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PeriodUpdateRequest {
    private String periodName;
    private Unit unit;
    private Boolean isFinal;
    private LocalDate startDate;
    private LocalDate endDate;
}
