import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import coffeeWave from '../../assets/coffee-wave.png'
import mwFalling from '../../assets/images/characters/Haaaaaaa.png'
import mwCloud from '../../assets/images/characters/cloud-white.png'

const generateRandomClouds = (count) => {
    const clouds = [];
    const minHorizontalGap = 8;

    let attempts = 0;
    while (clouds.length < count && attempts < 1000) {
        attempts++;

        const top = 15 + Math.random() * 85;
        const left = Math.random() * 100;
        const scale = 0.7 + Math.random() * 0.6;

        const isFarEnough = clouds.every(cloud => Math.abs(cloud.left - left) >= minHorizontalGap);

        if (isFarEnough) {
            clouds.push({ top, left, scale });
        }
    }

    return clouds;
};

export default function Falling () {
    const clouds = generateRandomClouds(25);
    const cloudRefs = useRef([]);
    const characterRef = useRef(null);
    const sectionRef = useRef(null);

   
    

    return (
        <section
            ref={sectionRef}
            className='relative w-full h-screen bg-[#4EB3F1] overflow-hidden'
        >
            <img className='w-full relative z-50' src={coffeeWave.src} alt="" />

            {clouds.map((cloud, index) => (
                <img
                    key={index}
                    ref={el => cloudRefs.current[index] = el}
                    src={mwCloud.src}
                    alt=""
                    className='absolute'
                    style={{
                        top: `${cloud.top}vh`,
                        left: `${cloud.left}vw`,
                        transform: `scale(${cloud.scale})`,
                        opacity: 0.8,
                    }}
                />
            ))}

            <div
                ref={characterRef}
                className='absolute top-50 left-[50%] translate-x-[-50%] z-10'
            >
                <img src={mwFalling.src} alt="" />
            </div>
        </section>
    );
}
