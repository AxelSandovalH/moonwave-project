import dave from '../../assets/images/characters/dave.png'
import historySvg from '../../assets/history-section.svg'


export default function HistoryCard () {
    return (
        <div className="bg-[#FFF4DC] -rotate-12 p-5 rounded-2xl min-w-6/12 h-9/12 z-50 shadow-2xl">
            <img src={dave.src} width={400} alt="" />
        </div>
    )
}