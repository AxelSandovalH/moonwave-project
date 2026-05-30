import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dave from '@assets/images/characters/dave.png';

gsap.registerPlugin(ScrollTrigger);

export default function HistoryCard({ rotate }) {
  const cardRef  = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef  = useRef(null);

  useEffect(() => {
    // Aparece rápido con ScrollTrigger — no bloquea antes de que el usuario llegue
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power2.out' },
    });

    tl.fromTo(cardRef.current,  { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 })
      .fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.1')
      .fromTo(imageRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25 }, '-=0.15')
      .fromTo(textRef.current,  { opacity: 0, x: 20  }, { opacity: 1, x: 0, duration: 0.25 }, '-=0.2');

    // Flotación continua del personaje
    gsap.to(imageRef.current, {
      y: '+=8', duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true,
    });

    // Tilt 3D suave en hover
    const card = cardRef.current;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      gsap.to(card, {
        rotateY: ((e.clientX - r.left) / r.width  - 0.5) * 8,
        rotateX: -((e.clientY - r.top)  / r.height - 0.5) * 8,
        duration: 0.4, ease: 'power2.out',
      });
    };
    const onLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, rotate: rotate, duration: 0.4, ease: 'power2.out' });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [rotate]);

  return (
    <div
      ref={cardRef}
      className="bg-[#FFF4DC] text-[#0A0A0A] p-5 rounded-2xl w-10/12 sm:w-9/12 md:w-7/12 lg:w-6/12 z-50 shadow-2xl flex flex-col items-center justify-start"
      style={{ transform: `rotate(${rotate}deg)`, transformStyle: 'preserve-3d' }}
    >
      <h2
        ref={titleRef}
        className="text-4xl sm:text-6xl md:text-7xl bg-[#db8c32] px-4 py-1 -rotate-6 z-50 border-[#FFF4DC] border-6 w-fit -translate-y-2"
      >
        NACIMIENTO
      </h2>

      <div className="flex items-center w-full gap-4 sm:flex-row flex-col mt-2">
        <div className="w-8/12 sm:w-4/12 flex items-center justify-center">
          <img ref={imageRef} className="w-full" src={dave} alt="Dave" />
        </div>
        <h1
          ref={textRef}
          className="w-full sm:w-8/12 text-center sm:text-start text-xl sm:text-2xl md:text-3xl leading-snug"
        >
          CREADO COMO UNA MARCA QUE INSPIRE A PERSONAS A CREAR Y ATREVERSE
        </h1>
      </div>
    </div>
  );
}
