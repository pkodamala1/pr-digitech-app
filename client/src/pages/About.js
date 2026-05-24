// About.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <div style={{paddingTop:'64px',minHeight:'80vh',padding:'8rem 5rem 5rem'}}>
        <div className="section-eyebrow">Our Story</div>
        <h1 className="section-title">We Are <span className="hl">PR Digitech</span></h1>
        <p style={{color:'#888',marginTop:'1.5rem',maxWidth:'600px',lineHeight:1.8}}>
          PR Digitech is India's leading digital PR agency, helping startups and enterprises build brand credibility, secure media coverage, and grow their digital presence through data-driven strategy and AI-powered execution.
        </p>
      </div>
      <Footer />
    </>
  );
}
