import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import './BlogEdit.css';

const CATEGORIES = ['Digital PR','Brand Strategy','SEO','Social Media','Media Outreach','Content Marketing','AI & Technology','Case Study'];

const emptyForm = {
  title: '', excerpt: '', content: '', category: 'Digital PR',
  tags: '', status: 'draft', featured: false,
  metaTitle: '', metaDesc: '',
};

export default function AdminBlogEdit() {
  const { id }         = useParams();
  const navigate       = useNavigate();
  const [form, setForm]= useState(emptyForm);
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const isEdit = !!id;

  useEffect(() => {
    if (!id) return;
    API.get(`/blog/all`)
      .then(r => {
        const post = r.data.data.find(p => p._id === id);
        if (post) setForm({ ...post, tags: post.tags?.join(', ') || '' });
      })
      .finally(() => setFetching(false));
  }, [id]);

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSave = async (status) => {
    if (!form.title || !form.excerpt || !form.content) {
      toast.error('Title, excerpt and content are required');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        status,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      };
      if (isEdit) {
        await API.put(`/blog/${id}`, payload);
        toast.success('Post updated!');
      } else {
        await API.post('/blog', payload);
        toast.success('Post created!');
      }
      navigate('/admin/blog');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="admin-loading">Loading post...</div>;

  return (
    <div className="blog-edit">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div className="admin-page-title">{isEdit ? 'Edit Post' : 'New Blog Post'}</div>
          <div className="admin-page-sub">{isEdit ? 'Update your blog post' : 'Create a new article'}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="action-btn" onClick={() => navigate('/admin/blog')} disabled={loading}>Cancel</button>
          <button className="action-btn" onClick={() => onSave('draft')} disabled={loading}>Save Draft</button>
          <button className="btn-orange" style={{ fontSize: '0.88rem', padding: '0.6rem 1.4rem', cursor: 'pointer' }}
            onClick={() => onSave('published')} disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update & Publish' : 'Publish →'}
          </button>
        </div>
      </div>

      <div className="blog-edit-grid">
        {/* Main content */}
        <div className="blog-edit-main">
          <div className="edit-field">
            <label>Post Title *</label>
            <input name="title" value={form.title} onChange={onChange}
              placeholder="Enter a compelling title..." className="edit-input title-input" />
          </div>
          <div className="edit-field">
            <label>Excerpt * <span style={{color:'#555',fontWeight:400}}>({form.excerpt.length}/300)</span></label>
            <textarea name="excerpt" value={form.excerpt} onChange={onChange} rows={3}
              placeholder="Write a short summary that appears in listings..." className="edit-textarea" maxLength={300} />
          </div>
          <div className="edit-field">
            <label>Content * <span style={{color:'#555',fontWeight:400,fontSize:'0.72rem'}}>(Markdown supported)</span></label>
            <textarea name="content" value={form.content} onChange={onChange} rows={20}
              placeholder="Write your full blog post content here...

Use markdown:
# Heading 1
## Heading 2
**bold** _italic_
- bullet list
1. numbered list" className="edit-textarea content-area" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="blog-edit-sidebar">
          <div className="admin-card sidebar-card">
            <h4>Post Settings</h4>
            <div className="edit-field">
              <label>Category</label>
              <select name="category" value={form.category} onChange={onChange} className="edit-select">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="edit-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={onChange} className="edit-select">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="edit-field">
              <label>Tags <span style={{color:'#555',fontWeight:400}}>(comma separated)</span></label>
              <input name="tags" value={form.tags} onChange={onChange}
                placeholder="seo, pr, branding" className="edit-input" />
            </div>
            <div className="edit-check">
              <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={onChange} />
              <label htmlFor="featured">⭐ Featured post</label>
            </div>
          </div>

          <div className="admin-card sidebar-card">
            <h4>SEO Settings</h4>
            <div className="edit-field">
              <label>Meta Title</label>
              <input name="metaTitle" value={form.metaTitle} onChange={onChange}
                placeholder="SEO title (default: post title)" className="edit-input" />
            </div>
            <div className="edit-field">
              <label>Meta Description</label>
              <textarea name="metaDesc" value={form.metaDesc} onChange={onChange} rows={3}
                placeholder="SEO description..." className="edit-textarea" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
