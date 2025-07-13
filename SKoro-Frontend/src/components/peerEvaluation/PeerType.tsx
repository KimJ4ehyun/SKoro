import { collaborationOptions } from '../../constants/peerEvaluation'

const PeerType: React.FC<{
  onNext: () => void
  onOptionSelect: (optionId: number) => void
  selectedOption: number
}> = ({ onNext, onOptionSelect, selectedOption }) => {
  return (
    <>
      <div>
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-blue-600 mb-1">
            협업 방식
          </h2>
          <h3 className="text-xl font-semibold">
            해당 동료와 어떤 형태로 함께 일하셨나요?
          </h3>
        </div>

        <div className="space-y-3">
          {collaborationOptions.map((option) => (
            <div
              key={option.id}
              className={`flex items-center hover:shadow-md transition-shadow ${
                selectedOption === option.id
                  ? 'bg-blue-50 shadow-lg'
                  : 'bg-white shadow-sm'
              } rounded-lg cursor-pointer`}
            >
              <div
                className="w-1 bg-blue-400 rounded-full mr-4 flex-shrink-0"
                style={{ height: '60px' }}
              ></div>
              <div className="flex-1">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="collaboration"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => onOptionSelect(option.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedOption === option.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{option.text}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end flex-1">
        <button
          onClick={onNext}
          disabled={!selectedOption}
          className={`px-10 py-3 rounded-lg font-medium
                  mt-auto
                  ${
                    selectedOption
                      ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
        >
          다음으로
        </button>
      </div>
    </>
  )
}

export default PeerType
