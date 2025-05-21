import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateTextReveal(target, options = {}) {
  if (!target) return;

  const defaults = {
    baseColor: "rgba(168, 124, 84, 0.3)", // Color base por defecto
    revealColor: "#A87C54", // Color de revelado por defecto
    duration: 0.8,
    stagger: 0.15,
    ...options
  };

  const split = new SplitType(target, {
    types: "words",
    tagName: "span",
    ...options.splitOptions,
  });

  const ctx = gsap.context(() => {
    gsap.set(target.querySelectorAll(".word"), {
      color: defaults.baseColor,
      willChange: "color"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: target,
        start: "top bottom",
        end: "+=300%",
        scrub: 1.5,
        ...options.scrollTrigger
      }
    });

    tl.to(target.querySelectorAll(".word"), {
      color: defaults.revealColor,
      stagger: {
        each: defaults.stagger,
        from: "random",
        ease: "power2.inOut"
      },
      duration: defaults.duration,
      ease: "circ.out",
      ...options.gsap
    });

    tl.to(target, {
      y: -50,
      ease: "none",
      duration: 2
    }, 0);

  }, target);

  return () => {
    split.revert();
    ctx.revert();
  };
}