import { useEffect, useState } from 'react'
import { PeerKeyword, PeerNav, PeerType } from '.'
import PeerEvaluationService from '../../services/PeerEvaluation'

const PeerEvaluation: React.FC<{
  peerEvaluationId: number
  isSubmitted: boolean
  setIsSubmitted: (isSubmitted: boolean) => void
}> = ({ peerEvaluationId, isSubmitted, setIsSubmitted }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState<number>(0)
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([])
  const [customKeywords, setCustomKeywords] = useState<string[]>([])

  useEffect(() => {
    setCurrentStep(1)
    setSelectedOption(0)
    setSelectedKeywords([])
    setCustomKeywords([])
    setIsSubmitted(false)
  }, [peerEvaluationId])

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId)
  }

  const handleKeywordToggle = (keyword: number) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    )
  }

  const handleCustomKeywordRemove = (keyword: string) => {
    setCustomKeywords((prev) => prev.filter((k) => k !== keyword))
  }

  const handleNext = () => {
    if (currentStep === 1 && selectedOption) {
      setCurrentStep(2)
    }
  }

  const handleAdditionalKeywords = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input') as HTMLInputElement
    const newKeyword = input.value.trim()
    if (
      newKeyword &&
      newKeyword.length <= 20 &&
      customKeywords.length < 5 &&
      !customKeywords.includes(newKeyword)
    ) {
      setCustomKeywords((prev) => [...prev, newKeyword])
      input.value = ''
    } else {
      alert(
        '키워드는 최대 20자 이내로 중복 없이 입력 가능하며, 최대 5개까지만 추가할 수 있습니다.'
      )
    }
  }

  const handleSubmit = () => {
    PeerEvaluationService.submitPeerEvaluation(
      peerEvaluationId,
      selectedOption,
      '',
      selectedKeywords,
      customKeywords
    )
      .then(() => {
        //alert('평가가 성공적으로 제출되었습니다.')
        setIsSubmitted(true)
      })
      .catch((error) => {
        console.error('평가 제출 실패:', error)
        alert('평가 제출에 실패했습니다. 다시 시도해주세요.')
      })
  }

  return (
    <div className="rounded-xl flex-1 flex flex-col">
      <h2 className="font-semibold mb-2">동료 평가</h2>

      <section className="relative bg-white rounded-xl shadow-md px-6 py-5 flex-1 flex flex-col min-h-0">
        {/* 상단 네비게이션 */}
        <PeerNav currentStep={currentStep} />

        {/* Step 1: 협업 방식 */}
        {currentStep === 1 && (
          <PeerType
            onNext={handleNext}
            onOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
          />
        )}

        {/* Step 2: 키워드 선택 */}
        {currentStep === 2 && (
          <PeerKeyword
            selectedKeywords={selectedKeywords}
            customKeywords={customKeywords}
            onCustomKeywordRemove={handleCustomKeywordRemove}
            onAdditionalKeywords={handleAdditionalKeywords}
            onSubmit={handleSubmit}
            onKeywordToggle={handleKeywordToggle}
          />
        )}
      </section>
    </div>
  )
}

export default PeerEvaluation
