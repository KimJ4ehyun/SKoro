import { useEffect, useState } from 'react'
import { Plus, Minus, MoreHorizontal } from 'lucide-react'
import TeamService from '../../services/TeamService'
import { useUserInfoStore } from '../../store/useUserInfoStore'

const Tasks = () => {
  const [expandedTasks, setExpandedTasks] = useState(new Set())
  const [teamTasks, setTeamTasks] = useState([])
  const userRole = useUserInfoStore((state) => state.role)

  useEffect(() => {
    if (userRole === 'MANAGER') {
      // [팀장] 팀 TASK 리스트 조회
      TeamService.getTeamKpis()
        .then((teamKpis) => {
          console.log('팀 TASK 리스트 조회 성공:', teamKpis)
          setTeamTasks(teamKpis)
        })
        .catch((error) => {
          console.error('팀 TASK 리스트 조회 실패:', error)
        })
    } else {
      // [팀원] 팀 TASK 리스트 조회
      TeamService.getMyTasks()
        .then((teamKpis) => {
          console.log('팀 TASK 리스트 조회 성공:', teamKpis)
          setTeamTasks(teamKpis)
        })
        .catch((error) => {
          console.error('팀 TASK 리스트 조회 실패:', error)
        })
    }
  }, [])

  const toggleTaskExpansion = (taskId: any) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  return (
    <div className="h-1/2 flex flex-col pb-2">
      <h2 className="font-semibold mb-2">
        2025년도 {userRole === 'MANAGER' ? '팀' : '개인'} Task
      </h2>

      <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 max-h-96 overflow-y-auto space-y-2 p-2">
        {teamTasks.map((task: any) => (
          <div
            key={task.teamKpiId || task.taskId}
            className="border border-gray-200 rounded-lg p-4 py-2 hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div>
                  <span className="text-xs text-blue-600 font-semibold">
                    {task.kpiName || task.taskName}
                  </span>
                  <h3 className="text-gray-800 font-semibold">
                    {task.description || task.kpiName}
                  </h3>
                </div>
                <div className="bg-gray-100 rounded-2xl p-2 py-0 w-[fit-content] mt-2 mb-1">
                  <span className="text-xs font-semibold">
                    {task.weight ? '비중' : '업무 수준'}
                  </span>
                  <span className="text-xs ml-2">
                    {task.weight || task.targetLevel}
                    {task.weight ? '%' : ''}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end space-x-2">
                <div className="flex items-center">
                  <span className="text-xs text-gray-600 mr-1">
                    {(task.participants || task.teamMembers).length} People
                  </span>
                  <button
                    onClick={() =>
                      toggleTaskExpansion(task.teamKpiId || task.taskId)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {expandedTasks.has(task.teamKpiId || task.taskId) ? (
                      <Minus className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex -space-x-2">
                    {(task.participants || task.teamMembers)
                      .slice(0, 3)
                      .map((avatar: any, index: any) => (
                        <div
                          key={index}
                          className="w-8 h-8 bg-blue-100 rounded-full border-2 border-white text-[0.6rem] flex items-center justify-center"
                        >
                          👤
                        </div>
                      ))}

                    {(task.participants || task.teamMembers).length > 3 && (
                      <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                        <MoreHorizontal className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 팀원 리스트 */}
            {expandedTasks.has(task.teamKpiId || task.taskId) && (
              <div className="mt-2 pt-3 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  팀원 목록
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {(task.participants || task.teamMembers).map(
                    (member: any, index: any) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 py-1"
                      >
                        <div className="w-6 h-6 bg-blue-100 rounded-full text-[0.6rem] flex items-center justify-center">
                          👤
                        </div>
                        <span className="text-sm text-gray-600">
                          {member.empName}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
