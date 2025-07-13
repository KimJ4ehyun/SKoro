import { styles } from '.'

interface LoginFormData {
  employeeId: string
  password: string
}

interface LoginFormProps {
  formData: LoginFormData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  idPrefix?: string
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  idPrefix = '',
}) => (
  <form
    className="space-y-6"
    onSubmit={(e) => {
      e.preventDefault()
      onSubmit(e)
    }}
  >
    <fieldset className="space-y-6">
      <legend className="sr-only">로그인 정보 입력</legend>

      {/* 사원 번호 입력 */}
      <div>
        <label htmlFor={`${idPrefix}employeeId`} className={styles.label}>
          사원 번호
        </label>
        <input
          type="text"
          id={`${idPrefix}employeeId`}
          name="employeeId"
          value={formData.employeeId}
          onChange={onInputChange}
          placeholder="사원 번호를 입력하세요"
          className={styles.input}
          required
        />
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label htmlFor={`${idPrefix}password`} className={styles.label}>
          비밀번호
        </label>
        <input
          type="password"
          id={`${idPrefix}password`}
          name="password"
          value={formData.password}
          onChange={onInputChange}
          placeholder="비밀번호를 입력하세요"
          className={styles.input}
          required
        />
      </div>
    </fieldset>

    {/* 로그인 버튼 */}
    <button type="submit" className={styles.button}>
      로그인
    </button>
  </form>
)

export default LoginForm
