# 📚 Study Nook Server

<div align="center">

A clean and lightweight **Node.js + Express** API for Study Nook—a modern study-room booking platform.  
Powered by MongoDB, JWT authentication, and deployed on Vercel.

[![GitHub](https://img.shields.io/badge/GitHub-Saharier36%2Fstudynook--server-black?logo=github)](https://github.com/Saharier36/studynook-server)
[![Live API](https://img.shields.io/badge/Live%20API-study--nook--server.vercel.app-blue?logo=vercel)](https://study-nook-server-nine.vercel.app/)
[![License](https://img.shields.io/badge/License-ISC-green)]()

</div>

---

## ✨ Features

### 🏠 Room Management

- ✅ Browse all available rooms
- ✅ Search rooms by title
- ✅ Filter rooms by amenities
- ✅ View detailed room information with booking count
- ✅ Create, update, and delete rooms

### 📅 Booking System

- ✅ Create bookings with automatic conflict detection
- ✅ View all bookings
- ✅ Cancel bookings seamlessly

### 👤 Owner Listings

- ✅ Fetch listings created by authenticated users
- ✅ Manage own properties

### 🔐 Security & Authentication

- ✅ JWT verification using remote JWKS
- ✅ Protected routes for private actions
- ✅ CORS configured for secure cross-origin requests

### 🚀 Enterprise-Ready

- ✅ Serverless deployment on Vercel
- ✅ Production-grade MongoDB integration
- ✅ Environment-based configuration

---

## 🛠️ Tech Stack

| Category           | Technology          |
| ------------------ | ------------------- |
| **Runtime**        | Node.js 18+         |
| **Framework**      | Express.js          |
| **Database**       | MongoDB             |
| **Authentication** | JWT + JWKS          |
| **Middleware**     | CORS, dotenv        |
| **Deployment**     | Vercel (Serverless) |

---

## 📁 Project Structure

```
study-nook-server/
├── 📄 index.js           # Main Express server & API routes
├── 📝 package.json       # Dependencies & scripts
├── ⚙️  vercel.json       # Vercel deployment configuration
└── 📖 README.md          # Project documentation
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **MongoDB** database connection
- Environment variables properly configured

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
CLIENT_URL=http://localhost:3000
```

**Variable Descriptions:**

- `PORT` - Server port (default: `5000`)
- `MONGODB_URI` - MongoDB connection string
- `CLIENT_URL` - Frontend URL for JWKS token verification

### 3️⃣ Run Development Server

```bash
npm run dev
```

The server will be available at:

```
🌐 http://localhost:5000
```

---

## ⚙️ Environment Variables Reference

| Variable      | Type   | Description                        | Example                 |
| ------------- | ------ | ---------------------------------- | ----------------------- |
| `PORT`        | Number | Server listening port              | `5000`                  |
| `MONGODB_URI` | String | MongoDB connection string          | `mongodb+srv://...`     |
| `CLIENT_URL`  | String | Frontend URL for JWKS verification | `http://localhost:3000` |

---

## 📚 API Endpoints

### Rooms

- `GET /rooms` - Get all rooms
- `GET /rooms/:id` - Get room details
- `POST /rooms` - Create new room (authenticated)
- `PATCH /rooms/:id` - Update room (authenticated)
- `DELETE /rooms/:id` - Delete room (authenticated)

### Bookings

- `GET /bookings` - Get all bookings (authenticated)
- `POST /bookings` - Create booking (authenticated)
- `DELETE /bookings/:id` - Cancel booking (authenticated)

### Owner Listings

- `GET /listings` - Get user's listings (authenticated)

---

## 🔗 Links

- 🌍 **Live API:** [https://study-nook-server-nine.vercel.app/](https://study-nook-server-nine.vercel.app/)
- 💻 **GitHub Repository:** [https://github.com/Saharier36/studynook-server](https://github.com/Saharier36/studynook-server)

---

## 📦 Dependencies

```json
{
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jose-cjs": "^6.2.3",
  "mongodb": "^7.2.0"
}
```

---

## 📝 License

ISC License - See LICENSE file for details

---

<div align="center">

**Made with ❤️ for efficient study room booking**

</div>

## 📡 API Endpoints

### Health Check

#### `GET /`

Returns a simple server status message.

**Response**

```text
Server is running! Welcome to Study Nook.
```

---

### Rooms

#### `GET /rooms`

Get all rooms.

**Query params**

- `search` — search by room title
- `amenities` — comma-separated list of amenities

**Examples**

- `/rooms?search=quiet`
- `/rooms?amenities=wifi,projector`

#### `GET /rooms/:id`

Get a single room by ID, including booking count.

#### `GET /featured-rooms`

Get up to 6 featured rooms.

#### `POST /rooms`

Create a room. **Protected**

#### `PATCH /rooms/:id`

Update a room. **Protected**

#### `DELETE /rooms/:id`

Delete a room. **Protected**

---

### Bookings

#### `POST /booking`

Create a booking. **Protected**

Checks for time-slot conflicts before saving.

#### `GET /bookings`

Get bookings.

**Query params**

- `userId` — filter by user

#### `PATCH /booking/:id/cancel`

Cancel a booking. **Protected**

#### `GET /my-listings`

Get listings created by the authenticated user. **Protected**

---

## 🔒 Protected Routes

These routes require a Bearer token in the `Authorization` header:

- `POST /rooms`
- `PATCH /rooms/:id`
- `DELETE /rooms/:id`
- `POST /booking`
- `PATCH /booking/:id/cancel`
- `GET /my-listings`

**Header example**

```http
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🌍 Deployment

The project is ready for Vercel deployment with the included `vercel.json`.

### Build on Vercel

- Entry file: `index.js`
- Serverless handler: `@vercel/node`

---

## 📝 Notes

- MongoDB connection is defined in `index.js`
- Collections used:
  - `rooms`
  - `bookings`
  - `user`
- Booking conflict validation prevents overlapping confirmed bookings for the same room and date
- Some routes depend on the authenticated user ID being available in the request body/query as implemented in the server
