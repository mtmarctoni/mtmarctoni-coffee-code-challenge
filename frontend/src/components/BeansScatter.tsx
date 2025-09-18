import React from 'react';

type Props = {
  count?: number; // how many beans
  size?: number; // px - uniform size for all beans
  seed?: number; // deterministic seed to tweak placement
  animate?: boolean;
  className?: string;
};

export const BeansScatter: React.FC<Props> = ({
  count = 30,
  size = 200,
  seed = 100,
  animate = false,
  className = '',
}) => {
  // deterministic placement: use a golden-angle spiral to place items evenly but deterministically
  // bias y toward the bottom of the container so more beans accumulate lower
  const items = Array.from({ length: count }).map((_, i) => {
    const angle = (i * 137.508) + seed; // golden angle in degrees
    const radius = 16 + (i % 6) * 8; // slightly larger rings for fewer, larger beans
    // convert polar to percent offsets around center
    const rad = (angle * Math.PI) / 180;
    const x = 50 + Math.cos(rad) * radius; // percent
    // push y toward bottom: base at 60% plus sin-based offset
    const y = 60 + Math.sin(rad) * radius * 0.6;
    const rot = ((i * 37 + seed * 11) % 90) - 45; // deterministic -45..44
    const opacity = 0.7 + ((i % 3) * 0.08); // slight variation but deterministic

    return { x: Math.round(x), y: Math.round(y), rot, size, opacity };
  });

  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {items.map((it, idx) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          left: `${it.x}%`,
          top: `${it.y}%`,
          width: it.size,
          height: it.size,
          transform: `translate(-50%, -50%) rotate(${it.rot}deg)`,
          opacity: it.opacity,
          transition: 'transform 600ms ease, opacity 600ms ease',
          willChange: 'transform, opacity',
        };

        const animClass = animate ? 'bean-animate' : '';

        return (
          <img
            key={idx}
            src="/coffe-beans-unit.webp"
            alt=""
            className={`select-none pointer-events-none ${animClass}`}
            style={style}
            width={it.size}
            height={it.size}
          />
        );
      })}
    </div>
  );
};

