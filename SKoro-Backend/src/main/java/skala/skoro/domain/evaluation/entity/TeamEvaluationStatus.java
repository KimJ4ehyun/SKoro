package skala.skoro.domain.evaluation.entity;

public enum TeamEvaluationStatus {
    NOT_STARTED,
    IN_PROGRESS,
    AI_PHASE1_COMPLETED,
    AI_PHASE2_COMPLETED,
    AI_PHASE3_COMPLETED,
    SUBMITTED, // 각 팀장 제출 완료
    COMPLETED // AI 레포트 생성 완료
}
