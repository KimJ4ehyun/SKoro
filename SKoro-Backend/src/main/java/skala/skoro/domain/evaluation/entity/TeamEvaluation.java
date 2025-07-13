package skala.skoro.domain.evaluation.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import skala.skoro.domain.common.BaseEntity;
import skala.skoro.domain.employee.entity.Team;
import skala.skoro.domain.period.entity.Period;

import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "team_evaluations")
public class TeamEvaluation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_evaluation_id")
    private Long id;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "JSON")
    private Map<String, Object> report;

    @Enumerated(EnumType.STRING)
    private TeamEvaluationStatus status;

    private Integer averageAchievementRate;

    private String relativePerformance;

    private Integer yearOverYearGrowth;

    @Column(name = "ai_team_overall_analysis_comment", columnDefinition = "TEXT")
    private String aiTeamOverallAnalysisComment;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ai_collaboration_matrix", columnDefinition = "JSON")
    private Map<String, Object> aiCollaborationMatrix;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ai_team_comparison", columnDefinition = "JSON")
    private Map<String, Object> aiTeamComparison;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ai_team_coaching", columnDefinition = "JSON")
    private Map<String, Object> aiTeamCoaching;

    @Column(name = "overall_comment", columnDefinition = "TEXT")
    private String overallComment;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ai_risk", columnDefinition = "JSON")
    private Map<String, Object> aiRisk;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ai_plan", columnDefinition = "JSON")
    private Map<String, Object> aiPlan;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "middle_report", columnDefinition = "JSON")
    private Map<String, Object> middleReport;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "period_id")
    private Period period;

    public static TeamEvaluation of(Team team, Period period, TeamEvaluationStatus status) {
        return TeamEvaluation.builder()
                .team(team)
                .period(period)
                .status(status)
                .build();
    }

    public void updateStatus(TeamEvaluationStatus status) {
        this.status = status;
    }
}
