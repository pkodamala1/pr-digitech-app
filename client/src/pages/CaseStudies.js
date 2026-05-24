import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CaseStudies.css';

const cases = [
  {
    client: 'TechFlow India', industry: 'SaaS', duration: '6 months',
    challenge: 'TechFlow had a great product but zero brand recognition. They struggled to get press coverage and organic traffic was declining month-over-month.',
    solution: 'We crafted a thought leadership campaign positioning TechFlow\'s CEO as an AI expert. Secured podcast appearances, byline articles, and pitched 40+ journalists with a tailored narrative.',
    results: [{ num:'340%', label:'Organic traffic growth' },{ num:'12', label:'Major media placements' },{ num:'2.8×', label:'Increase in inbound leads' },{ num:'DA 18→54', label:'Domain authority jump' }],
    quote: 'PR Digitech completely transformed how the market sees us. We went from invisible to industry authority in just 6 months.',
    author: 'Rahul Kapoor, CEO - TechFlow India',
  },
  {
    client: 'GreenLeaf Foods', industry: 'F&B / D2C', duration: '4 months',
    challenge: 'GreenLeaf was competing in a saturated organic food market with no differentiated positioning. Their online store had high traffic but poor conversion.',
    solution: 'We repositioned them as India\'s "clean label" pioneers. Created a campaign around founder story + sustainability angle, pitched to lifestyle and business media.',
    results: [{ num:'₹1.2Cr', label:'Revenue in campaign month' },{ num:'3', label:'Top publication features' },{ num:'58%', label:'Conversion rate improvement' },{ num:'22K', label:'New Instagram followers' }],
    quote: 'From unknown startup to being featured in Forbes India — that\'s what PR Digitech delivered for us.',
    author: 'Priya Sharma, Founder - GreenLeaf Foods',
  },
];

export default function CaseStudies() {
  return (
    <>
      <Navbar />
      <div className="cs-page">
        <div className="cs-header">
          <div className="section-eyebrow">Case Studies</div>
          <h1 className="section-title">Real Campaigns, <span className="hl">Real Results</span></h1>
          <p>Behind every stat is a strategy. Here's how we do it.</p>
        </div>

        {cases.map((c, i) => (
          <div key={i} className="cs-case">
            <div className="cs-meta">
              <span className="cs-tag">{c.industry}</span>
              <span className="cs-tag">{c.duration}</span>
            </div>
            <h2 className="cs-client">{c.client}</h2>

            <div className="cs-grid">
              <div>
                <div className="cs-section-label">The Challenge</div>
                <p className="cs-text">{c.challenge}</p>
              </div>
              <div>
                <div className="cs-section-label">Our Solution</div>
                <p className="cs-text">{c.solution}</p>
              </div>
            </div>

            <div className="cs-results">
              {c.results.map((r, j) => (
                <div key={j} className="cs-result-card">
                  <div className="cs-result-num">{r.num}</div>
                  <div className="cs-result-label">{r.label}</div>
                </div>
              ))}
            </div>

            <blockquote className="cs-quote">
              <p>"{c.quote}"</p>
              <cite>— {c.author}</cite>
            </blockquote>
          </div>
        ))}

        <div className="cs-cta">
          <h2>Want Results Like These?</h2>
          <Link to="/contact" className="btn-orange">Start Your Campaign →</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
