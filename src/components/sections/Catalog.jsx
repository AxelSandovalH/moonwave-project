// OPCIÓN 1: ANIMACIÓN DE REVELADO POR LETRA
// Para implementar esta opción, necesitas dividir el texto en letras individuales

import React, { useRef, useEffect } from "react";
import { useTextReveal } from "@hooks/useTextReveal";
import Product from '@components/ui/Product.jsx';
import HistorySection from '@assets/history-section.png';

import p1Flat from '@assets/images/products/producto-1-hoodie-negra-frente.jpg';
import p2Flat from '@assets/images/products/producto-2-hoodie-crema-frente.jpg';
import p3Flat from '@assets/images/products/producto-3-tee-flor-frente.jpg';
import p4Flat from '@assets/images/products/producto-4-tee-surfer-frente-1.jpg';
import p5Flat from '@assets/images/products/producto-5-nacimos-bendecidos-flat.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // Necesitarás importar SplitText para esta opción

// Registrar plugins con GSAP
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Catalog() {
  const textRef = useRef(null);
  const productRefs = useRef([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Configurar array de refs para los productos
  productRefs.current = Array(5).fill().map((_, i) => productRefs.current[i] || React.createRef());

  useTextReveal(textRef, {
    baseColor: "rgba(0, 0, 0, 0.5)", // Color inicial personalizado
    revealColor: "#000000", // Color final personalizado
    duration: 1.2,
    stagger: 0.2,
    scrollTrigger: {
      start: "top 50%",
      end: "bottom 10%"
    }
  });

  useEffect(() => {
    // Animación de fade-in para la sección completa
    gsap.fromTo(
      sectionRef.current,
      { opacity: 1 },
      { 
        opacity: 1, 
        duration: 1.2, 
        ease: "power2.out" 
      }
    );

    // Animación para los productos con stagger
    gsap.fromTo(
      productRefs.current.map(ref => ref.current),
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
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      }
    );

    // NUEVA ANIMACIÓN PARA LAS LETRAS - OPCIÓN 1: REVELADO POR LETRA
    // Dividimos el texto en letras
    if (titleRef.current && subtitleRef.current) {
      // Split text en letras individuales
      const titleSplit = new SplitText(titleRef.current, { type: "chars" });
      const subtitleSplit = new SplitText(subtitleRef.current, { type: "chars" });
      
      // Animación para las letras del título 'ESENCIALES'
      gsap.fromTo(
        titleSplit.chars,
        { 
          opacity: 0,
          y: 50,
          rotationX: -90
        },
        { 
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animación para las letras del subtítulo 'MOONWAVE'
      gsap.fromTo(
        subtitleSplit.chars,
        { 
          opacity: 0,
          y: 50,
          rotationX: -90
        },
        { 
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Hover animations for products
    productRefs.current.forEach(ref => {
      // Skip if ref.current is not available
      if (!ref.current) return;
      
      // Create a hover effect
      ref.current.addEventListener('mouseenter', () => {
        gsap.to(ref.current, {
          y: -15,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      ref.current.addEventListener('mouseleave', () => {
        gsap.to(ref.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });

    return () => {
      // Cleanup event listeners
      productRefs.current.forEach(ref => {
        if (ref.current) {
          ref.current.removeEventListener('mouseenter', () => {});
          ref.current.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#fef1dc] text-[#0A0A0A] pb-12">
      <img
        src={HistorySection}
        className="w-full h-full relative -top-12 m-0 hidden sm:block"
        alt=""
      />
      <div className="max-w-[2000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 place-items-center px-4 2xl:translate-x-12">
        {/* Producto 1 — Hoodie Negra */}
        <div ref={productRefs.current[0]} className="translate-y-12 sm:translate-y-0 w-full">
          <Product rotation="-rotate-6" shirt={p1Flat} />
        </div>
        {/* Producto 2 — Hoodie Crema */}
        <div ref={productRefs.current[1]} className="translate-y-12 translate-x-8 w-full">
          <Product rotation="rotate-0" shirt={p2Flat} />
        </div>
        {/* Producto 3 — Tee Flor */}
        <div ref={productRefs.current[2]} className="w-full">
          <Product rotation="rotate-6" shirt={p3Flat} />
        </div>
        {/* Producto 4 — Tee Surfer */}
        <div ref={productRefs.current[3]} className="w-full">
          <Product rotation="-rotate-3" shirt={p4Flat} />
        </div>
        {/* Título ESENCIALES */}
        <div className="order-first sm:order-none text-center lg:col-auto lg:row-auto sm:col-span-2 sm:col-start-1 sm:row-start-4 lg:translate-x-10 2xl:translate-x-0 w-full" ref={textRef}>
          <h2 ref={titleRef} className="text-6xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl relative top-3 sm:top-2 scroll-animation">
            ESENCIALES
          </h2>
          <h2 ref={subtitleRef} className="text-6xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl bg-amber-500 px-4 -rotate-4 border-[#FFF4DC] border-8 inline-block mt-2 scroll-animation">
            MOONWAVE
          </h2>
        </div>
        {/* Producto 5 — Nacimos Bendecidos */}
        <div ref={productRefs.current[4]} className="lg:col-auto lg:row-auto lg:w-full lg:translate-x-20 sm:col-span-2 sm:col-start-1 sm:row-start-3">
          <Product rotation="rotate-3" shirt={p5Flat} />
        </div>
      </div>
    </section>
  );
}