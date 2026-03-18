import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Pricing.css';

const plans = [
  {
    name: 'Starter', monthly: 15000, annual: 12000, color: 'default',
    desc: 'Perfect for startups getting their first PR push.',
    features: ['3 press releases/month','Media outreach to 4 journalist','Basic SEO audit','Monthly report','Email support','Brand positioning guide'],
    cta: 'Get Started',
  },
  {
    name: 'Growth', monthly: 35000, annual: 29000, color: 'orange', popular: true,
    desc: 'The complete digital PR package for scaling businesses.',
    features: ['8 press releases/month','Media outreach to 75+ journalists','Full SEO + content strategy','Weekly reports','Priority support','Social media management','Thought leadership articles','1 guaranteed publication/month'],
    cta: 'Most Popular',
  },
  {
    name: 'Agency', monthly: 75000, annual: 62000, color: 'default',
    desc: 'Enterprise-grade PR and marketing for ambitious brands.',
    features: ['Unlimited press releases','Media outreach to 200+ contacts','AI-powered analytics dashboard','Daily reports','Dedicated account manager','Full content production','Crisis management','3+ guaranteed publications/month','Custom strategy sessions'],
    cta: 'Contact Us',
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Navbar />
      <div className="pricing-page">
        <div className="pricing-header">
          <div className="section-eyebrow">Transparent Pricing</div>
          <h1 className="section-title">Simple Plans, <span className="hl">Real Results</span></h1>
          <p>No hidden fees. Cancel anytime. Start seeing results in 30 days.</p>

          <div className="toggle-wrap">
            <span className={!annual ? 'tog-active' : ''}>Monthly</span>
            <button className={`toggle ${annual ? 'on' : ''}`} onClick={() => setAnnual(!annual)}>
              <span className="tog-knob" />
            </button>
            <span className={annual ? 'tog-active' : ''}>Annual <em className="save-badge">Save 20%</em></span>
          </div>
        </div>

        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`plan-card ${plan.color === 'orange' ? 'featured' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <span className="currency">₹</span>
                <span className="amount">{(annual ? plan.annual : plan.monthly).toLocaleString('en-IN')}</span>
                <span className="per">/mo</span>
              </div>
              {annual && <div className="annual-note">Billed ₹{(plan.annual * 12).toLocaleString('en-IN')}/year</div>}
              <p className="plan-desc">{plan.desc}</p>
              <ul className="plan-features">
                {plan.features.map((f, j) => <li key={j}><span className="check">✓</span>{f}</li>)}
              </ul>
              <Link to="/contact" className={plan.color === 'orange' ? 'btn-orange plan-btn' : 'btn-outline plan-btn'}>
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>

        <div className="pricing-faq">
          <h2 className="section-title" style={{textAlign:'center',marginBottom:'3rem'}}>Frequently Asked <span className="hl">Questions</span></h2>
          <div className="faq-grid">
            {[
              ['Is there a setup fee?','No setup fees ever. You only pay the monthly or annual plan rate.'],
              ['Can I cancel anytime?','Yes. Cancel anytime with 30 days notice. No lock-in contracts.'],
              ['Do you guarantee results?','We guarantee effort and strategy. Results depend on your niche and market, but 98% of clients see measurable improvement within 60 days.'],
              ['What industries do you work with?','We work across SaaS, FinTech, Healthcare, Legal, F&B, Real Estate, and more.'],
              ['Do you provide reports?','Yes — monthly reports on all plans, weekly on Growth and Agency.'],
              ['Can I upgrade my plan?','Absolutely. Upgrade or downgrade anytime. Pro-rated billing applies.'],
            ].map(([q,a], i) => (
              <div key={i} className="faq-item">
                <h4>{q}</h4>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
