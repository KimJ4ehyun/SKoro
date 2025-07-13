package skala.skoro.domain.evaluation.entity;


import jakarta.persistence.*;
import lombok.*;
import skala.skoro.domain.common.BaseEntity;
import skala.skoro.domain.period.entity.Period;

@Entity
@Table(name = "evaluation_feedbacks")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EvaluationFeedback extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evaluation_feedback_id")
    private Long id;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content; // 팀원 채팅만 저장

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_evaluation_id")
    private TeamEvaluation teamEvaluation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "period_id")
    private Period period;

    @Builder
    public EvaluationFeedback(String content, TeamEvaluation teamEvaluation, Period period) {
        this.content = content;
        this.teamEvaluation = teamEvaluation;
        this.period = period;
    }

    public void updateContent(String content) {
        this.content = content;
    }
}