import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public pages
import Home          from './pages/Home';
import About         from './pages/About';
import Contact       from './pages/Contact';
import Blog          from './pages/Blog';
import BlogPost      from './pages/BlogPost';
import Portfolio     from './pages/Portfolio';
import Pricing       from './pages/Pricing';
import AITechnology  from './pages/AITechnology';
import CaseStudies   from './pages/CaseStudies';
import NewsletterPopup from './components/NewsletterPopup';
import NotFound      from './pages/NotFound';

// Admin pages
import AdminLogin    from './pages/admin/Login';
import AdminLayout   from './pages/admin/Layout';
import Dashboard     from './pages/admin/Dashboard';
import AdminContacts from './pages/admin/Contacts';
import AdminBlog     from './pages/admin/BlogList';
import AdminBlogEdit from './pages/admin/BlogEdit';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0a0a0a',color:'#f26419',fontFamily:'Sora,sans-serif',fontSize:'1.2rem' }}>Loading...</div>;
  return user ? children : <Navigate to="/admin/login" replace />;
};

// Custom cursor
const Cursor = () => {
  const cursorRef   = useRef(null);
  const followerRef = useRef(null);
  useEffect(() => {
    let fx = 0, fy = 0, mx = 0, my = 0;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) { cursorRef.current.style.left = mx + 'px'; cursorRef.current.style.top = my + 'px'; }
    };
    const loop = () => {
      fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
      if (followerRef.current) { followerRef.current.style.left = fx + 'px'; followerRef.current.style.top = fy + 'px'; }
      requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', move);
    loop();
    return () => document.removeEventListener('mousemove', move);
  }, []);
  return (
    <>
      <div className="cursor"    ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
};

function AppRoutes() {
  return (
    <>
      <Routes>
      {/* Public */}
      <Route path="/"               element={<Home />} />
      <Route path="/about"          element={<About />} />
      <Route path="/contact"        element={<Contact />} />
      <Route path="/blog"           element={<Blog />} />
      <Route path="/blog/:slug"     element={<BlogPost />} />
      <Route path="/portfolio"      element={<Portfolio />} />
      <Route path="/pricing"        element={<Pricing />} />
      <Route path="/ai-technology"  element={<AITechnology />} />
      <Route path="/case-studies"   element={<CaseStudies />} />

      {/* Admin auth */}
      <Route path="/admin/login"    element={<AdminLogin />} />

      {/* Admin protected */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index                  element={<Dashboard />} />
        <Route path="contacts"        element={<AdminContacts />} />
        <Route path="blog"            element={<AdminBlog />} />
        <Route path="blog/new"        element={<AdminBlogEdit />} />
        <Route path="blog/edit/:id"   element={<AdminBlogEdit />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
      <NewsletterPopup />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Cursor />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#141414', color: '#fff', border: '1px solid #222' },
            success: { iconTheme: { primary: '#f26419', secondary: '#000' } },
          }}
        />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
