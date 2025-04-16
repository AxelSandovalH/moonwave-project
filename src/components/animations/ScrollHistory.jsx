import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HistoryCard from "../ui/HistoryCard";
import HistorySection from "../../assets/history-section.png";

// Registrar el plugin

export default function ScrollHistory() {
    // Referencias para el contenedor pinneado y el contenedor de items
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);
    
    useLayoutEffect(() => {
        import('gsap').then(({ gsap }) => {  // <-- Importación dinámica
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);
    // Contar la cantidad de secciones/hijos dentro del contenedor horizontal.
    const sections = gsap.utils.toArray(horizontalRef.current.children);
    // Calcular el desplazamiento horizontal total en función de la cantidad de elementos.
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current, // Inicio del efecto: cuando se alcance el contenedor
        pin: true,                     // Pinnea el contenedor para mantenerlo fijo
        scrub: 1,                      // Hace que la animación responda de forma suave al scroll
        snap: 1 / (sections.length - 1), // Snapea a cada sección
        end: () => `+=${containerRef.current.offsetWidth * (sections.length - 1)}`, 
        // Calcula el final del efecto: Puedes ajustar este valor según la cantidad de secciones y el ancho de cada una.
      },
    });

    // Limpieza al desmontar el componente
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
})
    })
  }, []);

  return (
    <>
      {/* Contenedor que se fijará en pantalla */}
      <div ref={containerRef} className="relative bg-[#F6EBD3] font-anton anton-regular">
        {/* Contenedor interno de desplazamiento horizontal */}
        <div ref={horizontalRef} className="flex items-center">
          {/* Puedes dividir el contenido en secciones */}
          <div className="min-w-screen h-[80vh] flex items-center justify-start">
            <div className="flex flex-col text-9xl mt-20 mr-20">
              <h2>DE LA</h2>
              <h2 className="bg-[#4EB3F1] w-7/12 text-center -rotate-8 border-[#FFF4DC] border-8">LUNA</h2>
              <h2>AL LIENZO</h2>
            </div>
          </div>
          <div className="min-w-full h-[80vh] flex items-center justify-center gap-20">
            {/* Aquí se puede agregar otro contenido o tu componente HistoryCard */}
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
          </div>
          
        </div>
          <img src={HistorySection.src} className="w-full" alt="" />
      </div>
      
    </>
  );
}
