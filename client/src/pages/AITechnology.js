import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AITechnology.css';

const capabilities = [
  { icon:'🔍', title:'AI Media Monitoring',   desc:'Track brand mentions across 50,000+ sources in real-time. Catch every conversation.' },
  { icon:'✍️', title:'AI Content Generation', desc:'GPT-4 powered press releases, articles, and social posts — reviewed by our expert team.' },
  { icon:'🎯', title:'Predictive Targeting',  desc:'ML models predict which journalists and outlets will cover your story before we pitch.' },
  { icon:'💬', title:'Sentiment Analysis',    desc:'Understand brand perception across the web with 92% accuracy sentiment scoring.' },
  { icon:'📈', title:'AI SEO Intelligence',   desc:'Keyword clusters, content gaps, and competitor analysis — all automated and actionable.' },
  { icon:'📊', title:'Analytics Dashboard',   desc:'Real-time campaign performance. Coverage, traffic, backlinks, leads — all in one view.' },
];

const results = [
  { num:'3.8×', label:'Faster Campaign\nLaunch' },
  { num:'68%',  label:'More Media\nPlacements' },
  { num:'92%',  label:'Sentiment\nAccuracy' },
  { num:'40%',  label:'Lower Cost\nPer Lead' },
];

export default function AITechnology() {
  return (
    <>
      <Navbar />
      <div className="ai-page">

        {/* Hero */}
        <div className="ai-hero">
          <div className="ai-grid-bg" />
          <div className="ai-hero-content">
            <div className="ai-badge">⚡ AI-Powered PR</div>
            <h1>The Future of PR is <span className="ai-hl">Intelligent</span></h1>
            <p>We combine human expertise with AI to deliver PR campaigns that are faster, smarter, and more effective than anything done manually.</p>
            <Link to="/contact" className="btn-orange">Experience AI PR →</Link>
          </div>
        </div>

        {/* Capabilities */}
        <div className="ai-section">
          <div className="section-eyebrow" style={{color:'rgba(130,180,255,0.8)'}}>Our AI Stack</div>
          <h2 className="section-title">6 Ways AI Powers <span style={{color:'#7eb8ff'}}>Every Campaign</span></h2>
          <div className="ai-grid">
            {capabilities.map((c, i) => (
              <div key={i} className="ai-card">
                <div className="ai-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="ai-results">
          <div className="section-eyebrow" style={{color:'rgba(130,180,255,0.8)'}}>Proven Results</div>
          <h2 className="section-title">AI That Delivers <span style={{color:'#7eb8ff'}}>Measurable Outcomes</span></h2>
          <div className="results-grid">
            {results.map((r, i) => (
              <div key={i} className="result-card">
                <div className="result-num">{r.num}</div>
                <div className="result-label">{r.label.split('\n').map((l,j) => <span key={j}>{l}<br/></span>)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="ai-section" style={{background:'#050505',borderTop:'1px solid #1a1a1a'}}>
          <div className="section-eyebrow" style={{color:'rgba(130,180,255,0.8)'}}>Tech Stack</div>
          <h2 className="section-title">Tools We <span style={{color:'#7eb8ff'}}>Trust</span></h2>
          <div className="tech-grid">
            {['GPT-4','Meltwater','SEMrush','Ahrefs','BuzzSumo','Google Analytics','HubSpot','Canva AI'].map((tool, i) => (
              <div key={i} className="tech-chip">{tool}</div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="ai-cta">
          <h2>Ready to Let AI Supercharge Your PR?</h2>
          <p>See the difference intelligent PR can make for your brand.</p>
          <Link to="/contact" className="btn-orange">Book a Free Demo →</Link>
        </div>

      </div>
      <Footer />
    </>
  );
}
