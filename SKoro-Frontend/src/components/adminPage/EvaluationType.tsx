const EvaluationType: React.FC<{
  evaluationType: string
  setEvaluationType: (type: string) => void
}> = ({ evaluationType, setEvaluationType }) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">평가 유형 선택</h2>

      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="evaluationType"
            value="partial"
            checked={evaluationType === 'partial'}
            onChange={(e) => setEvaluationType(e.target.value)}
            className="w-5 h-5 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-700">분기 평가</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="evaluationType"
            value="comprehensive"
            checked={evaluationType === 'comprehensive'}
            onChange={(e) => setEvaluationType(e.target.value)}
            className="w-5 h-5 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-700">최종 평가</span>
        </label>
      </div>
    </div>
  )
}

export default EvaluationType
