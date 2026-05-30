import { useRef, useState, useEffect } from "react";
import { useHorizontalScroll } from "@hooks/useHorizontalScroll";
import HistoryCard from "@components/ui/HistoryCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos los plugins necesarios de GSAP
gsap.registerPlugin(ScrollTrigger);

export default function ScrollHistory() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Referencias para el contenedor del texto y para cada línea
  const textContainerRef = useRef(null);
  const delaRef = useRef(null);
  const lunaRef = useRef(null);
  const lienzoRef = useRef(null);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mediaQuery.matches);
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);
  
  // Aplicamos el scroll horizontal si no es mobile
  useHorizontalScroll(containerRef, horizontalRef, !isMobile);
  
  // Efectos de animación para los textos
  useEffect(() => {
    if (!textContainerRef.current) return;
    
    // Timeline principal
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animación para "DE LA"
    if (delaRef.current) {
      // Creamos contenedores por cada letra
      const chars = [...delaRef.current.textContent].map(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.position = "relative";
        return span;
      });
      
      // Limpiamos y añadimos los spans
      delaRef.current.textContent = "";
      chars.forEach(span => delaRef.current.appendChild(span));
      
      // Animación de entrada para cada letra
      masterTl.fromTo(
        chars,
        {
          display: "inline-block",
          opacity: 0,
          y: (i) => i * 20 - 40,
          rotationX: -90,
          transformOrigin: "50% 50% -20px"
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.07,
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        0
      );
    }
    
    // Animación para "LUNA"
    if (lunaRef.current) {
      // Preparamos el elemento
      gsap.set(lunaRef.current, { 
        opacity: 0, 
        scale: 0.8, 
        rotation: -15,
        transformOrigin: "center center" 
      });
      
      // Añadimos al timeline
      masterTl.to(
        lunaRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: -8,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)"
        },
        0.3 // Empieza después de un delay
      );
      
      // Añadimos un efecto de brillo con un gradient moviendo
      const lunaGlow = document.createElement("div");
      lunaGlow.style.position = "absolute";
      lunaGlow.style.inset = "0";
      lunaGlow.style.background = "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)";
      lunaGlow.style.backgroundSize = "200% 100%";
      lunaGlow.style.backgroundPosition = "-100% 0";
      lunaGlow.style.pointerEvents = "none";
      lunaGlow.style.mixBlendMode = "overlay";
      lunaRef.current.style.position = "relative";
      lunaRef.current.style.overflow = "hidden";
      
      // Animación del brillo
      masterTl.to(
        lunaGlow,
        {
          backgroundPosition: "200% 0",
          duration: 1.5,
          ease: "power2.inOut"
        },
        0.6
      );
    }
    
    // Animación para "AL LIENZO"
    if (lienzoRef.current) {
      // Creamos un efecto de escritura reveladora
      const text = lienzoRef.current.textContent;
      lienzoRef.current.textContent = "";
      
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      
      const textElem = document.createElement("div");
      textElem.textContent = text;
      textElem.style.position = "relative";
      textElem.style.zIndex = "1";
      
      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "0%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "#000";
      overlay.style.zIndex = "2";
      
      wrapper.appendChild(textElem);
      wrapper.appendChild(overlay);
      lienzoRef.current.appendChild(wrapper);
      
      // Animación del texto
      masterTl.fromTo(
        textElem,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0.8
      );
      
      // Animación de la revelación
      masterTl.fromTo(
        overlay,
        { 
          width: "0%", 
          left: "0" 
        },
        { 
          width: "100%", 
          duration: 0.8, 
          ease: "power2.inOut" 
        },
        0.9
      ).fromTo(
        overlay,
        { 
          left: "0" 
        },
        { 
          left: "100%", 
          duration: 0.8, 
          ease: "power2.inOut" 
        },
        1.7
      );
    }
    
    // Limpieza al desmontar
    return () => {
      if (masterTl) masterTl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isMobile]);
  
  // Animación para las tarjetas
  useEffect(() => {
    if (!horizontalRef.current) return;
    
    const cards = [...horizontalRef.current.querySelectorAll('div > div')].filter(
      (div, index) => index > 0 // Filtramos solo las tarjetas (no el contenedor de texto)
    );
    
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        scale: 0.7,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        stagger: isMobile ? 0.08 : 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isMobile]);
  
  return (
    <div
      ref={containerRef}
      className="history relative bg-[#F6EBD3] text-[#0A0A0A] font-anton anton-regular h-auto lg:h-screen z-50"
    >
      <div
        ref={horizontalRef}
        className={`relative z-50 flex items-center ${
          isMobile ? "flex-col" : "flex-row"
        } gap-5 md:gap-0`}
      >
        <div className="w-full sm:min-w-7/12 lg:min-w-6/12 2xl:min-w-5/12 sm:h-[70vh] flex items-center justify-center lg:justify-end">
          <div 
            ref={textContainerRef}
            className="text-history flex flex-col text-5xl sm:text-8xl md:text-9xl mt-10 sm:mt-20 sm:w-auto text-center sm:text-left"
          >
            <h2 ref={delaRef} className="overflow-hidden">DE LA</h2>
            <h2 
              ref={lunaRef} 
              className="bg-[#4EB3F1] w-8/12 md:w-7/12 mx-auto sm:mx-0 text-center border-[#FFF4DC] border-8"
            >
              LUNA
            </h2>
            <h2 ref={delaRef} className="overflow-hidden">AL LIENZO</h2>
          </div>
        </div>
        
        {[10, -10, 10, -10].map((rotation, index) => (
          <div
            key={index}
            className="w-full sm:min-w-full h-auto sm:h-[70vh] flex items-center justify-center z-50 py-4"
          >
            <HistoryCard rotate={rotation} />
          </div>
        ))}
      </div>
    </div>
  );
}