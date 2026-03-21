import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const PageShell = ({ eyebrow, title, children }) => (
  <>
    <Navbar />
    <div style={{paddingTop:'64px',minHeight:'80vh',padding:'8rem 5rem 5rem'}}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h1 className="section-title" dangerouslySetInnerHTML={{__html: title}} />
      {children}
    </div>
    <Footer />
  </>
);

export default PageShell;
