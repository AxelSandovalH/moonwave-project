import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHorizontalScroll(containerRef, contentRef, condition = true) {
  // Mantener referencia a las animaciones activas
  const scrollTriggerRef = useRef(null);
  
  useLayoutEffect(() => {
    // Registrar el plugin (por si no se ha hecho en otro lugar)
    gsap.registerPlugin(ScrollTrigger);
    
    // Limpiar animaciones antiguas primero
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }
    
    // Si no cumple condición (ej: mobile), solo limpiamos
    if (!condition || !containerRef.current || !contentRef.current) {
      return () => {
        const triggers = ScrollTrigger.getAll().filter(
          t => t.vars.trigger === containerRef.current
        );
        triggers.forEach(t => t.kill());
      };
    }

    const container = containerRef.current;
    const content = contentRef.current;
    
    // Calcular el ancho real del contenido para scroll
    const sections = Array.from(content.children);
    const contentWidth = content.scrollWidth;
    const windowWidth = window.innerWidth;
    const distance = contentWidth - windowWidth;
    
    // Crear contexto GSAP para limpiar fácilmente
    const ctx = gsap.context(() => {
      // Timeline principal para scroll horizontal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          invalidateOnRefresh: true, // Recalcula en resize
          onUpdate: () => {
            // Podemos añadir efectos parallax aquí si queremos
            sections.forEach((section) => {
              gsap.set(section, {
                transformOrigin: "center center",
                force3D: true // Mejora rendimiento
              });
            });
          }
        }
      });
      
      // Añadir la animación principal del contenido
      tl.to(content, {
        x: -distance,
        ease: "none", // Importante para scroll suave!
        duration: 1
      });
      
      // Guardar referencia para limpiar
      scrollTriggerRef.current = tl.scrollTrigger;
    }, containerRef);
    
    // Función de limpieza
    return () => {
      ctx.revert(); // Más limpio que kill individual
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [containerRef, contentRef, condition]);
}