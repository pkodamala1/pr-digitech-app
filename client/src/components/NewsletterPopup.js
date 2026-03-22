import React, { useState, useEffect, useRef } from 'react';
import './NewsletterPopup.css';

const countries = [
  { flag: '🇮🇳', dial: '+91',  name: 'India' },
  { flag: '🇺🇸', dial: '+1',   name: 'USA' },
  { flag: '🇬🇧', dial: '+44',  name: 'UK' },
  { flag: '🇦🇪', dial: '+971', name: 'UAE' },
  { flag: '🇸🇬', dial: '+65',  name: 'Singapore' },
  { flag: '🇦🇺', dial: '+61',  name: 'Australia' },
];

export default function NewsletterPopup() {
  const [show, setShow]           = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const [country, setCountry]     = useState(countries[0]);
  const [form, setForm]           = useState({ firstName:'', lastName:'', email:'', website:'', budget:'', phone:'' });
  const dropRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('popupDismissed')) return;
    const t = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const close = () => { setShow(false); sessionStorage.setItem('popupDismissed', 'true'); };
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = e => {
    e.preventDefault();
    if (!form.email || !form.firstName) return;
    setSubmitted(true);
    sessionStorage.setItem('popupDismissed', 'true');
    setTimeout(() => setShow(false), 3000);
  };

  if (!show) return null;

  return (
    <div className="np-overlay" onClick={e => e.target === e.currentTarget && close()}>
      <div className="np-modal">
        <button className="np-close" onClick={close}>X</button>
        <div className="np-header">
          <div className="np-tag">Digital Marketing Report - March 2026</div>
          <h2 className="np-title">Digital Marketing Industry Roundup.</h2>
          <p className="np-subtitle">Google AI updates, top PR strategies, SEO shifts and geo-targeting breakthroughs - summarised for you.</p>
          <div className="np-previews">
            <div className="np-pcard np-dk">
              <div className="np-pi"><div className="np-pl np-pd" /><div className="np-pl np-pd np-ps" /><div className="np-thumb"><span>HOW TO GROW</span></div></div>
              <div className="np-pf"><div className="np-pl np-pw" /><div className="np-pl np-pw np-ps" /></div>
            </div>
            <div className="np-pcard np-lt">
              <div className="np-pi"><div className="np-pl np-pw" /><div className="np-pl np-pw np-ps" /><div className="np-aibox">AI Search Update</div></div>
              <div className="np-pf"><div className="np-pl np-pw" /><div className="np-pl np-pw np-ps" /></div>
            </div>
            <div className="np-pcard np-lt">
              <div className="np-pi"><div className="np-pl np-pw" /><div className="np-pl np-pw np-ps" />
                <div className="np-chart">
                  <div className="np-bar" style={{height:'50%',background:'#4a90d9',opacity:0.7}} />
                  <div className="np-bar" style={{height:'80%',background:'#f26419'}} />
                  <div className="np-bar" style={{height:'35%',background:'#4a90d9',opacity:0.7}} />
                  <div className="np-bar" style={{height:'95%',background:'#f26419'}} />
                  <div className="np-bar" style={{height:'60%',background:'#4a90d9',opacity:0.7}} />
                </div>
              </div>
              <div className="np-pf"><div className="np-pl np-pw" /><div className="np-pl np-pw np-ps" /></div>
            </div>
          </div>
        </div>
        {submitted ? (
          <div className="np-success">
            <div className="np-sicon">OK</div>
            <h3>You are in!</h3>
            <p>Check your inbox - your digital marketing roundup is on its way!</p>
          </div>
        ) : (
          <form className="np-body" onSubmit={onSubmit}>
            <div className="np-form-title">Get it sent to your inbox - it is free</div>
            <div className="np-form-sub">Join 2,000+ founders and marketers who read this every month.</div>
            <div className="np-fields">
              <div className="np-row">
                <div className="np-field"><label className="np-label">First Name</label><input className="np-inp" name="firstName" value={form.firstName} onChange={onChange} placeholder="e.g. Rahul" required /></div>
                <div className="np-field"><label className="np-label">Last Name</label><input className="np-inp" name="lastName" value={form.lastName} onChange={onChange} placeholder="e.g. Sharma" /></div>
              </div>
              <div className="np-field"><label className="np-label">Company Email</label><input className="np-inp" type="email" name="email" value={form.email} onChange={onChange} placeholder="you@company.com" required /></div>
              <div className="np-row">
                <div className="np-field"><label className="np-label">Website URL</label><input className="np-inp" name="website" value={form.website} onChange={onChange} placeholder="www.yoursite.com" /></div>
                <div className="np-field"><label className="np-label">Monthly Budget</label><input className="np-inp" name="budget" value={form.budget} onChange={onChange} placeholder="e.g. 50,000" /></div>
              </div>
              <div className="np-field">
                <label className="np-label">Phone Number</label>
                <div className="np-phone">
                  <div className="np-flag-wrap" ref={dropRef}>
                    <button type="button" className="np-flag-btn" onClick={() => setDropOpen(!dropOpen)}>
                      <span className="np-dial">{country.flag} {country.dial}</span>
                      <span className="np-caret">v</span>
                    </button>
                    {dropOpen && (
                      <div className="np-dropdown">
                        {countries.map(c => (
                          <div key={c.dial} className="np-drop-item" onClick={() => { setCountry(c); setDropOpen(false); }}>
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                            <span className="np-dial-sm">{c.dial}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <input className="np-phone-inp" name="phone" value={form.phone} onChange={onChange} placeholder="98765 43210" type="tel" />
                </div>
              </div>
              <p className="np-legal">By clicking the button below, you consent for PR Digitech and partners to use automated technology, including pre-recorded messages, cell phones and texts, and email to contact you at the number and email address provided. This includes if the number is currently on any Do Not Call Lists. This consent is not required to make a purchase. <a href="#">Privacy Policy.</a></p>
              <button type="submit" className="np-submit">Send to my email</button>
            </div>
          </form>
        )}
        <div className="np-footer">
          <span className="np-fi">No spam, ever</span>
          <span className="np-fi">Unsubscribe anytime</span>
          <span className="np-fi">100% free</span>
        </div>
      </div>
    </div>
  );
}
