import wall from '../../assets/images/characters/wall.png'
import cartel from '../../assets/images/characters/cartel.png'
import mnwBomba from '../../assets/images/characters/bomba-1.png'
import mnwBomba2 from '../../assets/images/characters/MnW-bomba.png'
import mnwNube from '../../assets/images/characters/Nubes-MNW.png'

export default function Footer() {
    return (
        <section className="relative w-full h-[500px] overflow-hidden">
            <div className="absolute inset-0 z-0 flex">
                <img src={wall.src} alt="" className="w-full object-cover" />
                <img src={wall.src} alt="" className="w-full object-cover" />
            </div>

            <div className="absolute inset-0 z-10 flex justify-between items-center px-10">
                <img src={mnwBomba.src} alt="bomba izquierda" className="w-3/12 -translate-y-25 h-auto" />
                <div className="relative w-[400px] h-auto translate-x-10">
                    <img src={cartel.src} alt="cartel" className="w-full h-auto" />
                    <div className="absolute inset-0 flex flex-col px-4 text-center text-black font-bold text-sm leading-snug translate-y-15 gap-5">
                        <h2 className="text-2xl font-extrabold mb-2">SERVICIOS MOONWAVE</h2>
                        <ul className="space-y-1 text-lg">
                        <li>• SERIGRAFIA PERSONALIZADA</li>
                        <li>• DISEÑO GRAFICO Y ARTE PARA PRENDAS</li>
                        <li>• PRODUCCION POR DROPS</li>
                        <li>• ASESORIA CREATIVA PARA MARCAS</li>
                        </ul>
                        <div className="mt-3 text-lg">
                        <p>📧 contacto@moonwave.com</p>
                        <p>📞 +52 XXX XXX XXX</p>
                        <p>📍 Av. de las Rosas 29192</p>
                        </div>
                        <div className="mt-3 text-lg w-10/12 flex items-center justify-center mx-auto translate-y-5">
                        <p>© 2025 MOONWAVE. ARTE CON IDENTIDAD. TODOS LOS DERECHOS RESERVADOS.</p>
                        </div>
                    </div>
                </div>

                <img src={mnwBomba2.src} alt="bomba derecha" className="w-3/12 -translate-y-28 h-auto" />
            </div>

            <div className="absolute bottom-4 right-10 z-20">
                <img src={cartel.src} alt="redes sociales" className="w-[400px] h-auto translate-y-72" />
            </div>

            <div className="absolute bottom-4 left-10 z-20 opacity-80">
                <img src={mnwNube.src} alt="logo blanco" className="w-12/12 h-auto translate-x-30" />
            </div>
        </section>
    )
}
