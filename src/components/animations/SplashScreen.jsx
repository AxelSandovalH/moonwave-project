import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CSSPlugin);
}

const SplashScreen = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const loadingBarRef = useRef(null);
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tl = gsap.timeline();

    tl.fromTo(containerRef.current,
      { y: '0%' },
      { y: '0%', duration: 0.5, ease: 'power3.out' }
    )
    .fromTo(logoRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out' }
    )
    .to(loadingBarRef.current, {
      width: '100%',
      duration: 1,
      ease: 'power2.inOut',
    })
    .to(containerRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'power2.inOut',
    }, '+=0.5')
    .fromTo(contentRef.current,
      { opacity: 0, y: '50%' },
      { opacity: 1, y: '0%', duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setMounted(false)
    });

  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div
          ref={logoRef}
          className="text-4xl font-bold text-white mb-8 transform scale-100"
        >
          MOONWAVE
        </div>

        <div className="w-64 h-2 bg-black rounded-full overflow-hidden">
          <div
            ref={loadingBarRef}
            className="h-full bg-white w-0"
          />
        </div>
      </div>

      
    </div>
  );
};

export default SplashScreen;