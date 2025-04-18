import GraffitiCard from "../ui/GraffitiCard"
import graffiti1 from '../../assets/images/graffitis/graffiti1.png'


export default function Graffiti () {
    return (
        <section className="bg-[#F6EBD3] grid grid-cols-2 grid-rows-2 gap-4 place-items-center ">
            <div className="translate-y-20">
            <GraffitiCard graffitiImage={graffiti1} rotation="-rotate-6"/>
            </div>
            <div className="flex flex-col items-start w-12/12 -translate-y-10">
                <h2 className="text-8xl bg-[#A87C54] px-4 py-2 -rotate-8 z-50 border-[#FFF4DC] border-8 w-6/12 translate-x-5">MOONWAVE</h2>
                <h2 className="text-8xl relative -top-2 -rotate-3">EN LAS CALLES</h2>
            </div>
            <div className="flex w-6/12 items-center justify-center -rotate-4 gap-5 translate-x-20 translate-y-5">
            <GraffitiCard graffitiImage={graffiti1} />
            <GraffitiCard graffitiImage={graffiti1}/>
            </div>
            <div className="-translate-y-38">
            <GraffitiCard graffitiImage={graffiti1} rotation="-rotate-3"/>
            </div>

        </section>
    )
}