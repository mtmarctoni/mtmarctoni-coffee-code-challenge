import Image from 'next/image';
import React from 'react';

type Props = {
  count?: number; // how many image
  size?: number;
  seed?: number; // deterministic seed to tweak placement
  x0?: number;
  y0?: number;
  className?: string;
};

export const BeansScatter: React.FC<Props> = ({
  count = 10,
  size = 200,
  seed = 100,
  x0 = 0,
  y0 = 0,
  className = '',
}) => {
  const items = Array.from({ length: count }).map((_, i) => {
    const angle = (i * 180) + seed; // angle in degrees
    // convert polar to percent offsets around center
    const rad = (angle * Math.PI) / 180;
    const x = x0 + (i / (count - 1)) * 100; // percent, evenly spaced
    const y = y0 + Math.sin(rad) * 0.7; // percent, sine wave
    const rot = ((i * 37 + seed * 11) % 90) - 45; // rotation between -45 and +44 degrees

    return { x: Math.round(x), y: Math.round(y), rot, size };
  });

  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {items.map((it, idx) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          left: `${it.x}%`,
          top: `${it.y}%`,
          width: it.size,
          height: it.size,
          transform: `rotate(${it.rot}deg)`,
        };

        return (
          <Image
            src="/coffe-beans-unit.webp"
            alt="Coffee Bean"
            className={`select-none pointer-events-none `}
            style={style}
            width={it.size}
            height={it.size}
            key={idx}
          />
        );
      })}
    </div>
  );
};

