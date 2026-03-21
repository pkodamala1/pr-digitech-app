import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../utils/api';

const CATS = ['All','Digital PR','Brand Strategy','SEO','Social Media','Media Outreach','Content Marketing','AI & Technology'];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [cat, setCat]     = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/blog${cat !== 'All' ? `?category=${cat}` : ''}`)
      .then(r => setPosts(r.data.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [cat]);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '64px' }}>
        <div style={{ padding: '5rem 5rem 3rem', borderBottom: '1px solid #222' }}>
          <div className="section-eyebrow">Our Blog</div>
          <h1 className="section-title">Insights & <span className="hl">Resources</span></h1>
        </div>

        {/* Category filter */}
        <div style={{ padding: '2rem 5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', borderBottom: '1px solid #1a1a1a' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ background: cat === c ? '#f26419' : '#141414', color: cat === c ? '#000' : '#888', border: '1px solid', borderColor: cat === c ? '#f26419' : '#222', borderRadius: '50px', padding: '0.45rem 1.1rem', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, transition: 'all 0.2s' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ padding: '3rem 5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#555', padding: '4rem' }}>Loading posts...</div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#555', padding: '4rem' }}>No posts published yet. Check back soon!</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
              {posts.map(post => (
                <Link key={post._id} to={`/blog/${post.slug}`}
                  style={{ background: '#141414', border: '1px solid #222', borderRadius: '16px', overflow: 'hidden', textDecoration: 'none', transition: 'all 0.25s', display: 'block' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(242,100,25,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ padding: '1.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ background: 'rgba(242,100,25,0.1)', color: '#f26419', fontSize: '0.72rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '50px', border: '1px solid rgba(242,100,25,0.2)' }}>{post.category}</span>
                      <span style={{ color: '#444', fontSize: '0.75rem' }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.4 }}>{post.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>{post.excerpt?.substring(0, 120)}...</p>
                    <div style={{ color: '#f26419', fontSize: '0.82rem', fontWeight: 600 }}>Read more →</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
