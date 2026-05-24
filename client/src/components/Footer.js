import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">PR <span>Digitech</span></Link>
          <p>Building trust, visibility, and credibility for ambitious brands across India and beyond.</p>
          <div className="footer-social">
            <a href="#" className="social-btn">in</a>
            <a href="#" className="social-btn">𝕏</a>
            <a href="#" className="social-btn">ig</a>
            <a href="#" className="social-btn">yt</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/ai-technology">AI & Technology</Link></li>
            <li><a href="#">Digital PR</a></li>
            <li><a href="#">Brand Strategy</a></li>
            <li><a href="#">SEO & Visibility</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@prdigitech.in">hello@prdigitech.in</a></li>
            <li><a href="tel:+919876543210">+91 98765 43210</a></li>
            <li><a href="#">Mumbai, India</a></li>
            <li><Link to="/contact">Get in Touch</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 PR Digitech. All rights reserved.</span>
        <span className="footer-copy">
          <a href="#">Privacy Policy</a> · <a href="#">Terms</a> ·{' '}
          <Link to="/admin">Admin</Link>
        </span>
      </div>
    </footer>
  );
}
