import { ButterflyPurpleImg } from '../../assets/common'

const ChatPanel = () => {
  return (
    <div className="absolute top-full left-[-8.5rem] mt-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible transition-opacity duration-200">
      {/* Hover Panel */}
      <div className="space-y-2">
        <div className="border-b border-gray-100 pb-2 flex items-center space-x-2">
          <img
            src={ButterflyPurpleImg}
            alt="Chat Icon"
            className="w-6 h-6 ml-1"
          />
          <h4 className="font-semibold text-sm text-gray-800">
            채팅 옵션 안내
          </h4>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h5 className="font-medium text-sm text-gray-800">
                SKoro bot과 대화
              </h5>
              <p className="text-sm text-gray-600 mt-1">
                AI 성과 평가 결과에 대해 궁금한 점이 있거나,
                <br />
                속상하거나, 응원 한마디가 필요할 때는
                <br />
                SKoro bot과 편하게 대화해보세요.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                평가에 대한 이유나 근거를 물어볼 수도 있고,
                <br />
                위로와 격려도 받을 수 있어요.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                친구처럼 가볍게 이야기 나눠도 괜찮아요.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h5 className="font-medium text-sm text-gray-800">
                팀장님께 이야기
              </h5>
              <p className="text-sm text-gray-600 mt-1">
                성과 평가나 평소 하고 싶었던 말을 챗봇을 통해 먼저 정리하고
                표현해볼 수 있어요.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                대화가 끝난 뒤에는 ‘요약’ 버튼을 누르면, 말한 내용을 익명으로
                알맞게 정리해드려요.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                원한다면 이 요약 내용을 팀장님께 직접 전달할 수 있어요. 불만을
                해소하고, 격려를 주고받는 건강한 소통의 시작점이 되어줄 거예요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
