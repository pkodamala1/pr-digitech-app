import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',gap:'1.5rem',textAlign:'center',padding:'2rem'}}>
        <div style={{fontFamily:'Sora,sans-serif',fontSize:'8rem',fontWeight:800,color:'#1a1a1a',lineHeight:1}}>404</div>
        <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'1.5rem',fontWeight:700}}>Page Not Found</h2>
        <p style={{color:'#666',maxWidth:'400px'}}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-orange">← Go Home</Link>
      </div>
    </>
  );
}
