import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import { formatDistanceToNow } from 'date-fns';

export default function AdminBlogList() {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get('/blog/all');
      setPosts(data.data);
    } catch { toast.error('Failed to load posts'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    await API.delete(`/blog/${id}`);
    setPosts(ps => ps.filter(p => p._id !== id));
    toast.success('Post deleted');
  };

  const toggleStatus = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    await API.put(`/blog/${post._id}`, { status: newStatus });
    setPosts(ps => ps.map(p => p._id === post._id ? { ...p, status: newStatus } : p));
    toast.success(`Post ${newStatus}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div className="admin-page-title">Blog Posts</div>
          <div className="admin-page-sub">{posts.length} total posts</div>
        </div>
        <Link to="/admin/blog/new" className="btn-orange" style={{ fontSize: '0.88rem', padding: '0.6rem 1.4rem' }}>
          + New Post
        </Link>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading posts...</div> :
          posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#555' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
              <p>No blog posts yet. <Link to="/admin/blog/new" style={{ color: '#f26419' }}>Create your first post →</Link></p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post._id}>
                    <td>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.2rem' }}>{post.title}</div>
                      <div style={{ color: '#555', fontSize: '0.75rem' }}>/{post.slug}</div>
                    </td>
                    <td style={{ color: '#888' }}>{post.category}</td>
                    <td><span className={`badge badge-${post.status}`}>{post.status}</span></td>
                    <td style={{ color: '#888' }}>{post.views}</td>
                    <td style={{ color: '#555', fontSize: '0.78rem' }}>
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Link to={`/admin/blog/edit/${post._id}`} className="action-btn">Edit</Link>
                        <button className="action-btn" onClick={() => toggleStatus(post)}>
                          {post.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button className="action-btn danger" onClick={() => deletePost(post._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  );
}
