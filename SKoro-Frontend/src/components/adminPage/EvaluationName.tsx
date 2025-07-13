const EvaluationName: React.FC<{
  evaluationName: string
  setEvaluationName: (name: string) => void
}> = ({ evaluationName, setEvaluationName }) => {
  return (
    <div className="p-6 pb-3">
      <h2 className="text-lg font-semibold mb-4">평가 이름 작성</h2>

      <div className="space-y-4">
        <input
          type="text"
          value={evaluationName}
          onChange={(e) => setEvaluationName(e.target.value)}
          placeholder="예시) 2025년도 3분기 평가"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

export default EvaluationName
