import { useLayoutEffect, useRef, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { CapabilityConsole } from './components/sections/CapabilityConsole';
import { HeroSlider } from './components/sections/HeroSlider';
import { IndustryPanel } from './components/sections/IndustryPanel';
import { QualityTimeline } from './components/sections/QualityTimeline';
import { RFQForm } from './components/sections/RFQForm';
import { Reveal } from './components/ui/Reveal';
import { SectionHeading } from './components/ui/SectionHeading';
import { differentiators, industries } from './content/homepage';

function CrosshairIcon() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="34" />
      <circle cx="60" cy="60" r="13" />
      <path d="M60 4v28M60 88v28M4 60h28M88 60h28" />
    </svg>
  );
}

export default function App() {
  const [introExpanded, setIntroExpanded] = useState(false);
  const introGridRef = useRef<HTMLDivElement>(null);
  const introExpandRef = useRef<HTMLButtonElement>(null);
  const introCollapseRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const grid = introGridRef.current;
    const copy = grid?.querySelector<HTMLElement>('.intro__copy');
    const extra = grid?.querySelector<HTMLElement>('.intro__expanded');
    if (!grid || !copy || !extra) return;

    // Measure only the collapsed copy, even while the extra paragraph is open.
    const sizePhoto = () => {
      const collapsedHeight = copy.offsetHeight - (extra.hidden ? 0 : extra.offsetHeight);
      grid.style.setProperty('--intro-image-height', `${collapsedHeight}px`);
    };
    const observer = new ResizeObserver(sizePhoto);
    observer.observe(copy);
    sizePhoto();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">
        <HeroSlider />

        <section id="about" className="intro section">
          <div ref={introGridRef} className="shell intro__grid">
            <Reveal className="intro__copy">
              <SectionHeading
                number="01"
                eyebrow="Creative Fasteners"
                title="Precision Fastener Manufacturing"
                titleLines={['Precision Fastener', 'Manufacturing']}
              />
              <p className="intro__lead">
                Creative Fasteners is dedicated to excellence in cold-heading manufacturing.
              </p>
              <p>
                Our mission is to provide high-quality fasteners with unbeatable lead times, utilizing only DFAR-compliant materials. We take pride in our commitment to precision, innovation, and customer satisfaction. We welcome custom orders, embracing every opportunity to exceed expectations and drive success in partnership with our valued{' '}
                <span className="intro__sentence-end">
                  clients.{' '}
                  <button
                    ref={introExpandRef}
                    type="button"
                    className={`intro__toggle ${introExpanded ? 'intro__toggle--hidden' : ''}`}
                    aria-expanded={false}
                    aria-hidden={introExpanded ? true : undefined}
                    disabled={introExpanded}
                    aria-controls="intro-more-copy"
                    onClick={() => {
                      setIntroExpanded(true);
                      window.requestAnimationFrame(() => introCollapseRef.current?.focus({ preventScroll: true }));
                    }}
                  >
                    Read more
                    <svg className="intro__toggle-icon" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </button>
                </span>
              </p>
              <div id="intro-more-copy" className="intro__expanded" hidden={!introExpanded}>
                <p>
                  All dies are manufactured in-house, allowing us to maintain precise control over tooling quality, dimensional accuracy, and production{' '}
                  <span className="intro__sentence-end">
                    consistency.{' '}
                    <button
                      ref={introCollapseRef}
                      type="button"
                      className="intro__toggle"
                      aria-expanded={true}
                      aria-controls="intro-more-copy"
                      onClick={() => {
                        setIntroExpanded(false);
                        window.requestAnimationFrame(() => introExpandRef.current?.focus({ preventScroll: true }));
                      }}
                    >
                      Read less
                      <svg className="intro__toggle-icon" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 10l4-4 4 4" />
                      </svg>
                    </button>
                  </span>
                </p>
              </div>
              <a className="text-link" href="#quality">See the quality-control process <span aria-hidden="true">↗</span></a>
            </Reveal>

            <Reveal className="intro-visual" delay={120}>
              <img
                src={`${import.meta.env.BASE_URL}assets/images/industries/aerospace.webp`}
                alt="Precision dimensional inspection of a threaded component"
                width="1280"
                height="768"
                loading="lazy"
              />
              <div className="intro-visual__overlay" aria-hidden="true">
                <span>DIMENSIONAL CONTROL</span>
                <CrosshairIcon />
                <div><strong>PROCESS</strong><span>01—05</span></div>
              </div>
              <div className="intro-visual__caption">
                <span>Inspection visibility</span>
                <span>Made-to-spec focus</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="shell materials" delay={80}>
            <div className="materials__heading">
              <span>Materials &amp; Manufacturing Capabilities</span>
              <h3>Material Selection</h3>
              <p>We manufacture precision fasteners using a wide range of materials to meet specific application, engineering, and performance requirements. Our material capabilities include:</p>
            </div>
            <div className="materials__grid">
              <article className="materials__card">
                <h4>Material Capabilities</h4>
                <ul>
                  <li><strong>Stainless Steel:</strong> 316, 304 / 18-8, and 302</li>
                  <li><strong>Alloy Steel:</strong> 4037 and 8740</li>
                  <li><strong>Copper Alloys:</strong> Silicon bronze and brass</li>
                  <li><strong>Specialty Alloys:</strong> A286, PH 13-8, Monel 400, and Inconel 718</li>
                  <li><strong>Aluminum:</strong> 7075</li>
                </ul>
              </article>
              <article className="materials__card">
                <h4>Standard &amp; Metric Sizes</h4>
                <p>We manufacture standard and metric fasteners in a variety of diameters and lengths to meet customer drawings and specifications.</p>
                <ul>
                  <li><strong>Standard Sizes:</strong> Diameters from #2-56 through 5/16&quot; and lengths from 3/16&quot; to 3-1/2&quot;.</li>
                  <li><strong>Metric Sizes:</strong> Diameters from M2 through M8 and lengths from 4 mm to 75 mm.</li>
                </ul>
              </article>
            </div>
            <p className="materials__summary">Our material and size capabilities support a broad range of precision fastener applications across multiple industries.</p>
          </Reveal>
        </section>

        <section id="capabilities" className="capabilities section section--grey">
          <span id="products" className="anchor-target" aria-hidden="true" />
          <div className="shell">
            <Reveal>
              <div className="section-heading-row">
                <SectionHeading
                  number="02"
                  eyebrow="Manufacturing Capabilities"
                  title="Cold Heading & Thread Rolling"
                  description="Cold Heading, Thread Rolling, and Secondary Manufacturing Processes Engineered to Meet Your Drawing Specifications, Material Requirements, and Performance Standards."
                />
              </div>
            </Reveal>
          </div>
          <div className="capabilities__fullwidth">
            <CapabilityConsole />
          </div>
        </section>

        <section id="quality" className="quality section">
          <div className="quality__grid" aria-hidden="true" />
          <div className="shell">
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow="Quality-Control Process"
                title="Quality Controlled at Every Stage"
                description="Quality is treated as a connected production discipline, with review points that follow the fastener through the manufacturing route."
                light
              />
            </Reveal>
            <Reveal delay={100}>
              <QualityTimeline />
            </Reveal>
          </div>
        </section>

        <section id="industries" className="industries section">
          <div className="shell">
            <Reveal>
              <div className="section-heading-row">
                <SectionHeading
                  number="04"
                  eyebrow="Industries Served"
                  title="Precision Where Performance Matters"
                  description="Manufacturing support shaped around demanding drawings, controlled requirements, and applications where component consistency is essential."
                />
                <a className="button button--outline-dark" href="#rfq">Discuss Your Application</a>
              </div>
            </Reveal>
            <div className="industries__grid" aria-label="Industries served">
              {industries.map((industry, index) => (
                <Reveal key={industry.number} delay={index * 55}>
                  <IndustryPanel {...industry} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="why section">
          <div className="shell why__layout">
            <Reveal className="why__intro">
              <SectionHeading
                number="05"
                eyebrow="Why Creative Fasteners"
                title="Discipline You Can Build Around"
                description="A modern manufacturing partner should make requirements clearer, process decisions more visible, and RFQ communication easier to act on."
                light
              />
              <a className="button button--ghost" href="#rfq">Start an RFQ</a>
            </Reveal>
            <div className="why__list">
              {differentiators.map((item, index) => (
                <Reveal key={item.number} delay={index * 45}>
                  <article>
                    <span>{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="rfq" className="rfq section">
          <div className="shell">
            <Reveal>
              <div className="rfq__heading">
                <SectionHeading
                  number="06"
                  eyebrow="Request for Quote"
                  title="Start the Conversation"
                  description="Share your contact information and a brief comment. Our team can follow up to discuss the details of your requirement."
                />
                <div className="rfq__aside">
                  <span>WHAT HAPPENS NEXT</span>
                  <ul>
                    <li>Share your contact details</li>
                    <li>Tell us what you need</li>
                    <li>Our team follows up</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <RFQForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
