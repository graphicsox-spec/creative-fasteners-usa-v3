import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;
const checkMark = asset('brand/check-mark.svg');

type Slide = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  desktopImage: string;
  mobileImage?: string;
  mobileCtaTop?: string;
};

const slides: Slide[] = [
  {
    id: 'cold-heading',
    title: 'Cold Heading',
    description: 'Progressive cold forming processes that shape solid metal into strong, dimensionally consistent precision fasteners.',
    highlights: ['High Volume', 'Tight Tolerances', 'Stronger Components', 'Cost Effective'],
    desktopImage: asset('images/capability-banners/cold-heading-desktop.jpg'),
    mobileImage: asset('images/capability-banners/cold-heading-mobile.jpg'),
    mobileCtaTop: '89.15%',
  },
  {
    id: 'thread-rolling',
    title: 'Thread Rolling',
    description: 'Controlled rolling and threading processes that produce accurate thread profiles, consistent pitch, and improved material strength.',
    highlights: ['Accurate Thread Profiles', 'Consistent Pitch', 'Higher Strength', 'Wide Size Range'],
    desktopImage: asset('images/capability-banners/thread-rolling-desktop.jpg'),
    mobileImage: asset('images/capability-banners/thread-rolling-mobile.jpg'),
    mobileCtaTop: '89.15%',
  },
  {
    id: 'secondary-operations',
    title: 'Secondary Operations',
    description: 'We offer a wide range of secondary operations including heat treating, plating, patching, black oxide, and passivation, providing additional processing to meet specific application and performance requirements. Integrated into our manufacturing process, these services help ensure our fasteners meet customer drawings, specifications, and quality standards.',
    highlights: ['Heat Treating', 'Plating', 'Patching', 'Black Oxide', 'Passivation'],
    desktopImage: asset('images/capability-banners/secondary-operations-desktop.jpg'),
    mobileImage: asset('images/capability-banners/secondary-operations-mobile.jpg'),
    mobileCtaTop: '89.15%',
  },
];

export function CapabilityConsole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  ));
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const activeSlides = isMobile ? slides.filter((slide) => slide.mobileImage) : slides;

  const moveSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + activeSlides.length) % activeSlides.length);
  };

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const updateBreakpoint = () => setIsMobile(media.matches);
    updateBreakpoint();
    media.addEventListener('change', updateBreakpoint);
    return () => media.removeEventListener('change', updateBreakpoint);
  }, []);

  useEffect(() => {
    if (activeIndex >= activeSlides.length) setActiveIndex(0);
  }, [activeIndex, activeSlides.length]);

  useEffect(() => {
    if (paused || reducedMotion) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % activeSlides.length);
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, activeSlides.length, paused, reducedMotion]);

  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      slides.forEach((slide) => {
        [slide.desktopImage, slide.mobileImage].filter(Boolean).forEach((source) => {
          const image = new Image();
          image.src = source as string;
        });
      });
    }, 300);

    return () => window.clearTimeout(preloadTimer);
  }, []);

  return (
    <section
      className="capability-carousel"
      aria-roledescription="carousel"
      aria-label="Manufacturing capabilities"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
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
      <div className="capability-carousel__viewport">
        {activeSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          const hasMobileArtwork = Boolean(slide.mobileImage);

          return (
            <figure
              className={`capability-carousel__slide ${isActive ? 'is-active' : ''} ${hasMobileArtwork ? '' : 'capability-carousel__slide--desktop-mobile-fallback'}`}
              aria-hidden={!isActive}
              key={slide.id}
            >
              <img
                src={isMobile && slide.mobileImage ? slide.mobileImage : slide.desktopImage}
                alt={`${slide.title} manufacturing capability banner`}
                width={isMobile && slide.mobileImage ? 1080 : 1920}
                height={isMobile && slide.mobileImage ? 1920 : 985}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
              <figcaption className="capability-carousel__sr-only">{slide.title}</figcaption>
              {!isMobile ? (
                <div className="capability-carousel__content" aria-hidden={!isActive}>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  <ul>
                    {slide.highlights.map((highlight) => (
                      <li key={highlight}>
                        <img src={checkMark} alt="" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <a className="button button--primary capability-carousel__button" href="#rfq" tabIndex={isActive ? 0 : -1}>
                    Request a Quote
                  </a>
                </div>
              ) : hasMobileArtwork ? (
                <a
                  className="capability-carousel__cta"
                  href="#rfq"
                  aria-label={`Request a quote for ${slide.title}`}
                  tabIndex={isActive ? 0 : -1}
                  style={{ '--mobile-cta-top': slide.mobileCtaTop } as CSSProperties}
                />
              ) : null}
            </figure>
          );
        })}
      </div>

      <div className="capability-carousel__controls">
        <div className="capability-carousel__progress" aria-label="Choose a manufacturing capability">
          {activeSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              aria-label={`Show ${slide.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
