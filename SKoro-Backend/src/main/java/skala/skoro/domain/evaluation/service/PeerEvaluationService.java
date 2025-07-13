package skala.skoro.domain.evaluation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.evaluation.dto.KeywordResponse;
import skala.skoro.domain.evaluation.dto.PeerEvaluationDetailResponse;
import skala.skoro.domain.evaluation.dto.PeerEvaluationStatusResponse;
import skala.skoro.domain.evaluation.dto.SubmitPeerEvaluationRequest;
import skala.skoro.domain.evaluation.entity.Keyword;
import skala.skoro.domain.evaluation.entity.PeerEvaluation;
import skala.skoro.domain.evaluation.entity.PeerEvaluationKeyword;
import skala.skoro.domain.evaluation.repository.KeywordRepository;
import skala.skoro.domain.evaluation.repository.PeerEvaluationKeywordRepository;
import skala.skoro.domain.evaluation.repository.PeerEvaluationRepository;
import skala.skoro.global.exception.CustomException;
import java.util.List;

import static skala.skoro.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class PeerEvaluationService {

    private final PeerEvaluationRepository peerEvaluationRepository;

    private final PeerEvaluationKeywordRepository peerEvaluationKeywordRepository;

    private final KeywordRepository keywordRepository;

    @Transactional(readOnly = true)
    public PeerEvaluationDetailResponse getPeerEvaluationDetail(Long peerEvaluationId) {
        PeerEvaluation peerEvaluation = peerEvaluationRepository.findById(peerEvaluationId)
                .orElseThrow(() -> new CustomException(PEER_EVALUATION_NOT_FOUND));

        Employee target = peerEvaluation.getTargetEmployee();

        // 전체 시스템 키워드
        List<KeywordResponse> allKeywords = keywordRepository.findAll().stream()
                .map(k -> KeywordResponse.builder()
                        .keywordId(k.getId())
                        .keywordName(k.getKeywordName())
                        .sentiment(k.getSentiment())
                        .build())
                .toList();

        // 이미 선택된 키워드/커스텀 키워드
        List<PeerEvaluationKeyword> selectedEntities = peerEvaluationKeywordRepository.findByPeerEvaluation(peerEvaluation);
        List<String> selectedKeywords = selectedEntities.stream()
                .filter(k -> k.getKeyword() != null)
                .map(k -> k.getKeyword().getKeywordName())
                .toList();

        List<String> selectedCustomKeywords = selectedEntities.stream()
                .filter(k -> k.getCustomKeyword() != null)
                .map(PeerEvaluationKeyword::getCustomKeyword)
                .toList();

        return PeerEvaluationDetailResponse.builder()
                .peerEvaluationId(peerEvaluation.getId())
                .targetEmpNo(target.getEmpNo())
                .targetEmpName(target.getEmpName())
                .targetEmpProfileImage(target.getProfileImage())
                .targetEmpPosition(target.getPosition())
                .jointTask(peerEvaluation.getJointTask())
                .weight(peerEvaluation.getWeight())
                .systemKeywords(allKeywords)
                .selectedKeywords(selectedKeywords)
                .selectedCustomKeywords(selectedCustomKeywords)
                .build();
    }

    @Transactional
    public void submitPeerEvaluation(Long peerEvaluationId, SubmitPeerEvaluationRequest req) {
        PeerEvaluation peerEvaluation = peerEvaluationRepository.findById(peerEvaluationId)
                .orElseThrow(() -> new CustomException(PEER_EVALUATION_NOT_FOUND));
        if (Boolean.TRUE.equals(peerEvaluation.getIsCompleted())) {
            throw new CustomException(PEER_EVALUATION_ALREADY_SUBMITTED);
        }
        peerEvaluation.completeEvaluation(req.getWeight());

        // 시스템 키워드 저장
        if (req.getKeywordIds() != null) {
            for (Long keywordId : req.getKeywordIds()) {
                Keyword keyword = keywordRepository.findById(keywordId)
                        .orElseThrow(() -> new CustomException(KEYWORD_NOT_FOUND));
                peerEvaluationKeywordRepository.save(PeerEvaluationKeyword.builder()
                        .peerEvaluation(peerEvaluation)
                        .keyword(keyword)
                        .build());
            }
        }
        // 커스텀 키워드 저장
        if (req.getCustomKeywords() != null) {
            for (String custom : req.getCustomKeywords()) {
                peerEvaluationKeywordRepository.save(PeerEvaluationKeyword.builder()
                        .peerEvaluation(peerEvaluation)
                        .customKeyword(custom)
                        .build());
            }
        }
    }

    @Transactional(readOnly = true)
    public List<PeerEvaluationStatusResponse> getPeerEvaluationStatusList(String empNo, Long periodId) {
        List<PeerEvaluation> evaluations = peerEvaluationRepository.findByEmployee_EmpNoAndTeamEvaluation_Period_Id(empNo, periodId);

        return evaluations.stream()
                .map(e -> PeerEvaluationStatusResponse.builder()
                        .peerEvaluationId(e.getId())
                        .targetEmpNo(e.getTargetEmployee().getEmpNo())
                        .targetEmpName(e.getTargetEmployee().getEmpName())
                        .targetEmpProfileImage(e.getTargetEmployee().getProfileImage())
                        .completed(Boolean.TRUE.equals(e.getIsCompleted()))
                        .build())
                .toList();
    }

    @Transactional(readOnly = true)
    public List<KeywordResponse> getAllSystemKeywords() {
        return keywordRepository.findAll().stream()
                .map(k -> KeywordResponse.builder()
                        .keywordId(k.getId())
                        .keywordName(k.getKeywordName())
                        .build())
                .toList();
    }

    @Transactional(readOnly = true)
    public Boolean isAllPeerEvaluationCompleted(Long periodId) {
        return !peerEvaluationRepository.existsByTeamEvaluation_Period_IdAndIsCompletedFalse(periodId);
    }

    @Transactional(readOnly = true)
    public Boolean isAllMyPeerEvaluationCompleted(Long periodId, String empNo) {
        return !peerEvaluationRepository.existsByTeamEvaluation_Period_IdAndEmployee_EmpNoAndIsCompletedFalse(periodId, empNo);
    }
}
