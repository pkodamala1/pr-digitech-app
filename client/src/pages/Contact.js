import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../utils/api';
import './Contact.css';

const initialForm = {
  firstName:'', lastName:'', email:'', phone:'',
  company:'', service:'', budget:'', message:'', privacy: false
};

export default function Contact() {
  const [form, setForm]         = useState(initialForm);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.privacy) { toast.error('Please accept the privacy policy'); return; }
    setLoading(true);
    try {
      await API.post('/contact', form);
      setSubmitted(true);
      toast.success('Message sent! We\'ll be in touch shortly.');
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-header">
          <div className="section-eyebrow">Get In Touch</div>
          <h1 className="section-title">Let's Build Something <span className="hl">Great Together</span></h1>
          <p>Tell us about your project and we'll get back to you within 24 hours.</p>
        </div>

        <div className="contact-grid">
          {/* Info cards */}
          <div className="contact-info">
            {[
              { icon:'📧', label:'Email Us', value:'hello@prdigitech.in', href:'mailto:hello@prdigitech.in' },
              { icon:'📞', label:'Call Us', value:'+91 98765 43210', href:'tel:+919876543210' },
              { icon:'📍', label:'Visit Us', value:'Mumbai, India', href:'#' },
              { icon:'💬', label:'WhatsApp', value:'Chat instantly', href:'https://wa.me/919876543210' },
            ].map((c,i) => (
              <a key={i} href={c.href} className="info-card" target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <div className="info-icon">{c.icon}</div>
                <div><div className="info-label">{c.label}</div><div className="info-value">{c.value}</div></div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="btn-orange" onClick={() => { setForm(initialForm); setSubmitted(false); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input name="firstName" value={form.firstName} onChange={onChange} placeholder="Rahul" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Kapoor" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={onChange} placeholder="rahul@company.com" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Company</label>
                    <input name="company" value={form.company} onChange={onChange} placeholder="Your Company" />
                  </div>
                  <div className="form-group">
                    <label>Service</label>
                    <select name="service" value={form.service} onChange={onChange}>
                      <option value="">Select a Service</option>
                      {['Digital PR','Brand Strategy','SEO Strategy','Content Marketing','Media Coverage','Creative Design','Analytics','AI & Technology'].map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Monthly Budget</label>
                  <select name="budget" value={form.budget} onChange={onChange}>
                    <option value="">Select Budget Range</option>
                    {['Under ₹10,000','₹10,000 – ₹25,000','₹25,000 – ₹50,000','₹50,000 – ₹1,00,000','Above ₹1,00,000'].map(b => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={onChange} placeholder="Tell us about your project, goals, and timeline..." rows={5} required />
                </div>
                <div className="form-check">
                  <input type="checkbox" id="privacy" name="privacy" checked={form.privacy} onChange={onChange} />
                  <label htmlFor="privacy">I agree to the <a href="#">Privacy Policy</a> and consent to being contacted.</label>
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <a href="https://wa.me/919876543210" className="wa-float" target="_blank" rel="noreferrer">💬</a>
    </>
  );
}
