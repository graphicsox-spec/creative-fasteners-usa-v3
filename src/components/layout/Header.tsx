import { type FormEvent, useEffect, useRef, useState } from 'react';
import { industries, navigation } from '../../content/homepage';

const searchTargets = [
  { label: 'Home', href: '#home', terms: ['home', 'homepage'] },
  { label: 'Products', href: '#products', terms: ['product', 'products', 'fastener', 'fasteners'] },
  { label: 'Capabilities', href: '#capabilities', terms: ['capability', 'capabilities', 'manufacturing', 'forming', 'finish', 'cold heading', 'thread rolling', 'secondary operations', 'heat treating', 'plating', 'patching', 'black oxide', 'passivation'] },
  { label: 'Quality', href: '#quality', terms: ['quality', 'inspection', 'traceability', 'process'] },
  { label: 'Industries', href: '#industries', terms: ['industry', 'industries', 'aerospace', 'defense', 'marine', 'oil', 'gas', 'automotive', 'custom'] },
  { label: 'About', href: '#about', terms: ['about', 'company', 'creative fasteners'] },
  { label: 'Contact', href: '#contact', terms: ['contact', 'email', 'phone', 'location'] },
  { label: 'Request a Quote', href: '#rfq', terms: ['quote', 'rfq', 'request a quote', 'drawing'] },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const industriesRef = useRef<HTMLLIElement>(null);
  const industriesTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (industriesOpen) {
          setIndustriesOpen(false);
          industriesTriggerRef.current?.focus();
          return;
        }
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [menuOpen, industriesOpen]);

  useEffect(() => {
    if (!industriesOpen) return;
    const handleOutsideClick = (event: PointerEvent) => {
      if (!industriesRef.current?.contains(event.target as Node)) setIndustriesOpen(false);
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [industriesOpen]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const closeNavigation = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setIndustriesOpen(false);
  };

  const toggleSearch = () => {
    setMenuOpen(false);
    setIndustriesOpen(false);
    setSearchMessage('');
    setSearchOpen((open) => !open);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchMessage('Enter a section, capability, industry, or RFQ term.');
      return;
    }

    const target = searchTargets.find((item) =>
      item.terms.some((term) => term.includes(query) || query.includes(term)),
    );

    if (!target) {
      setSearchMessage('No matching homepage section found. Product listings can be added later.');
      return;
    }

    document.querySelector(target.href)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    setSearchMessage(`Showing ${target.label}.`);
    setSearchOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__utility">
        <div className="site-header__utility-inner shell" aria-hidden="true" />
      </div>

      <div className="site-header__main">
        <div className="site-header__inner shell">
          <a className="site-header__brand" href="#home" aria-label="Creative Fasteners home" onClick={closeNavigation}>
            <img src={`${import.meta.env.BASE_URL}assets/brand/logo-color.svg`} alt="Creative Fasteners" width="1127" height="250" />
          </a>

          <div className="site-header__controls">
            <button
              className="site-search__toggle site-search__toggle--header"
              type="button"
              aria-expanded={searchOpen}
              aria-controls="site-search-panel"
              aria-label={searchOpen ? 'Close site search' : 'Open site search'}
              onClick={toggleSearch}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.7" cy="10.7" r="5.7" />
                <path d="m15 15 4.4 4.4" />
              </svg>
            </button>

            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => {
                setSearchOpen(false);
                setIndustriesOpen(false);
                setMenuOpen((open) => !open);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div
            className={`site-nav__backdrop ${menuOpen ? 'site-nav__backdrop--visible' : ''}`}
            onClick={closeNavigation}
            aria-hidden="true"
          />

          <nav
            id="primary-navigation"
            className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
            aria-label="Primary navigation"
          >
            <button
              className="site-nav__close"
              type="button"
              aria-label="Close navigation menu"
              onClick={closeNavigation}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <ul className="site-nav__links">
              {navigation.map((item) => item.href === '#industries' ? (
                <li
                  key={item.label}
                  ref={industriesRef}
                  className="nav-industries"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIndustriesOpen(false);
                  }}
                >
                  <button
                    ref={industriesTriggerRef}
                    type="button"
                    className="nav-industries__trigger"
                    aria-expanded={industriesOpen}
                    aria-controls="industries-dropdown"
                    onClick={() => setIndustriesOpen((open) => !open)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setIndustriesOpen(true);
                        requestAnimationFrame(() => industriesRef.current?.querySelector<HTMLAnchorElement>('.nav-industries__list a')?.focus());
                      }
                    }}
                  >
                    {item.label}
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
                  </button>
                  <div id="industries-dropdown" className="nav-industries__panel" hidden={!industriesOpen}>
                    <span className="nav-industries__eyebrow">Industries we serve</span>
                    <ul className="nav-industries__list">
                      {industries.map((industry) => (
                        <li key={industry.number}>
                          <a href={`#industry-${industry.number}`} onClick={closeNavigation}>
                            <span className="nav-industries__dot" aria-hidden="true" />
                            <span>{industry.title}</span>
                            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10m-4-4 4 4-4 4" /></svg>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a className="nav-industries__all" href="#industries" onClick={closeNavigation}>View all industries <span aria-hidden="true">↗</span></a>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <a href={item.href} onClick={closeNavigation}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="button button--primary site-nav__cta" href="#rfq" onClick={closeNavigation}>
              Request a Quote
            </a>
          </nav>
        </div>
      </div>

      <div id="site-search-panel" className={`site-search-panel ${searchOpen ? 'site-search-panel--open' : ''}`}>
        <form className="site-search shell" role="search" onSubmit={handleSearch}>
          <div className="site-search__meta">
            <label htmlFor="site-search-input">Search the homepage</label>
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close site search">Close ×</button>
          </div>
          <div className="site-search__field">
            <input
              ref={searchInputRef}
              id="site-search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchMessage('');
              }}
              placeholder="Products, capabilities, quality, industries, RFQ…"
              autoComplete="off"
            />
            <button className="button button--primary" type="submit">Search</button>
          </div>
          <p className="site-search__message" aria-live="polite">{searchMessage}</p>
        </form>
      </div>
    </header>
  );
}
