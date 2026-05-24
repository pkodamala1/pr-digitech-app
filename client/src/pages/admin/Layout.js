import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const navItems = [
  { path: '/admin',           icon: '📊', label: 'Dashboard',  end: true },
  { path: '/admin/contacts',  icon: '📩', label: 'Contacts' },
  { path: '/admin/blog',      icon: '✍️',  label: 'Blog Posts' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={`admin-layout ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {collapsed ? 'PR' : <><strong>PR</strong> <span>Digitech</span></>}
          </div>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} end={item.end} className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="link-icon">{item.icon}</span>
              {!collapsed && <span className="link-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">{user?.name?.[0] || 'A'}</div>
            {!collapsed && (
              <div className="user-info">
                <div className="user-name">{user?.name}</div>
                <div className="user-role">{user?.role}</div>
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            {collapsed ? '⇤' : '⇤ Logout'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-left">
            <a href="/" target="_blank" className="view-site-btn">← View Site</a>
          </div>
          <div className="topbar-right">
            <span className="topbar-user">👤 {user?.name}</span>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
