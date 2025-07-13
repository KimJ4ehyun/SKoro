package skala.skoro.domain.evaluation.entity;

import jakarta.persistence.*;
import lombok.*;
import skala.skoro.domain.common.BaseEntity;

@Entity
@Table(name = "peer_evaluation_keywords")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PeerEvaluationKeyword extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "peer_evaluation_keyword_id")
    private Long id;

    @Column(name = "custom_keyword")
    private String customKeyword; // 직접입력

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "peer_evaluation_id")
    private PeerEvaluation peerEvaluation;

    @Builder
    public PeerEvaluationKeyword(String customKeyword, Keyword keyword, PeerEvaluation peerEvaluation) {
        this.customKeyword = customKeyword;
        this.keyword = keyword;
        this.peerEvaluation = peerEvaluation;
    }
}
