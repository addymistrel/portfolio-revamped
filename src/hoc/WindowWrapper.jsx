import { useLayoutEffect, useRef } from "react";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, isMaximized, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const prevOpenRef = useRef(false);
    const prevMinimizedRef = useRef(false);
    const prevMaximizedRef = useRef(false);
    const savedPositionRef = useRef({
      top: null,
      left: null,
      width: null,
      height: null,
    });

    // Handle open animation (Mac-like bounce effect)
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      // Opening animation
      if (isOpen && !prevOpenRef.current) {
        el.style.display = "block";
        el.style.transformOrigin = "center bottom";

        gsap.fromTo(
          el,
          {
            scale: 0.3,
            opacity: 0,
            y: 200,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
        );
      }

      prevOpenRef.current = isOpen;
    }, [isOpen]);

    // Handle minimize/restore animation (Mac genie-like effect)
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      if (isMinimized && !prevMinimizedRef.current) {
        // Minimize animation - scale down to dock
        el.style.transformOrigin = "center bottom";
        gsap.to(el, {
          scale: 0.1,
          opacity: 0,
          y: window.innerHeight,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      } else if (!isMinimized && prevMinimizedRef.current) {
        // Restore animation - scale up from dock
        el.style.display = "block";
        el.style.transformOrigin = "center bottom";
        gsap.fromTo(
          el,
          {
            scale: 0.1,
            opacity: 0,
            y: window.innerHeight,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.4)",
          },
        );
      }

      prevMinimizedRef.current = isMinimized;
    }, [isMinimized, isOpen]);

    // Handle maximize state with smooth animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;

      if (isMaximized && !prevMaximizedRef.current) {
        // Save current position before maximizing
        const rect = el.getBoundingClientRect();
        savedPositionRef.current = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };

        // Animate to fullscreen
        gsap.to(el, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          duration: 0.35,
          ease: "power2.inOut",
          onStart: () => {
            el.style.transform = "none";
          },
        });
      } else if (!isMaximized && prevMaximizedRef.current) {
        // Restore to saved position
        const saved = savedPositionRef.current;
        gsap.to(el, {
          top: saved.top || "",
          left: saved.left || "",
          width: saved.width || "",
          height: saved.height || "",
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            // Clear inline styles after animation
            el.style.top = "";
            el.style.left = "";
            el.style.width = "";
            el.style.height = "";
          },
        });
      }

      prevMaximizedRef.current = isMaximized;
    }, [isMaximized, isOpen, isMinimized]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      const header = el.querySelector("#window-header");
      if (!header) return;

      const [instance] = Draggable.create(el, {
        trigger: header,
        dragClickables: false,
        onPress: () => focusWindow(windowKey),
      });

      // Disable dragging when maximized
      if (isMaximized) {
        instance.disable();
      } else {
        instance.enable();
      }

      return () => instance.kill();
    }, [isOpen, isMaximized]);

    if (!isOpen) return null;

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} windowKey={windowKey} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
