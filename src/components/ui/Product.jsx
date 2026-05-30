import React, { useEffect } from 'react'
import { gsap } from 'gsap';

export default function Product ({ rotation, modelRotation, textRotation, priceRotation, shirt, shirtModel, backgroundColor, textColor}) {
  // Agrega este efecto
useEffect(() => {
  const img = gsap.to(`.${rotation.replace(' ', '')} img`, {
    y: 15,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
  return () => img.kill();
}, [rotation]);

  return (
      <div className={`relative group w-11/12 ${rotation}`}>
        <div className={`fondo ${backgroundColor} w-8/12 h-8/12 rounded-full absolute top-8 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

        <img
          className='relative z-50 scroll-animation'
          src={shirt}
          alt=""
        />

        <img
          className={`imagen-modelo z-50 absolute top-2 left-38 w-4/9 ${modelRotation} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          src={shirtModel}
          alt=""
        />

        <div className={`text-center w-6/12 relative -top-4 left-25 ${textRotation} flex flex-col items-center scroll-animation`}>
          <h1 className='text-2xl'>MOONWAVE SHIRT</h1>
          <h1 className={`text-2xl ${backgroundColor} w-fit px-3 relative ${priceRotation} border-4 border-[#f1e6d4] -top-1 ${textColor}`}>$499</h1>
        </div>
      </div>
  )
}
