import React, { useRef } from 'react';
import { gsap } from 'gsap';

export default function Product({ rotation, shirt, backgroundColor }) {
  const cardRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -6, scale: 1.03, duration: 0.25, ease: 'power2.out' });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.25, ease: 'power2.inOut' });
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-11/12 ${rotation} cursor-pointer`}
      style={{ transition: 'box-shadow 0.25s' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Producto */}
      <div className="overflow-hidden rounded-sm" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
        <img
          className="w-full object-cover"
          src={shirt}
          alt="producto moonwave"
        />
      </div>

      {/* Info siempre visible */}
      <div className="flex justify-between items-center mt-2 px-1">
        <div>
          <p className="font-cormorant text-[10px] tracking-[0.2em] uppercase text-[var(--gold)]">
            Moonwave
          </p>
          <p className="font-anton text-sm tracking-wide leading-tight text-[#0A0A0A]">
            New Wave
          </p>
        </div>
        <span className="font-cormorant text-xs font-semibold tracking-widest text-[#0A0A0A]">
          $499
        </span>
      </div>
    </div>
  );
}
