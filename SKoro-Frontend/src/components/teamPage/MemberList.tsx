import type { TeamMember } from '../../types/TeamPage.types'
import { styles, MemberCard } from '.'

const MemberList: React.FC<{
  members: TeamMember[]
  isFinal: boolean
  selectedPeriod: any
}> = ({ members, isFinal, selectedPeriod }) => (
  <section className="flex-1 flex flex-col overflow-hidden">
    <h2 className={`${styles.textSemibold} mb-3 flex-shrink-0`}>
      총 {members.length}명
    </h2>

    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 pb-6">
        {members.map((member) => (
          <MemberCard
            key={member.empNo}
            member={member}
            isFinal={isFinal}
            selectedPeriod={selectedPeriod}
          />
        ))}
      </div>
    </div>
  </section>
)

export default MemberList
