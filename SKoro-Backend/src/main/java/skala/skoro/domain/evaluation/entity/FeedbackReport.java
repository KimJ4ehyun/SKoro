package skala.skoro.domain.evaluation.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import skala.skoro.domain.common.BaseEntity;
import skala.skoro.domain.employee.entity.Employee;

import java.util.Map;

@Entity
@Table(name = "feedback_reports",
        uniqueConstraints = @UniqueConstraint(columnNames = {"emp_no", "team_evaluation_id"}))
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_report_id")
    private Long id;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "report", columnDefinition = "JSON")
    private Map<String, Object> report;

    private Integer ranking;

    @Column(name = "contribution_rate")
    private Integer contributionRate;

    private String attitude;  // 자유입력

    @Column(name = "ai_overall_contribution_summary_comment", columnDefinition = "TEXT")
    private String aiOverallContributionSummaryComment;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ai_peer_talk_summary", columnDefinition = "JSON")
    private Map<String, Object> aiPeerTalkSummary;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ai_4p_evaluation", columnDefinition = "JSON")
    private Map<String, Object> ai4pEvaluation;

    @Column(name = "ai_achievement_rate")
    private Integer aiAchievementRate;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ai_growth_coaching", columnDefinition = "JSON")
    private Map<String, Object> aiGrowthCoaching;

    @Column(name = "overall_comment", columnDefinition = "TEXT")
    private String overallComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_evaluation_id")
    private TeamEvaluation teamEvaluation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emp_no")
    private Employee employee;

    public static FeedbackReport of(TeamEvaluation teamEvaluation, Employee employee) {
        return FeedbackReport.builder()
                .teamEvaluation(teamEvaluation)
                .employee(employee)
                .build();
    }
}
