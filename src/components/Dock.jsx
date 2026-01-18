import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { dockApps } from "#constants";
import useWindowStore from "#store/window";

const Dock = () => {
  const { openWindow, minimizeWindow, restoreWindow, windows } =
    useWindowStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: l, width: w } = icon.getBoundingClientRect();
        const center = l - left + w / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 20000); // Gaussian falloff

        gsap.to(icon, {
          scale: 1 + 0.2 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      const mouseX = e.clientX - left;
      animateIcons(mouseX);
    };

    const resetIcons = () =>
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      });

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const handleDockClick = (app) => {
    if (!app.canOpen) return;

    const window = windows[app.id];

    if (!window) {
      console.error(`No window found for app ID: ${app.id}`);
      return;
    }

    if (window.isOpen) {
      if (window.isMinimized) {
        // Restore from minimized state
        restoreWindow(app.id);
      } else {
        // Minimize if already open and visible (toggle behavior like macOS)
        minimizeWindow(app.id);
      }
    } else {
      openWindow(app.id);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const window = windows[id];
          const isActive = window?.isOpen;

          return (
            <div key={id} className="relative flex flex-col items-center">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => handleDockClick({ id, canOpen })}
              >
                <img
                  src={`/images/${icon}`}
                  alt={`${name}-icon`}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
              {/* Active indicator dot */}
              {isActive && <span className="dock-indicator" />}
            </div>
          );
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
