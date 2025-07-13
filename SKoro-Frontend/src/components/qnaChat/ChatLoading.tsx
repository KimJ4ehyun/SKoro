import { ButterflyWhiteImg } from '../../assets/common'

const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center space-x-1 py-2">
      <div
        className="w-2 h-2 bg-gray-400 rounded-full big-bounce"
        style={{
          animationDelay: '0ms',
        }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full big-bounce"
        style={{
          animationDelay: '80ms',
        }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full big-bounce"
        style={{
          animationDelay: '160ms',
        }}
      ></div>
    </div>
  )
}

const ChatLoading = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[#E3D4FF] to-[#A06DFF] rounded-full flex items-center justify-center flex-shrink-0 mt-[0.1rem]">
          <img
            src={ButterflyWhiteImg}
            alt="Bot Icon"
            className="w-5 h-5 pl-[0.1rem]"
          />
        </div>
        <div className="bg-white shadow-sm px-3 py-2 rounded-xl rounded-tl-md">
          <LoadingDots />
        </div>
      </div>
    </div>
  )
}

export default ChatLoading
