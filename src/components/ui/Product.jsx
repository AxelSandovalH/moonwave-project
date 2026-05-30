import React, { useRef } from 'react';
import { gsap } from 'gsap';

export default function Product({ rotation, shirt, shirtModel, backgroundColor, textColor }) {
  const cardRef    = useRef(null);
  const flatRef    = useRef(null);
  const modelRef   = useRef(null);
  const infoRef    = useRef(null);
  const borderRef  = useRef(null);

  const handleEnter = () => {
    gsap.to(flatRef.current,   { opacity: 0, scale: 1.05, duration: 0.4, ease: 'power2.out' });
    gsap.to(modelRef.current,  { opacity: 1, scale: 1,    duration: 0.4, ease: 'power2.out' });
    gsap.to(infoRef.current,   { y: 0, opacity: 1,        duration: 0.35, ease: 'power2.out', delay: 0.1 });
    gsap.to(borderRef.current, { opacity: 1,              duration: 0.3 });
    gsap.to(cardRef.current,   { y: -8,                   duration: 0.3, ease: 'power2.out' });
  };

  const handleLeave = () => {
    gsap.to(flatRef.current,   { opacity: 1, scale: 1,    duration: 0.4, ease: 'power2.inOut' });
    gsap.to(modelRef.current,  { opacity: 0, scale: 1.02, duration: 0.4, ease: 'power2.inOut' });
    gsap.to(infoRef.current,   { y: 12, opacity: 0,       duration: 0.25, ease: 'power2.in' });
    gsap.to(borderRef.current, { opacity: 0,              duration: 0.3 });
    gsap.to(cardRef.current,   { y: 0,                    duration: 0.3, ease: 'power2.inOut' });
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-11/12 ${rotation} cursor-pointer`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Gold border overlay */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-sm pointer-events-none z-30 opacity-0"
        style={{ boxShadow: '0 0 0 2px var(--gold), 0 8px 32px rgba(201,169,110,0.25)' }}
      />

      {/* Imagen flat (default) */}
      <img
        ref={flatRef}
        className="relative z-10 w-full object-cover"
        src={shirt}
        alt="producto"
      />

      {/* Imagen modelo (hover) */}
      <img
        ref={modelRef}
        className="absolute inset-0 z-20 w-full h-full object-cover opacity-0 scale-[1.02]"
        src={shirtModel}
        alt="modelo"
      />

      {/* Info — desliza desde abajo en hover */}
      <div
        ref={infoRef}
        className={`absolute bottom-0 left-0 right-0 z-30 flex justify-between items-end px-4 py-3 opacity-0 translate-y-3`}
        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)' }}
      >
        <div>
          <p className="font-cormorant text-xs tracking-[0.25em] uppercase text-[var(--gold-light)]">
            Moonwave
          </p>
          <p className="font-anton text-white text-lg leading-tight tracking-wide">
            New Wave
          </p>
        </div>
        <span
          className="font-cormorant font-semibold text-sm px-3 py-1 tracking-widest"
          style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
        >
          $499
        </span>
      </div>
    </div>
  );
}
