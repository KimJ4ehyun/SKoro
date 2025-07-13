package skala.skoro.domain.kpi.entity;

import jakarta.persistence.*;
import lombok.*;
import skala.skoro.domain.common.BaseEntity;
import skala.skoro.domain.employee.entity.Employee;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;

    private LocalDate startDate;

    private LocalDate endDate;

    private String taskName;

    @Column(columnDefinition = "TEXT")
    private String targetLevel;

    private Integer weight;

    @Column(columnDefinition = "TEXT")
    private String taskDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_kpi_id")
    private TeamKpi teamKpi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emp_no")
    private Employee employee;
}
