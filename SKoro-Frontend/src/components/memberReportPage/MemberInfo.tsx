import { useLocation } from 'react-router-dom'
import { Avatar } from '../common'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { useEffect, useState } from 'react'
import EmployeesService from '../../services/EmployeesService'

const MemberInfo: React.FC<{
  pageType?: 'home'
}> = ({ pageType }) => {
  const location = useLocation()
  const currentUser = useUserInfoStore((state) => state)
  const [member, setMember] = useState(currentUser)

  useEffect(() => {
    if (location.state?.member) {
      EmployeesService.getEmployee(location.state.member.empNo)
        .then((employee) => {
          console.log('직원 정보 조회 성공:', employee)
          setMember(employee)
        })
        .catch((error) => {
          console.error('직원 정보 조회 실패:', error)
          setMember(currentUser)
        })
    }
  }, [location.state])

  return (
    <section
      className={`mt-5 lg:mt-0 w-full lg:w-72 flex flex-col px-0 lg:pl-0 ${
        pageType === 'home' ? 'lg:px-10' : 'pb-5 lg:ml-[-12px] px-10'
      }`}
    >
      <h2 className="font-semibold">세부 정보</h2>

      <section
        className={`flex-1 mt-2 bg-white rounded-xl p-6 pt-8 flex flex-col items-center overflow-auto ${
          pageType === 'home'
            ? 'shadow-sm hover:shadow-lg mb-10 lg:mb-0'
            : 'shadow-md'
        }`}
      >
        <Avatar size="xl" avatar="👤" />
        <h2 className="text-2xl font-semibold mb-1 mt-5">{member.empName}</h2>
        <p className="mb-7 text-sm">{member.headquarterName}</p>

        <div className="flex-1 overflow-y-auto w-full">
          <InfoContent title="사번" content={member.empNo} />
          {<InfoContent title="본부" content={member.headquarterName} />}
          <InfoContent title="부서" content={member.partName} />
          <InfoContent title="팀" content={member.teamName} />
          <InfoContent title="직위" content={member.position} />
          <InfoContent title="Career Level" content={member.cl} />
          <InfoContent title="이메일" content={member.email} />
        </div>
      </section>
    </section>
  )
}

export default MemberInfo

const InfoContent: React.FC<{
  title: string
  content: string | number
}> = ({ title, content }) => {
  if (!content) return null
  return (
    <div className="w-full mb-6">
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-sm">{content}</p>
    </div>
  )
}
