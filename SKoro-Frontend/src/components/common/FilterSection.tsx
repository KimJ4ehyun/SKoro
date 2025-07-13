import { useEffect, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import type { DropdownProps, SearchBoxProps } from '../../types/TeamPage.types'
import { styles, Button } from '.'
import TeamService from '../../services/TeamService'
import { calendarEvents } from '../../dummy/dashboart'
import { useLocation } from 'react-router-dom'
import { useUserInfoStore } from '../../store/useUserInfoStore'

interface Period {
  periodId: number
  year: number
  periodName: string
  unit: string
  orderInYear: number
  startDate: string
  endDate: string
  final: boolean
}

const FilterSection: React.FC<{
  selectedYear: string
  setSelectedYear: (year: string) => void
  selectedRating: string
  setSelectedRating: (rating: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filterType: 'team' | 'feedback' | 'final' | 'member'
  setSelectedPeriod: (period: Period | null) => void
  selectedPeriod?: Period | null
}> = ({
  selectedYear,
  setSelectedYear,
  selectedRating,
  setSelectedRating,
  searchQuery,
  setSearchQuery,
  filterType,
  setSelectedPeriod,
}) => {
  const [periods, setPeriods] = useState<Period[]>([])
  const [selectedPeriodName, setSelectedPeriodName] = useState<string>('')

  const location = useLocation()
  const selectedPeriod = location.state?.selectedPeriod || null
  const member = location.state?.member || null
  const curMemberEmpNo = useUserInfoStore((state) => state.empNo)
  const curMemberRole = useUserInfoStore((state) => state.role)

  const [prevPageSelectedPeriod, setPrevPageSelectedPeriod] =
    useState<Period | null>(location.state?.selectedPeriod || null)

  // 연도 목록을 내림차순으로 생성
  const getYearOptions = () => {
    const uniqueYears = [...new Set(periods.map((period) => period.year))]
    return uniqueYears.sort((a, b) => b - a).map((year) => `${year}년도`)
  }

  // 선택된 연도에 해당하는 period 목록 반환
  const getPeriodOptions = () => {
    if (!selectedYear) return []

    const year = parseInt(selectedYear.replace('년도', ''))
    let yearPeriods = periods.filter((period) => period.year === year)

    // filterType에 따라 필터링
    if (member) {
    } else if (filterType === 'feedback' || filterType === 'member') {
      yearPeriods = yearPeriods.filter((period) => !period.final)
    } else if (filterType === 'final') {
      yearPeriods = yearPeriods.filter((period) => period.final)
    }

    // orderInYear 기준으로 정렬
    return yearPeriods.sort((a, b) => b.periodId - a.periodId)
  }

  // period 이름으로 해당 period 객체 찾기
  const findPeriodByName = (periodName: string): Period | null => {
    // return periods.find((period) => period.periodName === periodName) || null

    // year과 periodName이 모두 일치하는 경우 찾기
    return (
      periods.find(
        (period) =>
          period.periodName === periodName &&
          period.year === parseInt(selectedYear.replace('년도', ''))
      ) || null
    )
  }

  useEffect(() => {
    if (filterType === 'member' || curMemberRole === 'MEMBER') {
      TeamService.getMemberPeriods(
        filterType === 'member' ? member.empNo : curMemberEmpNo
      )
        .then((periodsData: Period[]) => {
          console.log('팀원의 평가 기간 목록 조회 성공:', periodsData)
          setPeriods(periodsData)
          let filtered = [...periodsData]

          if (filterType === 'feedback') {
            filtered = filtered.filter((p) => !p.final)
          } else if (filterType === 'final') {
            filtered = filtered.filter((p) => p.final)
          }

          if (prevPageSelectedPeriod) {
            setSelectedYear(`${prevPageSelectedPeriod.year}년도`)
            setSelectedPeriodName(prevPageSelectedPeriod.periodName)
            setSelectedPeriod(prevPageSelectedPeriod)
          } else if (selectedPeriod) {
            setSelectedYear(`${selectedPeriod.year}년도`)
            setSelectedPeriodName(selectedPeriod.periodName)
            setSelectedPeriod(selectedPeriod)
          } else if (filtered.length > 0) {
            const latestPeriod = filtered.sort(
              (a, b) => b.periodId - a.periodId
            )[0]
            setSelectedYear(`${latestPeriod.year}년도`)
            setSelectedPeriodName(latestPeriod.periodName)
            setSelectedPeriod(latestPeriod)
          } else {
            setSelectedPeriodName('평가 기간이 없습니다')
            setSelectedPeriod(null)
          }
        })
        .catch((error) => {
          console.error('팀원의 평가 기간 목록 조회 실패:', error)
        })
    } else {
      TeamService.getPeriods()
        .then((periodsData: Period[]) => {
          console.log('팀의 평가 기간 목록 조회 성공:', periodsData)
          setPeriods(periodsData)

          let filtered = [...periodsData]

          if (filterType === 'feedback') {
            filtered = filtered.filter((p) => !p.final)
          } else if (filterType === 'final') {
            filtered = filtered.filter((p) => p.final)
          }

          if (prevPageSelectedPeriod) {
            setSelectedYear(`${prevPageSelectedPeriod.year}년도`)
            setSelectedPeriodName(prevPageSelectedPeriod.periodName)
            setSelectedPeriod(prevPageSelectedPeriod)
          } else if (selectedPeriod) {
            setSelectedYear(`${selectedPeriod.year}년도`)
            setSelectedPeriodName(selectedPeriod.periodName)
            setSelectedPeriod(selectedPeriod)
          } else if (filtered.length > 0) {
            const latestPeriod = filtered.sort(
              (a, b) => b.periodId - a.periodId
            )[0]
            setSelectedYear(`${latestPeriod.year}년도`)
            setSelectedPeriodName(latestPeriod.periodName)
            setSelectedPeriod(latestPeriod)
          } else {
            setSelectedPeriodName('평가 기간이 없습니다')
            setSelectedPeriod(null)
          }
        })
        .catch((error) => {
          console.error('팀의 평가 기간 목록 조회 실패:', error)
        })
    }
  }, [setSelectedYear, setSelectedPeriod, selectedPeriod, filterType])

  // 연도 변경 시 해당 연도의 첫 번째 period 선택
  const handleYearChange = (year: string) => {
    setSelectedYear(year)

    const yearNumber = parseInt(year.replace('년도', ''))

    // 선택된 연도에 해당하는 period 중 filterType에 맞는 것만 필터링
    let yearPeriods = periods.filter((period) => period.year === yearNumber)

    if (member) {
    } else if (filterType === 'feedback' || filterType === 'member') {
      yearPeriods = yearPeriods.filter((period) => !period.final)
    } else if (filterType === 'final') {
      yearPeriods = yearPeriods.filter((period) => period.final)
    }

    // orderInYear 기준 정렬 (선택 기준이 마지막 것이든 첫 번째든 여기선 정렬 기준 명확히 해야 함)
    yearPeriods.sort((a, b) => b.periodId - a.periodId)

    if (yearPeriods.length > 0) {
      const firstPeriod = yearPeriods[0]
      setSelectedPeriodName(firstPeriod.periodName)
      setSelectedPeriod(firstPeriod)
    } else {
      setSelectedPeriodName('평가 기간이 없습니다')
      setSelectedPeriod(null)
    }
  }

  // period 이름 변경 시 해당 period 객체 설정
  const handlePeriodChange = (periodName: string) => {
    // '평가 기간이 없습니다' 메시지인 경우 무시
    if (periodName === '평가 기간이 없습니다') return

    setSelectedPeriodName(periodName)
    const selectedPeriodObj = findPeriodByName(periodName)
    setSelectedPeriod(selectedPeriodObj)
  }

  const yearOptions = getYearOptions()
  const periodOptions = getPeriodOptions()

  return (
    <section className="mb-5 flex-shrink-0">
      <nav
        className="flex gap-6 mb-5 flex-wrap"
        role="navigation"
        aria-label="필터 옵션"
      >
        <Dropdown
          label="연도"
          value={selectedYear}
          options={yearOptions}
          onChange={handleYearChange}
        />

        {filterType !== 'final' && (
          <Dropdown
            label="평가 기간"
            value={selectedPeriodName}
            options={
              periodOptions.length > 0
                ? periodOptions.map((period) => period.periodName)
                : ['평가 기간이 없습니다']
            }
            onChange={handlePeriodChange}
            disabled={periodOptions.length === 0}
          />
        )}

        {filterType === 'team' && (
          <SearchBox
            placeholder="이름을 입력하세요"
            value={searchQuery}
            onChange={setSearchQuery}
          />
        )}
      </nav>
      <hr className="border-gray-200" />
    </section>
  )
}

export default FilterSection

const Dropdown: React.FC<DropdownProps & { disabled?: boolean }> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative min-w-[200px]">
      <label className={`block ${styles.textSemibold} mb-2`}>{label}</label>
      <div className="relative">
        <Button
          variant="secondary"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full text-left ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={disabled}
        >
          <span
            className={`block truncate pr-8 ${disabled ? 'text-gray-400' : ''}`}
          >
            {value || '선택해주세요'}
          </span>
          <ChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform ${
              isOpen ? 'rotate-180' : ''
            } ${disabled ? 'text-gray-400' : ''}`}
          />
        </Button>

        {isOpen && !disabled && (
          <>
            <nav className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={`${option}-${index}`}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    option === '평가 기간이 없습니다'
                      ? 'text-gray-400 cursor-not-allowed'
                      : ''
                  } ${
                    option === value
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : ''
                  }`}
                  disabled={option === '평가 기간이 없습니다'}
                >
                  {option}
                </button>
              ))}
            </nav>
            <div
              className="fixed inset-0 z-0"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  )
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  value,
  onChange,
}) => (
  <div className="relative flex-1 min-w-[300px]">
    <label className={`block ${styles.textSemibold} mb-2`}>팀원 검색</label>
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${styles.input} w-full pr-12`}
        aria-label="팀원 검색"
      />
      <Search
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
        aria-hidden="true"
      />
    </div>
  </div>
)
