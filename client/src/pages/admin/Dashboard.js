import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { formatDistanceToNow } from 'date-fns';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/stats')
      .then(r => setStats(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="admin-page-title">Dashboard</div>
      <div className="admin-page-sub">Welcome back! Here's what's happening.</div>

      {/* Stat cards */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon">📩</div>
          <div className="stat-body">
            <div className="stat-value">{stats?.contacts?.total ?? 0}</div>
            <div className="stat-label">Total Contacts</div>
          </div>
          {stats?.contacts?.new > 0 && <div className="stat-badge">{stats.contacts.new} new</div>}
        </div>
        <div className="stat-card">
          <div className="stat-icon">✍️</div>
          <div className="stat-body">
            <div className="stat-value">{stats?.blog?.published ?? 0}</div>
            <div className="stat-label">Published Posts</div>
          </div>
          {stats?.blog?.drafts > 0 && <div className="stat-badge draft">{stats.blog.drafts} drafts</div>}
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-body">
            <div className="stat-value">{stats?.blog?.total ?? 0}</div>
            <div className="stat-label">Total Blog Posts</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-body">
            <div className="stat-value">{stats?.users?.total ?? 0}</div>
            <div className="stat-label">Admin Users</div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-cards">
          <Link to="/admin/blog/new" className="action-card">
            <span>✍️</span><strong>New Blog Post</strong><p>Write and publish content</p>
          </Link>
          <Link to="/admin/contacts" className="action-card">
            <span>📩</span><strong>View Contacts</strong>
            <p>{stats?.contacts?.new > 0 ? `${stats.contacts.new} unread messages` : 'All caught up!'}</p>
          </Link>
          <a href="/" target="_blank" className="action-card">
            <span>🌐</span><strong>View Website</strong><p>See the live site</p>
          </a>
        </div>
      </div>

      {/* Recent contacts */}
      {stats?.recentContacts?.length > 0 && (
        <div className="admin-card" style={{marginTop:'2rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.2rem'}}>
            <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'1rem',fontWeight:'700'}}>Recent Enquiries</h3>
            <Link to="/admin/contacts" style={{color:'#f26419',fontSize:'0.82rem',textDecoration:'none'}}>View all →</Link>
          </div>
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Time</th><th>Status</th></tr></thead>
            <tbody>
              {stats.recentContacts.map(c => (
                <tr key={c._id}>
                  <td style={{color:'#fff',fontWeight:600}}>{c.firstName} {c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.service || '—'}</td>
                  <td style={{color:'#555'}}>{formatDistanceToNow(new Date(c.createdAt), {addSuffix:true})}</td>
                  <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
