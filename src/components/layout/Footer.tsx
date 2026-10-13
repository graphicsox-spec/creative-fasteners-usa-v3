import { navigation } from '../../content/homepage';

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__top shell">
        <div className="site-footer__brand">
          <a href="#home" aria-label="Creative Fasteners home">
            <img src={`${import.meta.env.BASE_URL}assets/brand/logo-white.svg`} alt="Creative Fasteners" width="420" height="130" />
          </a>
          <p>Precision fastener manufacturing support for demanding aerospace, defense, and industrial requirements.</p>
        </div>
        <div>
          <h2>Navigate</h2>
          <ul>
            {navigation.slice(0, 5).map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <p>Contact details will be added after client confirmation.</p>
        </div>
        <div className="site-footer__cta">
          <span>Have a drawing or part requirement?</span>
          <h2 aria-label="Start the RFQ conversation.">
            <span className="site-footer__cta-title-line">Start the RFQ</span>
            <span className="site-footer__cta-title-line">conversation.</span>
          </h2>
          <a className="button button--primary" href="#rfq">Request a Quote</a>
        </div>
      </div>
      <div className="site-footer__bottom shell">
        <span>© {new Date().getFullYear()} Creative Fasteners. All rights reserved.</span>
        <a href="#privacy-note">Privacy Policy</a>
        <span id="privacy-note">Privacy policy content pending client approval.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
