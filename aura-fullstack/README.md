# Aura - Project Run Instructions

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## 1. Setup Environment Variables
Create a `.env` file in `aura-fullstack/server`:
```
MONGO_URI=mongodb://localhost:27017/aura_db
JWT_SECRET=aura_super_secret_key_change_me
PORT=5000
CLIENT_URL=http://localhost:5173
```

## 2. Install Dependencies
**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

## 3. Seed Database
Populate the database with sample products and users (Admin & User).
```bash
cd server
node seeds/seed.js
```
*Note: Make sure MongoDB is running.*

## 4. Run Development Servers
**Server (Backend):**
```bash
cd server
npm run dev
```
(Runs on port 5000)

**Client (Frontend):**
```bash
cd client
npm run dev
```
(Runs on port 5173)

## 5. Login Credentials (Seeded)
- **Admin**: `admin@aura.com` / `admin123`
- **User**: `john@example.com` / `user123`

## 6. Project Structure
- `/client`: React + Vite Frontend
- `/server`: Node + Express Backend
