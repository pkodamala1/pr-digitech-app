import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  { path: '/',              label: 'Home' },
  { path: '/about',         label: 'About' },
  { path: '/ai-technology', label: 'AI & Technology', highlight: true },
  { path: '/portfolio',     label: 'Portfolio' },
  { path: '/case-studies',  label: 'Case Studies' },
  { path: '/blog',          label: 'Blog' },
  { path: '/pricing',       label: 'Pricing' },
  { path: '/contact',       label: 'Contact' },
];

export default function Navbar() {
  const { pathname }           = useLocation();
  const [open, setOpen]        = useState(false);
  const [scrolled, setScrolled]= useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">PR <span>Digitech</span></Link>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`${pathname === l.path ? 'active' : ''} ${l.highlight ? 'ai-link' : ''}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="nav-hire">Hire Us!</Link>

        <button
          className={`hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-nav ${open ? 'open' : ''}`}>
        {links.map(l => (
          <Link
            key={l.path}
            to={l.path}
            className={`${pathname === l.path ? 'active' : ''} ${l.highlight ? 'ai-link-m' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/contact" className="mobile-hire">Hire Us! →</Link>
        <Link to="/admin"   className="mobile-admin">⚙ Admin</Link>
      </div>
    </>
  );
}
