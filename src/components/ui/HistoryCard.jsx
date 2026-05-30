import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dave from '@assets/images/characters/dave.png';

// Registramos el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function HistoryCard({ rotate }) {
  // Referencias para los elementos que queremos animar
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animación de entrada inicial
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(cardRef.current, 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    );
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, scale: 0.5, rotate: -15 }, 
      { opacity: 1, scale: 1, rotate: -6, duration: 0.6 }, 
      "-=0.4"
    );
    
    tl.fromTo(imageRef.current, 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.6 }, 
      "-=0.3"
    );
    
    tl.fromTo(textRef.current, 
      { opacity: 0, x: 50 }, 
      { opacity: 1, x: 0, duration: 0.6 }, 
      "-=0.4"
    );

    // Animaciones con ScrollTrigger para cuando el elemento sea visible
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      scale: 1.05,
      duration: 1
    });

    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: -10,
      rotate: 5,
      duration: 1
    });

    // Efecto hover en la tarjeta
    const card = cardRef.current;
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width - 0.5) * 10;
      const yPercent = (y / rect.height - 0.5) * 10;
      
      gsap.to(card, {
        rotateY: xPercent,
        rotateX: -yPercent,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        rotate: rotate,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }
    
    // Limpieza del efecto
    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
      
      // Mata las animaciones de ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [rotate]);

  // Animación flotante continua para la imagen
  useEffect(() => {
    const floatAnimation = gsap.to(imageRef.current, {
      y: "+=10",
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    return () => {
      floatAnimation.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-[#FFF4DC] text-[#0A0A0A] p-5 rounded-2xl w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-6/12 h-9/12 md:h-10/12 z-50 shadow-2xl flex flex-col items-center justify-start transform transition-all duration-300"
      style={{ 
        transform: `rotate(${rotate}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      <h2 
        ref={titleRef}
        className="text-5xl sm:text-7xl md:text-8xl xl:text-8xl bg-[#db8c32] px-4 py-2 -rotate-6 z-50 border-[#FFF4DC] border-8 w-fit -translate-y-3"
      >
        NACIMIENTO
      </h2>
      <div className='h-full flex items-center w-full gap-5 sm:flex-row flex-col'>
        <div className='w-9/12 sm:w-5/12 h-full flex items-center justify-center'>
          <img 
            ref={imageRef}
            className='w-9/12 sm:w-10/12 lg:w-full' 
            src={dave} 
            alt="Dave character" 
          />
        </div>
        <h1 
          ref={textRef}
          className='w-11/12 sm:w-7/12 text-center sm:text-start text-3xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-5xl mr-2'
        >
          CREADO COMO UNA MARCA QUE INSPIRE A PERSONAS A CREAR Y ATREVERSE
        </h1>
      </div>
    </div>
  );
}