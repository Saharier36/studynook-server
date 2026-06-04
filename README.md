# 🛠️ StudyNook Server
> A clean and lightweight Node.js + Express API for StudyNook — a modern study-room booking platform.

[![Live API](https://img.shields.io/badge/🚀_Live_API-study--nook--server.vercel.app-0070F3?style=for-the-badge)](https://study-nook-server-nine.vercel.app/)
[![Server Source](https://img.shields.io/badge/🔗_Server_Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Saharier36/studynook-server)
[![Client Source](https://img.shields.io/badge/🔗_Client_Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Saharier36/studynook-client)
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-studynook--zeta.vercel.app-1D9E75?style=for-the-badge)](https://studynook-zeta.vercel.app/)

---

## ✨ What is StudyNook Server?
StudyNook Server is the backend API powering the StudyNook platform. It handles room listings, booking management, conflict detection, and JWT-based authentication — all deployed serverlessly on Vercel with MongoDB as the database.

---

## 🔗 Project Links

| Type | Link |
|------|------|
| 🚀 Live API Server | [study-nook-server-nine.vercel.app](https://study-nook-server-nine.vercel.app/) |
| 🌐 Live Client | [studynook-zeta.vercel.app](https://studynook-zeta.vercel.app/) |
| 🛠️ Server Repository | [github.com/Saharier36/studynook-server](https://github.com/Saharier36/studynook-server) |
| 💻 Client Repository | [github.com/Saharier36/studynook-client](https://github.com/Saharier36/studynook-client) |

---

## 🚀 Highlights

| Feature | Description |
|--------|-------------|
| 🏠 Room Management | Browse, search, filter, create, update, and delete rooms |
| 📅 Booking System | Create bookings with automatic conflict detection |
| 🔐 Authentication | JWT verification using remote JWKS |
| 👤 Owner Listings | Fetch and manage listings by authenticated users |
| 🛡️ Security | Protected routes with CORS configured for secure cross-origin requests |
| ☁️ Serverless | Production-grade deployment on Vercel with MongoDB integration |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB |
| Authentication | JWT + JWKS |
| Middleware | CORS, dotenv |
| Deployment | Vercel (Serverless) |

---

## 📚 API Endpoints

### 🏠 Rooms

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| `GET` | `/rooms` | Get all rooms (supports `search` & `amenities` query params) | Public |
| `GET` | `/rooms/:id` | Get single room with booking count | Public |
| `GET` | `/featured-rooms` | Get up to 6 featured rooms | Public |
| `POST` | `/rooms` | Create a new room | 🔒 Protected |
| `PATCH` | `/rooms/:id` | Update a room | 🔒 Protected |
| `DELETE` | `/rooms/:id` | Delete a room | 🔒 Protected |

### 📅 Bookings

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| `POST` | `/booking` | Create a booking (with conflict detection) | 🔒 Protected |
| `GET` | `/bookings` | Get bookings (supports `userId` query param) | Public |
| `PATCH` | `/booking/:id/cancel` | Cancel a booking | 🔒 Protected |

### 👤 Owner

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| `GET` | `/my-listings` | Get listings by the authenticated user | 🔒 Protected |

### ❤️ Health Check

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Server status check |

---

## 🔒 Protected Routes

All protected routes require a Bearer token in the `Authorization` header:

```http
Authorization: Bearer YOUR_TOKEN_HERE
```

Protected routes: `POST /rooms`, `PATCH /rooms/:id`, `DELETE /rooms/:id`, `POST /booking`, `PATCH /booking/:id/cancel`, `GET /my-listings`

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
CLIENT_URL=http://localhost:3000
```

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `PORT` | Number | Server listening port | `5000` |
| `MONGODB_URI` | String | MongoDB connection string | `mongodb+srv://...` |
| `CLIENT_URL` | String | Frontend URL for JWKS verification | `http://localhost:3000` |

---

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Saharier36/studynook-server
cd studynook-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Then open: [http://localhost:5000](http://localhost:5000)

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm start` | Run production server |

---

## 📁 Project Structure

```
study-nook-server/
├── index.js           # Main Express server & all API routes
├── package.json       # Dependencies & scripts
├── vercel.json        # Vercel deployment configuration
└── README.md          # Project documentation
```

---

## 📦 Dependencies

| Package | Version |
|---------|---------|
| express | ^5.2.1 |
| mongodb | ^7.2.0 |
| cors | ^2.8.6 |
| dotenv | ^17.4.2 |
| jose-cjs | ^6.2.3 |

---

## 🌍 Deployment

The project is ready for Vercel deployment with the included `vercel.json`.

- Entry file: `index.js`
- Serverless handler: `@vercel/node`
- Collections used: `rooms`, `bookings`, `user`

---

> StudyNook Server is built for reliability — with conflict-safe bookings, secure JWT auth, and a clean REST API design.
