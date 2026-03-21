import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Portfolio.css';

const clients = [
  { name:'TechFlow India',    cat:'SaaS',      desc:'Secured 12 major media placements in 90 days. Organic traffic up 340%.',   result:'340% traffic growth' },
  { name:'GreenLeaf Foods',   cat:'F&B',        desc:'Full rebrand + PR campaign. Featured in ET, YourStory, and Inc42.',        result:'Featured in 3 top pubs' },
  { name:'FinEdge Wealth',    cat:'FinTech',    desc:'Thought leadership campaign. CEO quoted in Bloomberg and Mint.',            result:'Bloomberg coverage' },
  { name:'ClearPath Legal',   cat:'Legal',      desc:'Domain authority from 18 to 56. 400% rise in organic enquiries.',          result:'DA 18 → 56' },
  { name:'BuildRight Infra',  cat:'Real Estate',desc:'LinkedIn strategy + PR. Generated ₹2.4Cr in inbound leads in 6 months.',   result:'₹2.4Cr leads' },
  { name:'NovaMed Health',    cat:'Healthcare', desc:'Crisis comms + brand positioning. Trust score improved by 68%.',           result:'68% trust increase' },
];

const cats = ['All','SaaS','F&B','FinTech','Legal','Real Estate','Healthcare'];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? clients : clients.filter(c => c.cat === active);

  return (
    <>
      <Navbar />
      <div className="portfolio-page">
        <div className="portfolio-header">
          <div className="section-eyebrow">Our Work</div>
          <h1 className="section-title">Brands We've Helped <span className="hl">Get Noticed</span></h1>
          <p>Real campaigns. Real results. Here's what we've built for our clients.</p>
        </div>

        <div className="port-filters">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} className={`filter-btn ${active === c ? 'active' : ''}`}>{c}</button>
          ))}
        </div>

        <div className="port-grid">
          {filtered.map((c, i) => (
            <div key={i} className="port-card">
              <div className="port-cat">{c.cat}</div>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <div className="port-result">✓ {c.result}</div>
            </div>
          ))}
        </div>

        <div className="publications">
          <p className="pub-label">Featured In</p>
          <div className="pub-logos">
            {['YourStory','Inc42','Economic Times','Business Standard','Entrepreneur India','Forbes India'].map(p => (
              <div key={p} className="pub-item">{p}</div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
