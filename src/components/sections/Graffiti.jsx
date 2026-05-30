import React, { useRef, useEffect } from "react";
import { useTextReveal } from "@hooks/useTextReveal";
import { GraffitiCard } from "@components/ui/GraffitiCard";
import graffiti1 from "@assets/images/graffitis/graffiti1.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Graffiti() {
  const textRef1 = useRef(null); // Referencia para MOONWAVE
  const textRef2 = useRef(null); // Referencia para EN LAS CALLES
  
  // Referencias para las tarjetas de graffiti
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const sectionRef = useRef(null);

  // Configuración para MOONWAVE (dorado)
  useTextReveal(textRef1, {
    baseColor: "rgba(255, 255, 255, 0.5)", // Café claro
    revealColor: "#fff9ec", // Dorado
    duration: 1.2,
    stagger: 0.2,
    scrollTrigger: {
      start: "top 60%",
      end: "bottom 20%"
    }
  });

  // Configuración para EN LAS CALLES (color predeterminado)
  useTextReveal(textRef2, {
    baseColor: "rgba(0, 0, 0, 0.4)", // Color inicial personalizado
    revealColor: "#1a1a1a", // Color final personalizado (oro)
    duration: 1.2,
    stagger: 0.2,
    scrollTrigger: {
      start: "top 70%",
      end: "bottom 30%"
    }
  });

  useEffect(() => {
    // Animación de entrada para las tarjetas de graffiti
    const cards = [card1Ref, card2Ref, card3Ref, card4Ref].filter(ref => ref.current);
    
    // Animación de entrada para las tarjetas con efecto escalonado
    gsap.fromTo(
      cards.map(ref => ref.current),
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Efecto parallax sutil para las tarjetas durante el scroll
    cards.forEach((cardRef, index) => {
      if (!cardRef.current) return;
      
      // Ajustamos la velocidad del parallax según la posición
      const speed = index % 2 === 0 ? 0.3 : -0.3;
      
      gsap.to(cardRef.current, {
        y: `${speed * 50}`,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    });

    // Animación de texto deslizante
    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", 
        end: "center center",
        toggleActions: "play none none reverse"
      }
    });

    textTimeline
      .fromTo(textRef1.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(textRef2.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
        "-=0.5" // Overlap
      );

    return () => {
      // Limpieza de scroll triggers cuando el componente se desmonta
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F6EBD3] text-[#0A0A0A] px-6 py-10 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
        <div className="md:translate-y-20" ref={card1Ref}>
          <GraffitiCard graffitiImage={graffiti1} rotation="-rotate-6" />
        </div>

        <div className="flex flex-col items-center md:items-start w-full text-center md:text-left col-span-1 col-start-1 row-start-1 md:col-auto md:row-auto mx-auto">
          <h2
            ref={textRef1}
            className="text-6xl lg:text-7xl xl:text-8xl bg-[#A87C54] px-4 py-2 -rotate-6 z-50 border-[#FFF4DC] border-8 w-fit"
          >
            MOONWAVE
          </h2>
          <h2
            ref={textRef2}
            className="text-6xl lg:text-7xl xl:text-8xl relative -top-2 -rotate-3"
          >
            EN LAS CALLES
          </h2>
        </div>

        <div className="flex flex-col md:flex-row w-full md:w-6/12 items-center justify-center gap-5 md:rotate-[-4deg] md:translate-x-20 md:translate-y-5">
          <GraffitiCard ref={card2Ref} graffitiImage={graffiti1} />
          <GraffitiCard ref={card3Ref} graffitiImage={graffiti1} />
        </div>
        <div className="md:-translate-y-28 md:ml-20" ref={card4Ref}>
          <GraffitiCard graffitiImage={graffiti1} rotation="-rotate-3" />
        </div>
      </div>
    </section>
  );
}