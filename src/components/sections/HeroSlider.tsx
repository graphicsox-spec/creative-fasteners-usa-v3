import { useEffect, useRef, useState } from 'react';
import { heroSlides } from '../../content/homepage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ServiceStrip } from './ServiceStrip';
import { ClientArtworkSlide } from './ClientArtworkSlide';

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const hasMultipleSlides = heroSlides.length > 1;
  const isClientSlide = Boolean(heroSlides[activeIndex]?.clientArtwork);

  const moveSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    if (!hasMultipleSlides || reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [activeIndex, reducedMotion, hasMultipleSlides]);

  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      heroSlides.slice(1).forEach((slide) => {
        const image = new Image();
        image.src = window.matchMedia('(max-width: 767px)').matches
          ? slide.clientArtwork?.mobileImage ?? slide.image
          : slide.image;
      });
    }, 500);

    return () => window.clearTimeout(preloadTimer);
  }, []);

  return (
    <div className="hero-slider">
    <section
      id="home"
      className={`hero hero--industry ${isClientSlide ? 'hero--client-reference' : ''}`}
      aria-roledescription="carousel"
      aria-label="Creative Fasteners industry overview"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') moveSlide(-1);
        if (event.key === 'ArrowRight') moveSlide(1);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(distance) < 48) return;
        moveSlide(distance > 0 ? -1 : 1);
      }}
    >
      {isClientSlide ? <ClientArtworkSlide activeIndex={activeIndex} onSelect={setActiveIndex} /> : <>
      <div className="hero__media">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              className={`hero__slide-media ${isActive ? 'is-active' : ''}`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={isActive ? slide.imageAlt : ''}
                width="1672"
                height="941"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                style={{ objectPosition: slide.objectPosition }}
              />
            </div>
          );
        })}
      </div>
      <div className="hero__overlay" />

      <div className="hero__content shell">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              className={`hero__copy hero__copy--${slide.id} ${isActive ? 'is-active' : ''}`}
              aria-hidden={!isActive}
              aria-live={isActive && reducedMotion ? 'polite' : 'off'}
            >
              <p className="hero__eyebrow">
                <span />
                {slide.eyebrow}
              </p>
              <h1>{slide.headline}</h1>
              <p className="hero__description">{slide.description}</p>
              <div className="hero__actions">
                <a className="button button--primary" href="#rfq">
                  {slide.cta}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hero__controls shell">
        {hasMultipleSlides ? (
            <nav className="hero__navigation" aria-label="Industry slideshow controls">
              <button type="button" onClick={() => moveSlide(-1)} aria-label="Show previous industry">
                <ArrowIcon direction="left" />
              </button>
              <span className="hero__fraction" aria-label={`Slide ${activeIndex + 1} of ${heroSlides.length}`}>
                {activeIndex + 1}/{heroSlides.length}
              </span>
              <button type="button" onClick={() => moveSlide(1)} aria-label="Show next industry">
                <ArrowIcon direction="right" />
              </button>
            </nav>
        ) : null}
      </div>
      </>}
      <ServiceStrip />
    </section>
    </div>
  );
}
