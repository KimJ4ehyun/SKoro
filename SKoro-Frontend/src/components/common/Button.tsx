import { styles } from '.'

const Button: React.FC<{
  variant: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}> = ({ variant, size = 'md', children, onClick, className = '' }) => {
  const baseStyles = styles.button
  const variantStyles =
    variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles[size]} rounded-lg ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
