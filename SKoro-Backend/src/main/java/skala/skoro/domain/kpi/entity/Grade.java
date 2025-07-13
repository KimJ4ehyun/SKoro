package skala.skoro.domain.kpi.entity;

import jakarta.persistence.*;
import lombok.*;
import skala.skoro.domain.common.BaseEntity;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "grades")
public class Grade extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id")
    private Long id;

    @Column(name = "grade_s")
    private String gradeS;

    @Column(name = "grade_a")
    private String gradeA;

    @Column(name = "grade_b")
    private String gradeB;

    @Column(name = "grade_c")
    private String gradeC;

    @Column(name = "grade_d")
    private String gradeD;

    private String gradeRule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_kpi_id")
    private TeamKpi teamKpi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;
}

