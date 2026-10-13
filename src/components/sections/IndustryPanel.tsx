type IndustryPanelProps = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export function IndustryPanel({ number, title, description, image, alt }: IndustryPanelProps) {
  return (
    <article id={`industry-${number}`} className="industry-card">
      <div className="industry-card__link">
        <div className="industry-card__media">
          <img src={image} alt={alt} loading="lazy" decoding="async" />
          <span className="industry-card__index" aria-hidden="true">
            <span>{number}</span><span>/ 06</span>
          </span>
        </div>
        <div className="industry-card__body">
          <div className="industry-card__title-row">
            <span className="industry-card__rule" aria-hidden="true" />
            <h3>{title}</h3>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
}
