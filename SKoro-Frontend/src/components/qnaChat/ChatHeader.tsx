import { X, Info } from 'lucide-react'
import { ButterflyWhiteImg } from '../../assets/common'
import ChatPanel from './ChatPanel'

const ChatHeader: React.FC<{
  handleCloseChat: () => void
}> = ({ handleCloseChat }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-[#d4e1ff] to-[#A06DFF] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center">
            <img
              src={ButterflyWhiteImg}
              alt="Chat Icon"
              className="w-10 h-10 pl-1"
            />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-white font-semibold">SKoro bot</h3>

              {/* 도움말 */}
              <div className="ml-2 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors relative group">
                <Info className="w-4 h-4 text-white" />
                <ChatPanel />
              </div>
            </div>

            <p className="text-white/80 text-sm">AI 챗봇이 답변드려요</p>
          </div>
        </div>

        <button
          onClick={handleCloseChat}
          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
