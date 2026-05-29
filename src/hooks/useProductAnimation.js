// Crea un nuevo hook useProductAnimation.js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useProductAnimation = (ref) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.from(element, {
      duration: 1,
      opacity: 0,
      y: 100,
      rotate: -15,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, [ref]);
};