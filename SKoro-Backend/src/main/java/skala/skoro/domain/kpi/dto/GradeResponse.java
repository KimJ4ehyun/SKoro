package skala.skoro.domain.kpi.dto;

import lombok.*;
import skala.skoro.domain.kpi.entity.Grade;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GradeResponse {
    private String gradeRule;
    private String gradeS;
    private String gradeA;
    private String gradeB;
    private String gradeC;
    private String gradeD;

    public static GradeResponse from(Grade grade) {
        return GradeResponse.builder()
                .gradeRule(grade.getGradeRule())
                .gradeS(grade.getGradeS())
                .gradeA(grade.getGradeA())
                .gradeB(grade.getGradeB())
                .gradeC(grade.getGradeC())
                .gradeD(grade.getGradeD())
                .build();

    }
}
