import { useEffect, useState, type CSSProperties } from 'react';
import { trustItems } from '../../content/homepage';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ROTATION_MS = 5000;

function ServiceIcon({ kind }: { kind: typeof trustItems[number]['icon'] }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {kind === 'manufacturing' ? (
        <>
          <path d="M16 3l10 6v12l-10 6-10-6V9z" />
          <path d="M11 12h10v8H11zM16 3v5M6 9l4 3M26 9l-4 3M6 21l4-3M26 21l-4-3M16 27v-5" />
        </>
      ) : kind === 'inspection' ? (
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 2v6M16 24v6M2 16h6M24 16h6M11 16l3 3 7-7" />
        </>
      ) : (
        <>
          <path d="M5 5h22v17H15l-7 6v-6H5zM10 11h12M10 16h7" />
          <path d="M22 15v7M19 18l3-3 3 3" />
        </>
      )}
    </svg>
  );
}

export function ServiceStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const paused = hovered || focused || reducedMotion;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % trustItems.length);
    }, ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [paused, activeIndex]);

  return (
    <div
      className={`service-strip ${paused ? 'is-paused' : ''}`}
      aria-label="Service principles"
      style={{ '--service-duration': `${ROTATION_MS}ms` } as CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="service-strip__inner shell">
        {trustItems.map((item, index) => (
          <a
            className={`service-strip__item ${index === activeIndex ? 'is-active' : ''}`}
            href={item.href}
            key={item.title}
            onFocus={() => setActiveIndex(index)}
          >
            <span className="service-strip__icon">
              <ServiceIcon kind={item.icon} />
              <span className="service-strip__number">{String(index + 1).padStart(2, '0')}</span>
            </span>
            <span className="service-strip__copy">
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </span>
            <svg className="service-strip__arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 19L19 5M7 5h12v12" />
            </svg>
          </a>
        ))}
        <div className="service-strip__selector" aria-label="Select service principle">
          {trustItems.map((item, index) => (
            <button
              type="button"
              key={item.title}
              className={activeIndex === index ? 'is-active' : ''}
              aria-label={`Show ${item.title}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
