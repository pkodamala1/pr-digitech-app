import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import { formatDistanceToNow } from 'date-fns';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('');
  const [selected, setSelected] = useState(null);

  const fetchContacts = async () => {
    try {
      const { data } = await API.get(`/contact${filter ? `?status=${filter}` : ''}`);
      setContacts(data.data);
    } catch { toast.error('Failed to load contacts'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchContacts(); }, [filter]);

  const updateStatus = async (id, status) => {
    await API.put(`/contact/${id}`, { status });
    setContacts(cs => cs.map(c => c._id === id ? { ...c, status } : c));
    if (selected?._id === id) setSelected(s => ({ ...s, status }));
    toast.success('Status updated');
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    await API.delete(`/contact/${id}`);
    setContacts(cs => cs.filter(c => c._id !== id));
    if (selected?._id === id) setSelected(null);
    toast.success('Contact deleted');
  };

  return (
    <div style={{ display: 'flex', gap: '1.5rem', height: 'calc(100vh - 130px)', overflow: 'hidden' }}>

      {/* List panel */}
      <div style={{ flex: '0 0 420px', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="admin-page-title" style={{ marginBottom: 0 }}>Contacts</div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ background:'#1c1c1c', border:'1px solid #2a2a2a', color:'#ccc', borderRadius:'8px', padding:'0.4rem 0.8rem', fontSize:'0.8rem', cursor:'pointer' }}>
            <option value="">All</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>

        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {loading ? <div className="admin-loading">Loading...</div> :
            contacts.length === 0 ? <div style={{ color: '#555', textAlign: 'center', padding: '3rem' }}>No contacts found</div> :
            contacts.map(c => (
              <div key={c._id}
                onClick={() => { setSelected(c); if (c.status === 'new') updateStatus(c._id, 'read'); }}
                style={{
                  background: selected?._id === c._id ? 'rgba(242,100,25,0.08)' : '#141414',
                  border: `1px solid ${selected?._id === c._id ? 'rgba(242,100,25,0.3)' : '#1e1e1e'}`,
                  borderRadius: '12px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <strong style={{ color: '#fff', fontSize: '0.88rem' }}>{c.firstName} {c.lastName}</strong>
                  <span className={`badge badge-${c.status}`}>{c.status}</span>
                </div>
                <div style={{ color: '#888', fontSize: '0.78rem' }}>{c.email}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                  <span style={{ color: '#555', fontSize: '0.75rem' }}>{c.service || 'General'}</span>
                  <span style={{ color: '#444', fontSize: '0.72rem' }}>
                    {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {!selected ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#444', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '3rem' }}>📩</div>
            <div>Select a contact to view details</div>
          </div>
        ) : (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {selected.firstName} {selected.lastName}
                </h2>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>{new Date(selected.createdAt).toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['new','read','replied','archived'].map(s => (
                  <button key={s} className="action-btn"
                    style={selected.status === s ? { borderColor:'#f26419', color:'#f26419' } : {}}
                    onClick={() => updateStatus(selected._id, s)}>{s}</button>
                ))}
                <button className="action-btn danger" onClick={() => deleteContact(selected._id)}>Delete</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                ['Email', selected.email],
                ['Phone', selected.phone || '—'],
                ['Company', selected.company || '—'],
                ['Service', selected.service || '—'],
                ['Budget', selected.budget || '—'],
              ].map(([label, value]) => (
                <div key={label} style={{ background: '#1a1a1a', borderRadius: '10px', padding: '0.9rem' }}>
                  <div style={{ color: '#666', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{label}</div>
                  <div style={{ color: '#fff', fontSize: '0.88rem' }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1a1a1a', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ color: '#666', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>Message</div>
              <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: 1.7 }}>{selected.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
