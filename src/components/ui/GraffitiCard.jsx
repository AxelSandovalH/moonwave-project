import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export function GraffitiCard({ graffitiImage, rotation = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const fullImageRef = useRef(null);

  // Efecto para la tarjeta expandida
  useEffect(() => {
    if (isExpanded) {
      // Animación para mostrar la overlay y la imagen ampliada
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut"
      });
      
      gsap.fromTo(
        fullImageRef.current,
        { scale: 0.5, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          ease: "back.out(1.7)" 
        }
      );

      // Bloquear el scroll cuando la imagen está expandida
      document.body.style.overflow = "hidden";
    } else if (overlayRef.current) {
      // Limpiar la animación cuando se cierra
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  // Manejador para alternar la expansión
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Manejadores de hover para efectos personalizados
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      borderColor: "#FFF4DC",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      borderColor: "white",
      duration: 0.3,
      ease: "power2.in"
    });
  };

  return (
    <>
      <img
        ref={cardRef}
        src={graffitiImage}
        alt="Graffiti"
        className={`cursor-pointer ${rotation} border-8 border-white rounded-2xl transition-transform duration-300`}
        onClick={toggleExpand}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {isExpanded && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] opacity-0"
          onClick={toggleExpand}
        >
          <img
            ref={fullImageRef}
            src={graffitiImage}
            alt="Fullscreen Graffiti"
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}