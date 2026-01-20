import { useLayoutEffect, useRef } from "react";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { X } from "lucide-react";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, closeWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, isMaximized, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const prevOpenRef = useRef(false);
    const prevMinimizedRef = useRef(false);
    const prevMaximizedRef = useRef(false);
    const savedPositionRef = useRef({
      transform: null,
      top: null,
      left: null,
      width: null,
      height: null,
    });

    // Handle open animation (Mac-like bounce effect)
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      // Only animate on first open (not on subsequent re-renders)
      if (!prevOpenRef.current) {
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
        const computedStyle = window.getComputedStyle(el);

        savedPositionRef.current = {
          transform: el.style.transform || "",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          cssTop: computedStyle.top,
          cssLeft: computedStyle.left,
          cssWidth: computedStyle.width,
          cssHeight: computedStyle.height,
        };

        // Set initial position explicitly before animating
        gsap.set(el, {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          transform: "none",
        });

        // Animate to fullscreen
        gsap.to(el, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          duration: 0.35,
          ease: "power2.inOut",
        });
      } else if (!isMaximized && prevMaximizedRef.current) {
        // Restore to saved position
        const saved = savedPositionRef.current;

        gsap.to(el, {
          top: saved.top,
          left: saved.left,
          width: saved.width,
          height: saved.height,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            // Clear inline styles and restore CSS positioning
            gsap.set(el, { clearProps: "top,left,width,height" });
            // Restore the transform from dragging if any
            if (saved.transform) {
              el.style.transform = saved.transform;
            }
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
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute window-container"
      >
        <div className="window-content">
          <Component {...props} windowKey={windowKey} />
        </div>
        <div className="window-footer">
          <button
            onClick={() => closeWindow(windowKey)}
            className="bottom-close-btn"
            title="Close"
          >
            <X size={16} strokeWidth={2.5} />
            <span>Close</span>
          </button>
        </div>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
