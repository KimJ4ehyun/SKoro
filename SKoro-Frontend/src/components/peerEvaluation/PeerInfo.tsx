import { Avatar } from '../common'

const PeerInfo: React.FC<{
  teamMember: any
}> = ({ teamMember }) => {
  return (
    <div className="w-60 bg-gray-50 flex flex-col">
      <h2 className="font-semibold mb-2">팀원 정보</h2>

      <section className="relative bg-white rounded-xl shadow-md p-6 flex-1 pt-10">
        <div className="text-center mb-6 ">
          <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
            <Avatar
              avatar={'👤'}
              size="xl"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-1">
            {teamMember.targetEmpName}
          </h3>
          <p className="text-sm">{teamMember.targetEmpPosition}</p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold mb-2">사번</p>
            <p className="text-sm">{teamMember.targetEmpNo}</p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">함께 진행한 프로젝트</p>
            {teamMember.jointTask
              ? teamMember.jointTask
                  .split(';')
                  .map((proj: string, index: number) => (
                    <p className="font-medium text-sm mb-1">- {proj}</p>
                  ))
              : '없음'}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PeerInfo
