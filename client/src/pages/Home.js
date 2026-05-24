import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const services = [
  { color: 'green',  title: 'SEO Strategy',       desc: 'Dominate search rankings with data-driven SEO that compounds over time.' },
  { color: 'brown',  title: 'Digital Marketing',   desc: 'Full-funnel campaigns that convert strangers into loyal brand advocates.' },
  { color: 'gold',   title: 'Brand Growth',        desc: 'Launch into new markets with positioning strategies built to scale.' },
  { color: 'photo',  title: 'Media Coverage',      desc: 'Get featured in top publications. We secure placements that build credibility.' },
  { color: 'dark',   title: 'Creative Design',     desc: 'Pixel-perfect visuals that make people stop scrolling and pay attention.' },
  { color: 'beige',  title: 'Analytics & Insights',desc: 'Deep-dive reports that tell you what\'s working and exactly what to do next.' },
];

const stats = [
  { num: 500,  suffix: '+', label: 'Projects\nDelivered' },
  { num: 150,  suffix: '+', label: 'Happy\nClients' },
  { num: 98,   suffix: '%', label: 'Client\nRetention Rate' },
  { num: 5,    suffix: '+', label: 'Years of\nExcellence' },
];

const testimonials = [
  { initials:'RK', name:'Rahul Kapoor',  role:'CEO, TechFlow India',   quote:'"PR Digitech got us featured in 3 major publications in month one. Inbound leads doubled within 60 days."' },
  { initials:'PS', name:'Priya Sharma',  role:'Founder, GreenLeaf Foods', quote:'"Their brand strategy transformed how the market sees us. Unknown startup to industry authority in 6 months."' },
  { initials:'AM', name:'Arjun Mehta',   role:'Marketing Head, FinEdge',  quote:'"Incredible team. They understand our audience deeply and create content that actually converts."' },
  { initials:'NP', name:'Neha Patel',    role:'Director, ClearPath Legal', quote:'"Our domain authority shot up and we\'re ranking for keywords we never thought possible. Best ROI we\'ve seen."' },
];

export default function Home() {
  const statsRef = useRef(null);

  // Count-up animation
  const countUp = (el, target, suffix) => {
    let c = 0;
    const step = target / 60;
    const iv = setInterval(() => {
      c = Math.min(c + step, target);
      el.textContent = Math.floor(c) + suffix;
      if (c >= target) clearInterval(iv);
    }, 20);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.querySelectorAll('[data-target]').forEach(n => {
            countUp(n, +n.dataset.target, n.dataset.suffix || '+');
          });
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">✦ #1 Digital PR Agency in India</div>
          <h1>
            <span className="word">We</span>{' '}
            <span className="word">Build</span>{' '}
            <span className="word">Brands</span><br />
            <span className="word orange">That</span>{' '}
            <span className="word orange">Get</span>{' '}
            <span className="word orange">Noticed.</span>
          </h1>
          <p className="hero-sub">We help startups and businesses build credibility, secure media coverage, and grow their digital presence through strategic PR and marketing.</p>
          <div className="hero-btns">
            <Link to="/contact" className="btn-orange">Start a Project →</Link>
            <Link to="/portfolio" className="btn-outline">See Our Work</Link>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              <div className="avatar a1">RK</div>
              <div className="avatar a2">PS</div>
              <div className="avatar a3">AM</div>
            </div>
            <span className="trust-text"><strong>150+ clients</strong> trust PR Digitech</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {['Digital PR','Brand Strategy','Media Coverage','Content Marketing','SEO & Visibility','Social Media','Reputation Management','Press Releases',
            'Digital PR','Brand Strategy','Media Coverage','Content Marketing','SEO & Visibility','Social Media','Reputation Management','Press Releases'
          ].map((item, i) => (
            <div key={i} className="marquee-item"><span className="dot">✦</span> {item}</div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="stats-section reveal" ref={statsRef}>
        <div className="section-eyebrow">Our Numbers</div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-num" data-target={s.num} data-suffix={s.suffix}>0{s.suffix}</span>
              <span className="stat-desc">{s.label.split('\n').map((l,j) => <span key={j}>{l}<br/></span>)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="services-inner">
          <div className="services-header">
            <div>
              <div className="section-eyebrow" style={{color:'rgba(160,210,130,0.75)'}}>What We Do</div>
              <h2 className="section-title">Services That Drive <span className="hl">Real Results</span></h2>
            </div>
            <Link to="/portfolio" className="btn-ghost-light">View All →</Link>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className={`service-card card-${s.color}`}>
                <div className="icon-long-shadow" />
                <div className="card-text">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <div className="card-arrow">→</div>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/contact" className="btn-sand">Get a Free Quote →</Link>
            <Link to="/portfolio" className="btn-ghost-light">View All Services</Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-section reveal">
        <div className="why-left">
          <div className="section-eyebrow">Why Choose Us</div>
          <h2 className="section-title">Why Businesses Trust <span style={{color:'var(--orange)'}}>PR Digitech</span></h2>
          <p className="why-desc">In today's crowded digital landscape, credibility is everything. We deliver measurable outcomes — not just impressions.</p>
          <Link to="/about" className="btn-orange">Learn About Us →</Link>
        </div>
        <div className="why-list">
          {[
            ['Proven Media Placement Track Record','500+ placements in top-tier publications across industries.'],
            ['Dedicated Strategy Per Client','No templates. Every campaign is built from scratch for your goals.'],
            ['Transparent Reporting & Results','Monthly reports with clear metrics — coverage, traffic, leads, ROI.'],
            ['Fast Turnaround, Real Outcomes','See results within 30 days. No fluff, just execution that works.'],
          ].map(([title, desc], i) => (
            <div key={i} className="why-item">
              <div className="why-check">✓</div>
              <div><h4>{title}</h4><p>{desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section reveal">
        <div className="section-eyebrow">Client Love</div>
        <h2 className="section-title">What Our Clients <span className="hl">Say</span></h2>
        <div className="testi-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner reveal">
        <h2>Ready to Get Your Brand Noticed?</h2>
        <p>Let's build your visibility together. First consultation is absolutely free.</p>
        <div className="cta-btns">
          <Link to="/contact" className="btn-black">Book Free Consultation</Link>
          <Link to="/case-studies" className="btn-light-outline">View Case Studies</Link>
        </div>
      </div>

      <Footer />

      {/* WhatsApp float */}
      <a href="https://wa.me/919876543210" className="wa-float" target="_blank" rel="noreferrer">💬</a>
    </>
  );
}
