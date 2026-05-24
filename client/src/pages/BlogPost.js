import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../utils/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    API.get(`/blog/${slug}`)
      .then(r => setPost(r.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <><Navbar />
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'80vh',color:'#555'}}>Loading...</div>
    <Footer /></>
  );

  if (error || !post) return (
    <><Navbar />
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'80vh',gap:'1rem'}}>
      <div style={{fontSize:'3rem'}}>📄</div>
      <h2 style={{fontFamily:'Sora,sans-serif'}}>Post Not Found</h2>
      <Link to="/blog" className="btn-orange">← Back to Blog</Link>
    </div>
    <Footer /></>
  );

  return (
    <>
      <Navbar />
      <div style={{paddingTop:'64px',maxWidth:'760px',margin:'0 auto',padding:'6rem 2rem 5rem'}}>
        <Link to="/blog" style={{color:'#555',fontSize:'0.82rem',textDecoration:'none',display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'2rem'}}>← Back to Blog</Link>

        <div style={{display:'flex',gap:'0.75rem',marginBottom:'1.5rem',flexWrap:'wrap',alignItems:'center'}}>
          <span style={{background:'rgba(242,100,25,0.1)',color:'#f26419',border:'1px solid rgba(242,100,25,0.2)',borderRadius:'50px',padding:'0.2rem 0.8rem',fontSize:'0.72rem',fontWeight:700}}>{post.category}</span>
          <span style={{color:'#444',fontSize:'0.78rem'}}>{post.readTime}</span>
          <span style={{color:'#333',fontSize:'0.78rem'}}>•</span>
          <span style={{color:'#444',fontSize:'0.78rem'}}>{post.views} views</span>
        </div>

        <h1 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:800,lineHeight:1.15,marginBottom:'1.5rem'}}>{post.title}</h1>
        <p style={{color:'#888',fontSize:'1.05rem',lineHeight:1.7,marginBottom:'2.5rem',borderBottom:'1px solid #1a1a1a',paddingBottom:'2rem'}}>{post.excerpt}</p>

        {post.author && (
          <div style={{display:'flex',alignItems:'center',gap:'0.8rem',marginBottom:'2.5rem'}}>
            <div style={{width:'36px',height:'36px',background:'linear-gradient(135deg,#f26419,#ff8c42)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'0.9rem',color:'#000'}}>
              {post.author.name?.[0]}
            </div>
            <div>
              <div style={{color:'#fff',fontSize:'0.85rem',fontWeight:600}}>{post.author.name}</div>
              <div style={{color:'#555',fontSize:'0.75rem'}}>{new Date(post.createdAt).toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'})}</div>
            </div>
          </div>
        )}

        <div style={{color:'#ccc',fontSize:'0.95rem',lineHeight:1.9,whiteSpace:'pre-wrap'}} dangerouslySetInnerHTML={{__html: post.content.replace(/\n/g,'<br/>').replace(/#{3} (.*)/g,'<h3 style="font-family:Sora,sans-serif;font-size:1.1rem;font-weight:700;color:#fff;margin:2rem 0 0.75rem">$1</h3>').replace(/## (.*)/g,'<h2 style="font-family:Sora,sans-serif;font-size:1.3rem;font-weight:700;color:#fff;margin:2.5rem 0 1rem">$2</h2>').replace(/# (.*)/g,'<h1 style="font-family:Sora,sans-serif;font-size:1.6rem;font-weight:800;color:#fff;margin:3rem 0 1rem">$1</h1>').replace(/\*\*(.*?)\*\*/g,'<strong style="color:#fff">$1</strong>')}} />

        {post.tags?.length > 0 && (
          <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginTop:'3rem',paddingTop:'2rem',borderTop:'1px solid #1a1a1a'}}>
            {post.tags.map(t => <span key={t} style={{background:'#141414',border:'1px solid #222',borderRadius:'50px',padding:'0.2rem 0.8rem',color:'#555',fontSize:'0.75rem'}}>#{t}</span>)}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
