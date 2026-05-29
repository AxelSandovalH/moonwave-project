import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import wall from '@assets/images/characters/wall.png';
import wallMobile from '@assets/images/characters/wall-mobile.png';
import cartel from '@assets/images/characters/cartel.png';
import mnwBomba from '@assets/images/characters/bomba-1.png';
import mnwBomba2 from '@assets/images/characters/MnW-bomba.png';
import mnwNube from '@assets/images/characters/Nubes-MNW.png';

// Registramos el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const bombaIzqRef = useRef(null);
    const bombaDerechaRef = useRef(null);
    const nubeRef = useRef(null);
    const cartelInfoRef = useRef(null);
    const cartelRedesRef = useRef(null);
    const textoInfoRef = useRef(null);
    const textoRedesRef = useRef(null);

    // Efecto para la animación inicial del footer
    useEffect(() => {
        // Aseguramos que todos los elementos estén montados
        if (!footerRef.current) return;

        // Configuración de la animación principal - footer entrando desde abajo
        gsap.fromTo(
            footerRef.current,
            { 
                y: 200, 
                opacity: 1 
            },
            { 
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animación para las bombas y la nube con retraso escalonado
        const elementsToAnimate = [
            { ref: bombaIzqRef.current, delay: 0.2, x: -50 },
            { ref: bombaDerechaRef.current, delay: 0.4, x: 50 },
            { ref: nubeRef.current, delay: 0.3, y: 40 },
            { ref: cartelInfoRef.current, delay: 0.5, scale: 0.8 },
            { ref: cartelRedesRef.current, delay: 0.6, scale: 0.8 }
        ];

        elementsToAnimate.forEach(({ref, delay, x = 0, y = 0, scale = 1}) => {
            if (!ref) return;
            
            gsap.fromTo(
                ref,
                { 
                    opacity: 0,
                    x: x,
                    y: y,
                    scale: scale
                },
                { 
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    delay: delay,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom-=50",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animación para textos con revelación letra por letra
        const textos = [textoInfoRef.current, textoRedesRef.current];
        textos.forEach((texto, index) => {
            if (!texto) return;
            
            gsap.from(
                texto.querySelectorAll('h2, li, p, a'),
                {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.6,
                    delay: 0.8 + (index * 0.2),
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom-=50",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Limpiamos las animaciones al desmontar
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Funciones para animaciones de hover
    const handleHoverStart = (element) => {
        gsap.to(element, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out"
        });
    };

    const handleHoverEnd = (element) => {
        gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out"
        });
    };

    return (
        <section ref={footerRef} className="relative w-full md:h-[500px] overflow-hidden">
            <div className="absolute inset-0 z-0 flex">
                <img src={wall} alt="" className="w-full object-cover md:block hidden" />
                <img src={wall} alt="" className="w-full object-cover md:block hidden" />
                <img src={wallMobile} alt="" className="w-full object-cover md:hidden block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 md:grid-rows-2 md:gap-4 place-items-center relative max-w-[2500px] md:h-[500px] z-50 mx-auto">
                <div 
                    ref={bombaIzqRef}
                    className="cursor-pointer"
                    onMouseEnter={(e) => handleHoverStart(e.currentTarget)}
                    onMouseLeave={(e) => handleHoverEnd(e.currentTarget)}
                >
                    <img src={mnwBomba} alt="bomba izquierda" className="w-11/12 translate-y-10 h-auto" />
                </div>

                <div className="row-span-2 md:row-span-2">
                    <div 
                        ref={cartelInfoRef}
                        className="relative w-[400px] md:w-[300px] lg:w-[400px] h-auto lg:translate-x-10"
                    >
                        <img 
                            src={cartel} 
                            alt="cartel" 
                            className="w-full h-auto" 
                        />
                        <div 
                            ref={textoInfoRef}
                            className="absolute inset-0 flex flex-col px-4 text-center text-black font-bold text-sm leading-snug translate-y-15 gap-5"
                        >
                            <h2 className="text-2xl font-extrabold mb-2">SERVICIOS MOONWAVE</h2>
                            <ul className="space-y-1 text-lg">
                                <li>• SERIGRAFIA PERSONALIZADA</li>
                                <li>• DISEÑO GRAFICO Y ARTE PARA PRENDAS</li>
                                <li>• PRODUCCION POR DROPS</li>
                                <li>• ASESORIA CREATIVA PARA MARCAS</li>
                            </ul>
                            <div className="mt-3 text-lg">
                                <p>📧 contacto@moonwave.com</p>
                                <p>📞 +52 XXX XXX XXX</p>
                                <p>📍 Av. de las Rosas 29192</p>
                            </div>
                            <div className="mt-3 text-lg w-10/12 flex items-center justify-center mx-auto translate-y-5">
                                <p>© 2025 MOONWAVE. ARTE CON IDENTIDAD. TODOS LOS DERECHOS RESERVADOS.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-start-1 md:row-start-2">
                    <div 
                        ref={nubeRef}
                        className="cursor-pointer"
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                y: -10,
                                duration: 0.7,
                                ease: "power1.inOut"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                y: 0,
                                duration: 0.7,
                                ease: "power1.inOut"
                            });
                        }}
                    >
                        <img src={mnwNube} alt="logo blanco" className="w-full -translate-5 h-auto" />
                    </div>
                </div>

                <div className="md:col-start-3 md:row-start-1">
                    <div 
                        ref={bombaDerechaRef}
                        className="cursor-pointer"
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                rotation: 10,
                                duration: 0.5,
                                ease: "elastic.out(1, 0.3)"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                rotation: 0,
                                duration: 0.5,
                                ease: "elastic.out(1, 0.3)"
                            });
                        }}
                    >
                        <img src={mnwBomba2} alt="bomba derecha" className="h-auto" />
                    </div>
                </div>

                <div className="md:col-start-3 md:row-start-2 translate-y-40 sm:translate-y-30">
                    <div 
                        ref={cartelRedesRef}
                        className="relative w-[400px] md:w-[280px] lg:w-[350px] xl:w-[400px] h-auto lg:translate-x-2"
                    >
                        <img src={cartel} alt="cartel" className="w-full h-auto" />
                        <div 
                            ref={textoRedesRef}
                            className="absolute inset-0 flex flex-col px-4 text-center text-black font-bold text-sm leading-snug translate-y-15 gap-5 items-center"
                        >
                            <h2 className="text-2xl font-extrabold mb-2 w-10/12">SIGUENOS EN NUESTRAS REDES SOCIALES</h2>
                            <div className='flex flex-col sm:flex-row gap-3 items-center justify-center w-10/12'>
                                {/* Animación hover para iconos de redes sociales */}
                                <a 
                                    className='flex gap-3 items-center justify-center' 
                                    href=""
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget.querySelector('svg'), {
                                            scale: 1.2,
                                            rotate: 5,
                                            duration: 0.3,
                                            ease: "back.out(1.7)"
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget.querySelector('svg'), {
                                            scale: 1,
                                            rotate: 0,
                                            duration: 0.3,
                                            ease: "back.out(1.7)"
                                        });
                                    }}
                                >
                                    <svg className='w-12 h-auto' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M13.95 4.24C11.86 1 7.58.04 4.27 2.05C1.04 4.06 0 8.44 2.09 11.67l.17.26l-.7 2.62l2.62-.7l.26.17c1.13.61 2.36.96 3.58.96c1.31 0 2.62-.35 3.75-1.05c3.23-2.1 4.19-6.39 2.18-9.71Zm-1.83 6.74c-.35.52-.79.87-1.4.96c-.35 0-.79.17-2.53-.52c-1.48-.7-2.71-1.84-3.58-3.15c-.52-.61-.79-1.4-.87-2.19c0-.7.26-1.31.7-1.75c.17-.17.35-.26.52-.26h.44c.17 0 .35 0 .44.35c.17.44.61 1.49.61 1.58c.09.09.05.76-.35 1.14c-.22.25-.26.26-.17.44c.35.52.79 1.05 1.22 1.49c.52.44 1.05.79 1.66 1.05c.17.09.35.09.44-.09c.09-.17.52-.61.7-.79c.17-.17.26-.17.44-.09l1.4.7c.17.09.35.17.44.26c.09.26.09.61-.09.87Z"/></svg>
                                    <span className='text-2xl sm:hidden'>WHATSAPP</span>
                                </a>
                                <a 
                                    className='flex gap-3 items-center justify-center' 
                                    href=""
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget.querySelector('svg'), {
                                            scale: 1.2,
                                            rotate: 5,
                                            duration: 0.3,
                                            ease: "back.out(1.7)"
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget.querySelector('svg'), {
                                            scale: 1,
                                            rotate: 0,
                                            duration: 0.3,
                                            ease: "back.out(1.7)"
                                        });
                                    }}
                                >
                                    <svg className='w-12 h-auto' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
                                    <span className='text-2xl sm:hidden'>INSTAGRAM</span>
                                </a>
                                <a 
                                    className='flex gap-3 items-center justify-center' 
                                    href=""
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget.querySelector('svg'), {
                                            scale: 1.2,
                                            rotate: 5,
                                            duration: 0.3,
                                            ease: "back.out(1.7)"
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget.querySelector('svg'), {
                                            scale: 1,
                                            rotate: 0,
                                            duration: 0.3,
                                            ease: "back.out(1.7)"
                                        });
                                    }}
                                >
                                    <svg className='w-12 h-auto' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"/></svg>
                                    <span className='text-2xl sm:hidden'>FACEBOOK</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}