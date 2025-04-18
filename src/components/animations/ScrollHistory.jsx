import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HistoryCard from "../ui/HistoryCard";
import HistorySection from "../../assets/history-section.png";

export default function ScrollHistory() {
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);
    
    useLayoutEffect(() => {
        import('gsap').then(({ gsap }) => {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);
    const sections = gsap.utils.toArray(horizontalRef.current.children);
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,                     
        scrub: 1,                      
        snap: 1 / (sections.length - 1), 
        end: () => `+=${containerRef.current.offsetWidth * (sections.length - 1)}`, 
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
})
    })
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative bg-[#F6EBD3] font-anton anton-regular h-screen z-50">
        <div ref={horizontalRef} className="flex items-center relative z-50">
          <div className="min-w-5/12 h-[80vh] flex items-center justify-end">
            <div className="flex flex-col text-9xl mt-20 mr-20">
              <h2>DE LA</h2>
              <h2 className="bg-[#4EB3F1] w-7/12 text-center -rotate-8 border-[#FFF4DC] border-8">LUNA</h2>
              <h2>AL LIENZO</h2>
            </div>
          </div>
          <div className="min-w-full h-[80vh] flex items-center justify-center gap-20">
            <HistoryCard />
          </div>
          <div className="min-w-full h-[80vh] flex items-center justify-center gap-20">
            <HistoryCard />
          </div>
        </div>
        
  {/* <img src={HistorySection.src} class="w-full h-full relative -top-12 m-0" alt="" /> */}
      </div>
      
      
    </>
  );
}
