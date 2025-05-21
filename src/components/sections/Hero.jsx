import React, { useRef, useEffect, useState } from 'react';
import video from '@assets/video.mp4';
import socialImage from '@assets/images/characters/cartel mnw.png';
import '@styles/hero.css';
import { gsap } from 'gsap';

export default function HeroVideo() {
  const socialImageRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Configuración inicial
  useEffect(() => {
    if (socialImageRef.current) {
      gsap.set(socialImageRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        display: 'none'
      });
    }
    
    // Pequeña animación constante del ícono
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    
    // Cancelar la animación actual del ícono
    gsap.killTweensOf(iconRef.current);
    
    // Girar el ícono 360 grados
    gsap.to(iconRef.current, {
      rotation: 360,
      duration: 0.6,
      ease: "back.out(1.7)"
    });
    
    // Animar el botón - cambio de color a rosa Instagram
    gsap.to(buttonRef.current, {
      backgroundColor: "#E1306C", // Color de Instagram
      duration: 0.3
    });
    
    // Mostrar la imagen
    gsap.to(socialImageRef.current, {
      y: 0,
      opacity: 1,
      scale: 1.5,
      duration: 0.5,
      ease: "power2.out",
      display: 'block'
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    
    // Restaurar el ícono
    gsap.to(iconRef.current, {
      rotation: 0,
      duration: 0.3,
      onComplete: () => {
        // Reiniciar la animación suave
        gsap.to(iconRef.current, {
          rotation: 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
    
    // Restaurar el botón
    gsap.to(buttonRef.current, {
      backgroundColor: "black",
      duration: 0.3
    });
    
    // Ocultar la imagen
    gsap.to(socialImageRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(socialImageRef.current, { display: 'none' });
      }
    });
  };

  return (
    <section className="relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src={video} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
      <section className="relative flex flex-col justify-between h-screen z-40 text-white items-center text-center">
        <div className="mt-5">
          <h1 className="text-3xl font-bold font-anton">MOONWAVE</h1>
          <h2 className="text-2xl font-bold">"A lifestyle"</h2>
        </div>
        
        <div className="relative mb-5">
          <img
            ref={socialImageRef}
            src={socialImage}
            alt="Social Media"
            className="absolute bottom-full left-2/12 transform -translate-x-1/2 mb-2 pointer-events-none"
          />
          <a
            ref={buttonRef}
            href="https://instagram.com/moonwave"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-black p-3 px-6 rounded-xl font-bold text-xl flex items-center gap-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={iconRef} className="origin-center">
              <svg className='w-7 h-auto' xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="#ffffff" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
            </div>
            <span>Sigue el viaje</span>
          </a>
        </div>
      </section>
    </section>
  );
}