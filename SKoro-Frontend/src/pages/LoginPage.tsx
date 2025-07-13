import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BackgroundElements,
  BrandingSection,
  Header,
  LoginForm,
} from '../components/loginPage'
import useDocumentTitle from '../hooks/useDocumentTitle'
import UserService from '../services/UserService'

interface LoginFormData {
  employeeId: string
  password: string
}

const LoginPage: React.FC = () => {
  useDocumentTitle('로그인 - SKoro')

  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormData>({
    employeeId: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    UserService.login(formData.employeeId, formData.password)
      .then((response) => {
        console.log('로그인 성공:', response)
        navigate('/home')
      })
      .catch((error) => {
        console.error('로그인 실패:', error)
        alert('로그인에 실패했습니다. 사원 번호와 비밀번호를 확인해주세요.')
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3D8EFF] via-blue-500 to-blue-600 relative overflow-hidden">
      {/* 배경 그라데이션 */}
      {/* <div className="min-h-screen bg-gradient-to-br from-blue-400 via-[#3D8EFF] to-blue-600 relative overflow-hidden"> */}

      <BackgroundElements />
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {/* 데스크톱 레이아웃 */}
        <div className="hidden lg:flex items-center justify-center gap-20 max-w-6xl w-full">
          <BrandingSection />

          <section className="flex-shrink-0 w-96">
            <LoginForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              idPrefix="desktop-"
            />
          </section>
        </div>

        {/* 모바일/태블릿 레이아웃 */}
        <div className="lg:hidden flex flex-col items-center justify-center w-full max-w-md space-y-12">
          <BrandingSection isMobile />

          <section className="w-full">
            <LoginForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              idPrefix="mobile-"
            />
          </section>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
