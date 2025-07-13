import { ChevronRight, Info } from 'lucide-react'

const steps = [
  { number: 1, label: '협업 방식' },
  { number: 2, label: '키워드 선택' },
]

const PeerNav: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <div className="flex items-center mb-5">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium ${
              currentStep === step.number ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          >
            {step.number}
          </div>
          <span
            className={`ml-3 text-md font-medium ${
              currentStep === step.number ? 'text-black' : 'text-gray-400'
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <ChevronRight className="mx-3 w-4 h-4 text-gray-400" />
          )}
        </div>
      ))}
      <Info className="ml-auto w-5 h-5 text-gray-400" />
    </div>
  )
}

export default PeerNav
