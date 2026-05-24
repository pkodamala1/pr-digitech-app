# PR Digitech — Full Stack Web Application

Complete React + Node.js + Express + MongoDB web application for PR Digitech agency.

---

## 🗂️ Project Structure

```
pr-digitech-app/
├── package.json              ← Root scripts (runs both together)
│
├── server/                   ← Node.js + Express Backend
│   ├── index.js              ← Entry point
│   ├── .env                  ← Environment variables (edit this!)
│   ├── models/
│   │   ├── User.js           ← Admin users
│   │   ├── Contact.js        ← Contact form submissions
│   │   ├── Blog.js           ← Blog posts
│   │   └── Service.js        ← Services
│   ├── routes/
│   │   ├── auth.js           ← Login / Auth API
│   │   ├── contact.js        ← Contact form API
│   │   ├── blog.js           ← Blog CRUD API
│   │   ├── admin.js          ← Dashboard stats API
│   │   └── services.js       ← Services API
│   ├── middleware/
│   │   └── auth.js           ← JWT protection
│   └── utils/
│       └── seedAdmin.js      ← Creates default admin on first run
│
└── client/                   ← React Frontend
    └── src/
        ├── App.js            ← Routes
        ├── utils/api.js      ← Axios instance
        ├── context/AuthContext.js
        ├── components/
        │   ├── Navbar.js/.css
        │   └── Footer.js/.css
        └── pages/
            ├── Home.js/.css
            ├── About.js
            ├── Contact.js/.css
            ├── Blog.js
            ├── BlogPost.js
            ├── Portfolio.js/.css
            ├── Pricing.js/.css
            ├── AITechnology.js/.css
            ├── CaseStudies.js/.css
            ├── NotFound.js
            └── admin/
                ├── Login.js/.css
                ├── Layout.js/.css
                ├── Dashboard.js/.css
                ├── Contacts.js
                ├── BlogList.js
                └── BlogEdit.js/.css
```

---

## ⚙️ Prerequisites

Install these before starting:

1. **Node.js** (v18+) → https://nodejs.org
2. **MongoDB** → https://www.mongodb.com/try/download/community
   - OR use **MongoDB Atlas** (free cloud) → https://cloud.mongodb.com
3. **VS Code** → https://code.visualstudio.com
4. **Git** (optional)

---

## 🚀 Setup Steps in VS Code

### Step 1 — Open Project
```
File → Open Folder → select pr-digitech-app
```

### Step 2 — Configure Environment
Open `server/.env` and update:
```env
MONGODB_URI=mongodb://localhost:27017/pr-digitech
# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pr-digitech

JWT_SECRET=change_this_to_a_long_random_string_in_production

ADMIN_EMAIL=admin@prdigitech.in
ADMIN_PASSWORD=Admin@123456
```

### Step 3 — Install All Dependencies
Open VS Code Terminal (`Ctrl + backtick`) and run:
```bash
npm run install-all
```
This installs packages for root + server + client automatically.

### Step 4 — Start Development
```bash
npm run dev
```
This runs BOTH the backend and frontend simultaneously:
- **Frontend** → http://localhost:3000
- **Backend API** → http://localhost:5000/api

---

## 🔐 Admin Panel

URL: **http://localhost:3000/admin/login**

Default credentials (created automatically on first run):
- Email: `admin@prdigitech.in`
- Password: `Admin@123456`

**⚠️ Change these immediately after first login!**

### Admin Features:
- 📊 **Dashboard** — Live stats: contacts, blog posts, users
- 📩 **Contacts** — View, filter, update status of form submissions
- ✍️ **Blog** — Create, edit, publish/unpublish, delete posts
- 🔐 **Auth** — JWT-secured, token stored in localStorage

---

## 🌐 Public Pages

| URL | Page |
|-----|------|
| `/` | Home |
| `/about` | About |
| `/ai-technology` | AI & Technology |
| `/portfolio` | Portfolio |
| `/case-studies` | Case Studies |
| `/blog` | Blog listing |
| `/blog/:slug` | Single blog post |
| `/pricing` | Pricing |
| `/contact` | Contact form |

---

## 📡 API Endpoints

### Public
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/blog` | Get published posts |
| GET | `/api/blog/:slug` | Get single post |

### Protected (requires JWT token)
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/contact` | List all contacts |
| PUT | `/api/contact/:id` | Update contact status |
| DELETE | `/api/contact/:id` | Delete contact |
| GET | `/api/blog/all` | All posts (inc. drafts) |
| POST | `/api/blog` | Create post |
| PUT | `/api/blog/:id` | Update post |
| DELETE | `/api/blog/:id` | Delete post |
| GET | `/api/admin/stats` | Dashboard stats |

---

## 🚢 Deployment

### Deploy Backend (Railway / Render)
1. Push to GitHub
2. Connect repo to Railway.app or Render.com
3. Set environment variables (same as .env)
4. Deploy `server/` directory

### Deploy Frontend (Vercel / Netlify)
1. Update `client/src/utils/api.js` — change baseURL from `/api` to your backend URL
2. Run `cd client && npm run build`
3. Deploy the `client/build/` folder to Vercel/Netlify

### Full Stack on one server
```bash
npm run build  # builds React
# Then serve client/build as static files from Express
```

---

## 🛠️ Useful VS Code Extensions
- **ESLint** — code linting
- **Prettier** — auto formatting  
- **ES7+ React Snippets** — React shortcuts
- **MongoDB for VS Code** — browse your database
- **Thunder Client** — test API endpoints

---

## 📞 Support
Replace placeholder contact details in the app:
- Email: `hello@prdigitech.in`
- Phone: `+91 98765 43210`
- WhatsApp: `https://wa.me/919876543210`
- Location: `Mumbai, India`
