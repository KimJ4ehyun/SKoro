import { styles, cn } from '.'

interface BrandingSectionProps {
  isMobile?: boolean
}

const BrandingSection: React.FC<BrandingSectionProps> = ({
  isMobile = false,
}) => (
  <section
    className={cn(
      'text-white',
      isMobile ? 'text-center' : 'text-center lg:text-left max-w-lg'
    )}
  >
    <h1
      className={cn(
        styles.brandingTitle,
        isMobile ? 'text-5xl md:text-6xl mb-4' : 'text-8xl'
      )}
    >
      SKoro
    </h1>
    <p
      className={cn(
        styles.brandingSubtitle,
        isMobile ? 'text-lg md:text-xl' : 'text-xl'
      )}
    >
      신뢰를 담은 평가, 성장을 잇다
    </p>
  </section>
)

export default BrandingSection
