import { heroSlides } from '../../content/homepage';

export function ClientArtworkSlide({ activeIndex, onSelect }: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const slide = heroSlides[activeIndex];
  const artwork = slide.clientArtwork;
  if (!artwork) return null;

  return (
    <div className={`client-slide client-slide--${slide.id}`}>
      <picture className="client-slide__background">
        <source media="(max-width: 767px)" srcSet={artwork.mobileImage} width="1080" height="1600" />
        <img src={slide.image} alt={slide.imageAlt} width="1920" height="1080" fetchPriority="high" />
      </picture>
      <div className="client-slide__copy">
        <h1 className="client-slide__headline">
          {artwork.headlineLines.map((line, index) => (
            <span key={line} className={index === 1 ? 'client-slide__headline-accent' : ''}>
              {line}
            </span>
          ))}
        </h1>
        <a className="client-slide__cta" href="#rfq">
          Request a Quote
        </a>
      </div>
      <nav className="client-slide__dots" aria-label="Industry slideshow controls">
        {heroSlides.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-label={`Show ${item.id.replaceAll('-', ' ')} industry`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => onSelect(index)}
          >
            <span />
          </button>
        ))}
      </nav>
    </div>
  );
}
