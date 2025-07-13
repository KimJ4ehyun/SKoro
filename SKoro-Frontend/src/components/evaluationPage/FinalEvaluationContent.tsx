import { Report } from '../common'
import { TeamList } from '../evaluationPage'

const FinalEvaluationContent: React.FC<{
  periodId: number
  teamEvaluationId?: number | null
  evaluationReasons?: any[]
}> = ({ periodId, teamEvaluationId, evaluationReasons }) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TeamList
        teamEvaluationId={teamEvaluationId}
        periodId={periodId}
        evaluationReasons={evaluationReasons}
      />

      <main className="flex-1 flex flex-col pb-5 px-10 min-h-0 min-h-[fit-content] lg:min-h-0">
        <Report
          type="evaluation"
          evaluationReasons={evaluationReasons}
          periodId={periodId}
        />
      </main>
    </div>
  )
}

export default FinalEvaluationContent
