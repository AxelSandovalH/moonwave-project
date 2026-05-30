import React, { useRef, useEffect, useState } from 'react';
import heroBg from '@assets/images/products/producto-1-hoodie-negra-espalda.jpg';
import socialImage from '@assets/images/characters/cartel mnw.png';
import '@styles/hero.css';
import { gsap } from 'gsap';

export default function HeroVideo() {
  const socialImageRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (socialImageRef.current) {
      gsap.set(socialImageRef.current, {
        y: 100, opacity: 0, scale: 0.8, display: 'none'
      });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: 10, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    gsap.killTweensOf(iconRef.current);
    gsap.to(iconRef.current, { rotation: 360, duration: 0.6, ease: 'back.out(1.7)' });
    gsap.to(socialImageRef.current, {
      y: 0, opacity: 1, scale: 1.5, duration: 0.5, ease: 'power2.out', display: 'block'
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    gsap.to(iconRef.current, {
      rotation: 0, duration: 0.3,
      onComplete: () => {
        gsap.to(iconRef.current, {
          rotation: 10, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
        });
      }
    });
    gsap.to(socialImageRef.current, {
      y: 100, opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in',
      onComplete: () => gsap.set(socialImageRef.current, { display: 'none' })
    });
  };

  return (
    <section className="relative overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover object-top"
      />

      {/* Luxury scrim */}
      <div className="absolute inset-0 hero-scrim z-10" />

      <section className="relative flex flex-col justify-between h-screen z-40 text-white items-center text-center">

        {/* Brand mark */}
        <div className="mt-8 flex flex-col items-center gap-1">
          <h1 className="text-6xl md:text-8xl lg:text-9xl hero-bomb">
            MOONWAVE
          </h1>
          <p className="font-cormorant italic text-lg md:text-xl tracking-[0.3em]"
             style={{ color: 'var(--gold-light)' }}>
            a lifestyle
          </p>
          <div className="divider-gold mt-2" />
        </div>

        {/* CTA */}
        <div className="relative mb-8">
          <img
            ref={socialImageRef}
            src={socialImage}
            alt="Social Media"
            className="absolute bottom-full left-2/10 transform -translate-x-1/2 mb-2 pointer-events-none"
          />
          <a
            ref={buttonRef}
            href="https://instagram.com/moonwave"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta relative p-3 px-7 rounded-none font-cormorant font-semibold text-lg flex items-center gap-3 tracking-widest uppercase"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={iconRef} className="origin-center">
              <svg className="w-5 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/>
              </svg>
            </div>
            <span>Sigue el viaje</span>
          </a>
        </div>
      </section>
    </section>
  );
}
