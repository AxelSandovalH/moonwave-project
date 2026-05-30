import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mwFaceBlue from '@assets/images/characters/mw-face-blue.png';
import dave from '@assets/images/characters/dave.png';
import mnwDistorcion from '@assets/images/characters/mnw-distorcion.png';
import rocketImage from '@assets/images/characters/cohete mnw.png';
import '@styles/Announcement.css';

// Registramos los plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Announcement() {
  // Referencias para elementos que animaremos
  const sectionRef = useRef(null);
  const textElementsRef = useRef([]);
  const imageElementsRef = useRef([]);
  const dateCountdownRef = useRef(null);
  const rocketRef = useRef(null);
  
  // Estado para controlar la visualización de fecha o cuenta regresiva
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownText, setCountdownText] = useState("");
  
  // Definimos la fecha objetivo para la cuenta regresiva (5/3/2025)
  const targetDate = new Date(2025, 5, 5); // Mes indexado desde 0 (0=enero, 2=marzo)
  
  useEffect(() => {
    // Función para calcular la cuenta regresiva
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      // Si la fecha ya pasó
      if (difference < 0) {
        setCountdownText("¡Ya estamos aquí!");
        return;
      }
      
      // Calculamos días, horas, minutos y segundos
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdownText(`${days}D ${hours}H ${minutes}M`);
    };
    
    // Actualizar la cuenta regresiva cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Alternar entre fecha y cuenta regresiva cada 4 segundos
    const toggleInterval = setInterval(() => {
      setShowCountdown(prev => !prev);
      
      // Animación de transición entre fecha y cuenta regresiva
      if (dateCountdownRef.current) {
        gsap.fromTo(
          dateCountdownRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    }, 4000);
    
    // Gestión del ticker responsivo
    const handleResize = () => {
      const texto = document.getElementById('textoPrincipal');
      if (!texto) return;
      
      if (window.innerWidth <= 768) {
        texto.classList.add('ticker');
      } else {
        texto.classList.remove('ticker');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Configuración de animaciones GSAP
    const initAnimations = () => {
      // Animación para títulos con efecto de aparición al hacer scroll
      textElementsRef.current.forEach((el, index) => {
        gsap.fromTo(el, 
          { 
            opacity: 0,
            y: 50 
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=100",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1 // Escalonamiento sutil
          }
        );
      });
      
      // Animación para imágenes con efecto de aparición rotando
      imageElementsRef.current.forEach((el, index) => {
        gsap.fromTo(el, 
          { 
            opacity: 0,
            scale: 0.8,
            rotation: -10
          },
          { 
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=100",
              toggleActions: "play none none reverse"
            },
            delay: 0.1 + (index * 0.15) // Escalonamiento sutil
          }
        );
        
        // Animación hover para las imágenes
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { 
            scale: 1.1, 
            rotation: 5, 
            duration: 0.3, 
            ease: "power1.out" 
          });
        });
        
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { 
            scale: 1, 
            rotation: 0, 
            duration: 0.3, 
            ease: "power1.in" 
          });
        });
      });
      
      // Animación para el contenedor principal
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "rgba(246, 235, 211, 1)" },
        {
          backgroundColor: "rgba(246, 235, 211, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );

      // Animación del cohete de izquierda a derecha
      if (rocketRef.current) {
        // Primero ocultamos el cohete fuera de la pantalla a la izquierda
        gsap.set(rocketRef.current, {
          x: '-120%', // Empezamos completamente fuera de la pantalla
          y: '20%',   // Posición vertical centrada con un poco de margen superior
          rotation: 0
        });

        // Creamos la animación del cohete
        gsap.to(rocketRef.current, {
          x: '2020%',  // Termina completamente fuera de la pantalla a la derecha
          duration: 15,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",    // Cuando la parte superior de la sección llega al centro de la pantalla
            toggleActions: "play none none none" // play, reverse, restart, reset, complete, none
          },
          onStart: () => {
            // Aseguramos que el cohete sea visible cuando empieza la animación
            gsap.set(rocketRef.current, { autoAlpha: 1 });
          }
        });

        // Pequeña animación de movimiento vertical para dar efecto de vuelo
        gsap.to(rocketRef.current, {
          y: '22%', // Pequeño movimiento vertical
          rotation: 5, // Ligera rotación para efecto de vuelo
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };
    
    // Inicializamos las animaciones después de que los componentes estén renderizados
    const timeoutId = setTimeout(initAnimations, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      clearInterval(countdownInterval);
      clearInterval(toggleInterval);
      
      // Limpiamos las instancias de ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Función para agregar elementos al array de referencias
  const addTextElementRef = (el) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el);
    }
  };
  
  const addImageElementRef = (el) => {
    if (el && !imageElementsRef.current.includes(el)) {
      imageElementsRef.current.push(el);
    }
  };

  const renderTicker = () => (
    <div className="ticker-container bg-black py-3 overflow-hidden relative">
      <div className="ticker text-white text-4xl items-center">
        <div className="ticker-track flex items-center gap-15">
          <img className="w-14 ml-8 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">EVOLUCIÓN</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">ARTESANAL</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">ONÍRICO</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">EVOLUCIÓN</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">ARTESANAL</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">ONÍRICO</h2>
        </div>
        <div className="ticker-track flex items-center gap-15">
          <img className="w-14 ml-8 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">EVOLUCIÓN</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">ARTESANAL</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">ONÍRICO</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">EVOLUCIÓN</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">ARTESANAL</h2>
          <img className="w-14 hover-pulse" src={mwFaceBlue} alt="" />
          <h2 className="ticker-text">ONÍRICO</h2>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-[#F6EBD3] text-[#0A0A0A] overflow-hidden relative">
      {/* Contenedor del cohete con posición absoluta para superponerlo */}
      <div className="rocket-container absolute w-full h-full pointer-events-none z-50">
        <img 
          ref={rocketRef}
          src={rocketImage} 
          alt="Cohete" 
          className="w-10/12 sm:w-7/12 md:w-6/12 lg:w-4/12 opacity-0 z-50" // Inicialmente invisible
        />
      </div>

      {renderTicker()}

      <div id="textoPrincipalWrapper" className="overflow-hidden py-8">
        <div
          id="textoPrincipal"
          className="flex md:flex-wrap gap-10 text-8xl sm:text-8xl lg:text-9xl xl:text-9xl mt-5 items-center justify-center text-center mx-5"
        >
          <h1 ref={addTextElementRef} className="text-reveal">UNA</h1>
          <img ref={addImageElementRef} className="w-[150px] image-hover" src={dave} alt="" />
          <h1 ref={addTextElementRef} className="text-reveal">NUEVA</h1>
          <img ref={addImageElementRef} className="w-[150px] image-hover" src={dave} alt="" />
          <h1 ref={addTextElementRef} className="text-reveal">HISTORIA</h1>
          <img ref={addImageElementRef} className="w-[150px] image-hover" src={mnwDistorcion} alt="" />
          <h1 ref={addTextElementRef} className="text-reveal">ESTÁ</h1>
          <h1 ref={addTextElementRef} className="text-reveal">POR</h1>
          <img ref={addImageElementRef} className="w-[150px] image-hover" src={dave} alt="" />
          <h1 ref={addTextElementRef} className="text-reveal">COMENZAR</h1>
          <img ref={addImageElementRef} className="w-[150px] image-hover" src={dave} alt="" />
          
          {/* Elemento que alterna entre fecha y cuenta regresiva */}
          <h1 
            ref={(el) => {
              addTextElementRef(el);
              dateCountdownRef.current = el;
            }} 
            className="text-reveal countdown-element"
          >
            {showCountdown ? countdownText : "5/3/2025"}
          </h1>
          
        </div>
      </div>

      {renderTicker()}
    </section>
  );
}