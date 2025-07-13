package skala.skoro.domain.period.entity;

import skala.skoro.global.exception.CustomException;

import static skala.skoro.global.exception.ErrorCode.INVALID_PHASE_TRANSITION;
import static skala.skoro.global.exception.ErrorCode.IS_FINAL_IS_NULL;

public enum PeriodPhase {
    NOT_STARTED,
    PEER_EVALUATION,
    MIDDLE_REPORT,
    MANAGER_EVALUATION,
    REPORT_GENERATION,
    EVALUATION_FEEDBACK,
    COMPLETED;

    public PeriodPhase next(Period period) {
        Boolean isFinal = period.getIsFinal();

        if (isFinal == null) {
            throw new CustomException(IS_FINAL_IS_NULL);
        }

        return switch (this) {
            case NOT_STARTED -> PEER_EVALUATION;
            case PEER_EVALUATION -> isFinal ? MIDDLE_REPORT : REPORT_GENERATION;
            case MIDDLE_REPORT -> MANAGER_EVALUATION;
            case MANAGER_EVALUATION -> REPORT_GENERATION;
            case REPORT_GENERATION -> isFinal ? EVALUATION_FEEDBACK : COMPLETED;
            case EVALUATION_FEEDBACK -> COMPLETED;
            case COMPLETED -> throw new CustomException(INVALID_PHASE_TRANSITION);
        };
    }
}
