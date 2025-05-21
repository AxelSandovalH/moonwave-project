import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mwWaffle from '@assets/images/characters/moon-wafle.png';
import mwGalleta from '@assets/images/characters/sr-galleta-moon.png';
import mwTaza from '@assets/images/characters/coffe-moon-taza.png';
import mwCoffee from '@assets/images/characters/COFFE-MNW.png';

// Importar el componente de animación de texto por caracteres
import TextSplitReveal from '@components/animations/TextSplitReveal';

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Coffee() {
  // Referencias para los elementos
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const coffeeIconRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const waffleRef = useRef(null);
  const cupRef = useRef(null);
  const cookieRef = useRef(null);

  useEffect(() => {

    // Animación para cada imagen cuando se hace scroll
    gsap.fromTo(
      waffleRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imagesContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      cupRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imagesContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      cookieRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imagesContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Limpieza de animaciones al desmontar
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([
        coffeeIconRef.current,
        waffleRef.current,
        cupRef.current,
        cookieRef.current
      ]);
    };
  }, []);

  // Manejadores para animaciones hover
  const handleImageHover = (element) => {
    gsap.to(element, {
      scale: 1.15,
      duration: 0.5,
      ease: "power2.out",
      yoyo: true
    });
  };

  const handleImageLeave = (element) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <>
      <section className="bg-[#C09167] py-10 overflow-hidden" ref={sectionRef}>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center px-4 flex-wrap" ref={textRef}>
          <div className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold bg-[#FFF4DC] 
                         border-[#e0ddd5] border-8 px-6 sm:px-8 py-2 sm:py-4 shadow-lg 
                         text-center overflow-hidden">
            <TextSplitReveal 
              text="PROXIMAMENTE" 
              className="text-[#A87C54]"  
              triggerElement={sectionRef.current || undefined}
              />
          </div>
          
          <div 
            className="relative"
            ref={coffeeIconRef}
            onMouseEnter={() => handleImageHover(coffeeIconRef.current)}
            onMouseLeave={() => handleImageLeave(coffeeIconRef.current)}
          >
            <img 
              src={mwCoffee} 
              alt="Coffee MoonWave" 
              className="w-36 sm:w-44 md:w-56 lg:w-64 h-auto"
            />
            <div className="absolute inset-0 bg-yellow-800 rounded-full opacity-0 filter blur-xl transition-opacity duration-300 hover:opacity-20"></div>
          </div>
          
          <div className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold bg-[#FFF4DC] 
                         border-[#e0ddd5] border-8 px-6 sm:px-8 py-2 sm:py-4 shadow-lg 
                         text-center overflow-hidden">
            <TextSplitReveal 
              text="2025" 
              className="text-[#A87C54]" 
              triggerElement={sectionRef.current || undefined}
              />
          </div>
        </div>

        <div 
          ref={imagesContainerRef}
          className="flex flex-row sm:flex-row gap-5 items-center justify-center px-5 pt-8 w-8/12 sm:w-auto mx-auto"
        >
          <div 
            className="relative w-1/2 sm:w-3/12 overflow-visible"
            ref={waffleRef}
            onMouseEnter={() => handleImageHover(waffleRef.current)}
            onMouseLeave={() => handleImageLeave(waffleRef.current)}
          >
            <img 
              className="relative z-10" 
              src={mwWaffle} 
              alt="Waffle Moon" 
            />
            <div className="absolute inset-0 -z-10 bg-amber-300 rounded-full scale-75 opacity-0 filter blur-md transition-opacity duration-300 hover:opacity-40"></div>
          </div>

          <div 
            className="relative w-3/4 sm:w-5/12"
            ref={cupRef}
            onMouseEnter={() => handleImageHover(cupRef.current)}
            onMouseLeave={() => handleImageLeave(cupRef.current)}
          >
            <img 
              className="relative z-10" 
              src={mwTaza} 
              alt="Taza Moon" 
            />
            <div className="absolute inset-0 -z-10 bg-amber-600 rounded-full scale-90 opacity-0 filter blur-md transition-opacity duration-300 hover:opacity-30"></div>
          </div>

          <div 
            className="relative w-1/2 sm:w-3/12"
            ref={cookieRef}
            onMouseEnter={() => handleImageHover(cookieRef.current)}
            onMouseLeave={() => handleImageLeave(cookieRef.current)}
          >
            <img 
              className="relative z-10" 
              src={mwGalleta} 
              alt="Galleta Moon" 
            />
            <div className="absolute inset-0 -z-10 bg-amber-400 rounded-full scale-75 opacity-0 filter blur-md transition-opacity duration-300 hover:opacity-40"></div>
          </div>
        </div>
      </section>
    </>
  );
}