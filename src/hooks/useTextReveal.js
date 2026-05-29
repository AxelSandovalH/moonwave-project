import { useEffect } from "react";
import { animateTextReveal } from "@lib/gsap/textReveal";

export function useTextReveal(ref, options) {
  useEffect(() => {
    if (!ref.current) return;
    const cleanup = animateTextReveal(ref.current, options);
    return cleanup;
  }, [ref, options]);
}