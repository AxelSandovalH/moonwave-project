import mwWaffle from '../../assets/images/characters/moon-wafle.png'
import mwGalleta from '../../assets/images/characters/sr-galleta-moon.png'
import mwTaza from '../../assets/images/characters/coffe-moon-taza.png'
import mwCoffee from '../../assets/images/characters/COFFE-MNW.png'
import coffeeWave from '../../assets/coffee-wave.png'


export default function Coffee () {
    return (
        <>
        <section className="bg-[#C09167]">
            <div className="flex gap-5 items-center justify-center">
                <h2 className="text-8xl bg-[#FFF4DC] border-[#e0ddd5] text-[#A87C54] border-8 h-fit">PROXIMAMENTE</h2>
                <img src={mwCoffee.src} alt="" />
                <h2 className="text-8xl bg-[#FFF4DC] border-[#e0ddd5] text-[#A87C54] border-8 h-fit">2025</h2>
            </div>
            <div className="flex gap-5 items-center justify-center">
                <img src={mwWaffle.src} alt="" />
                <img src={mwTaza.src} alt="" />
                <img src={mwGalleta.src} alt="" />
            </div>
        </section>
        {/* <img className='w-full' src={coffeeWave.src} alt="" /> */}
        </>
    )
}