import { ButterflyImg } from '../../assets/common'

const BackgroundElements: React.FC = () => (
  <>
    {/* 좌측 하단 배경 이미지 */}
    <div className="absolute bottom-3 left-0 w-1/2 h-full flex items-end justify-start">
      <img
        src={ButterflyImg}
        alt="Butterfly"
        className="w-full h-auto transform translate-x-2/5 "
      />
    </div>

    {/* 배경 기하학적 도형들 */}
    {/* <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-300 opacity-20 rounded-full blur-xl"></div>

      <div className="absolute top-40 right-32 w-24 h-24 bg-white opacity-10 rounded-lg rotate-45"></div>
      <div className="absolute top-32 left-[10%] w-20 h-20 bg-blue-200 opacity-15 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-white opacity-10 rounded-lg rotate-12"></div>
      <div className="absolute top-[48%] left-[24%] w-16 h-16 bg-blue-300 opacity-20 rounded-full"></div>
      <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-white opacity-15 rounded-lg rotate-45"></div>
    </div> */}
  </>
)

export default BackgroundElements
