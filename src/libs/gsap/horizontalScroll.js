import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupHorizontalScroll(containerRef, contentRef) {
  if (!containerRef.current || !contentRef.current) return () => {};

  const sections = gsap.utils.toArray(contentRef.current.children);

  const ctx = gsap.context(() => {
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () =>
          `+=${containerRef.current.offsetWidth * (sections.length - 1)}`,
      },
    });
  }, containerRef);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
