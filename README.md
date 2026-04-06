# 🏦 Bank Admin Dashboard

A full-featured **web admin panel** built for **The Chandrapur District Central Co-operative Bank**, designed to manage the bank's public website content, staff, branches, documents, and more — all from a clean, modern interface.

> **Status:** Frontend complete ✅ · Backend in progress 🔧

---

## 📸 Preview

<img width="1366" height="622" alt="image" src="https://github.com/user-attachments/assets/393e3131-69bd-4dc8-818a-4eeb7db6dc32" />


---

## ✨ Features

### 🌐 Website Management
- **Popup Manager** — create, publish, and manage homepage popups with image upload
- **Slider Images** — masonry gallery with drag-to-reorder, show/hide toggle
- **Gallery** — album-based photo gallery with nested image management
- **Custom Links** — manage external links with sequence ordering and expiry dates
- **Custom Pages** — rich text editor (TinyMCE) with live iframe preview, section templates, Draft/Publish workflow

### 🏛️ Bank Management
- **Personal Details** — admin profile with inline field editing and photo upload
- **Bank Board** — Director and Management team with photo cards, grouped view
- **Documents** — bank document management
- **Branches** — full CRUD for branch locations with IFSC, phone, image, locker facility
- **Maps** — Google Maps embed management per branch with live preview

### 📣 Content
- **News & Alerts** — TV-style scrolling news ticker with expiry tracking, Draft/Active toggle
- **Unclaimed Accounts** — Excel file upload with live data table, pagination, and search

### ⚙️ Utility
- **Users** — user management with role badges (Admin / Operator / Viewer), status toggle
- **Activity Log** — paginated audit log with before/after diff viewer modal

### 🔐 Authentication
- Login page with Formik + Yup validation
- Session stored in `localStorage` with mock user system
- Auth guard on all dashboard routes
- Auto-redirect on session check

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Bootstrap 5 + custom CSS |
| Forms | Formik + Yup |
| Icons | Lucide React |
| Rich Text | TinyMCE |
| Excel Parsing | SheetJS (xlsx) |
| Auth | localStorage session (mock) |

---

## 📁 Project Structure

```
app/
├── dashboard/
│   ├── layout.tsx              # Protected layout with SideNav + Header
│   ├── page.tsx                # Dashboard home (analytics)
│   ├── popup/
│   ├── slider-image/
│   ├── gallery/
│   ├── custom-link/
│   ├── custom-page/
│   ├── personal-details/
│   ├── bank-board/
│   ├── bank-document/
│   ├── branches/
│   ├── maps/
│   ├── news/
│   ├── unclaim-account/
│   ├── users/
│   └── activity-log/
├── login/
│   └── page.tsx
├── Components/
│   ├── SideNav.tsx
│   ├── SideNavMobile.tsx
│   ├── Header.tsx
│   ├── AnalayticCard.tsx
│   ├── SearchInput.tsx
│   ├── CustomPage/
│   │   ├── ActivePage.tsx
│   │   └── Modal.tsx
│   ├── PopUp/
│   │   ├── Modal.tsx
│   │   └── PopupCard.tsx
│   └── Setting/
│       ├── SettingCard.tsx
│       └── SettingModal.tsx
├── lib/
│   ├── auth.ts
│   ├── mock.ts
│   └── session.ts
└── page.tsx                    # Root redirect
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/bank-admin-dashboard.git
cd bank-admin-dashboard

# Install dependencies
npm install

# Add TinyMCE API key (free at tiny.cloud)
echo "NEXT_PUBLIC_TINYMCE_API_KEY=your_key_here" > .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials

| Email | Password | Role |
|---|---|---|
| `a@a.com` | `123` | Administrator |

---

## 🔜 Roadmap

- [ ] **Python FastAPI backend** — replace mock data with real REST API
- [ ] **PostgreSQL database** — persistent storage for all modules
- [ ] **JWT authentication** — replace localStorage session with secure tokens
- [ ] **File upload API** — S3/local storage for images and documents
- [ ] **Role-based access control** — restrict pages by user role
- [ ] **Activity logging** — auto-log all CRUD operations to backend

---

## 🤝 Contributing

Pull requests are welcome. For major changes please open an issue first.

---

## 📄 License

MIT © 2026 Soft-Tech Solutions
