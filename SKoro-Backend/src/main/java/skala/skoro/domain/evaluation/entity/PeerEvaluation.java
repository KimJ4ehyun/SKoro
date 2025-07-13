package skala.skoro.domain.evaluation.entity;

import jakarta.persistence.*;
import lombok.*;
import skala.skoro.domain.common.BaseEntity;
import skala.skoro.domain.employee.entity.Employee;

@Entity
@Table(name = "peer_evaluations")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PeerEvaluation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "peer_evaluation_id")
    private Long id;

    @Column(name = "is_completed")
    private Boolean isCompleted;

    private Integer weight; // 4,3,2,1

    @Column(name = "joint_task", columnDefinition = "TEXT")
    private String jointTask;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emp_no")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_emp_no")
    private Employee targetEmployee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_evaluation_id")
    private TeamEvaluation teamEvaluation;

    @Builder
    public PeerEvaluation(Boolean isCompleted, Integer weight, String jointTask, Employee employee, Employee targetEmployee, TeamEvaluation teamEvaluation) {
        this.isCompleted = isCompleted;
        this.weight = weight;
        this.jointTask = jointTask;
        this.employee = employee;
        this.targetEmployee = targetEmployee;
        this.teamEvaluation = teamEvaluation;
    }

    public void completeEvaluation(int weight) {
        this.isCompleted = true;
        this.weight = weight;
    }

    public void updateJointTask(String task) {
        this.jointTask += ";" + task;
    }
}
