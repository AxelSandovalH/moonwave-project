import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TextSplitReveal = ({ text, className, triggerElement }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    let split;
    let ctx = gsap.context(() => {
      split = new SplitText(textRef.current, {
        type: "chars,words",
        charsClass: "char",
        wordsClass: "word"
      });

      gsap.set(split.chars, {
        opacity: 0,
        y: 40
      });

      gsap.to(split.chars, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out",
      });
    }, textRef);

    return () => {
      ctx.revert();
      if (split) split.revert();
    };
  }, [text, triggerElement]);

  return (
    <div ref={textRef} className={className}>
      {text}
    </div>
  );
};

export default TextSplitReveal;
