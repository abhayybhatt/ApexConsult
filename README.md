# ApexConsult - Full Stack Consulting Agency Website

A fully functional Full Stack application built using the **MERN Stack** (MongoDB, Express, React, Node.js). This project consists of a public-facing Landing Page for a consulting agency and a secure Admin Dashboard for managing content, inquiries, and subscriptions.

## 🚀 Live Demo

- **Frontend (Vercel):** [INSERT_YOUR_VERCEL_LINK_HERE]
- **Backend (Render):** [INSERT_YOUR_RENDER_LINK_HERE]

---

## ✨ Features

### 🌍 Public Landing Page
- **Dynamic Projects Section:** Displays portfolio projects fetched directly from the database.
- **Testimonials:** "Happy Clients" section showcasing dynamic client feedback.
- **Contact Form:** Functional form that saves user inquiries to the database.
- **Newsletter:** Email subscription feature with duplicate email prevention.
- **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile.

### 🛡️ Admin Panel (Protected)
- **Authentication:** Secure login guard to prevent unauthorized access.
- **Project Management:** Add new projects with titles, descriptions, and images.
- **Client Management:** Add new client testimonials.
- **Image Cropping (Bonus):** Integrated image cropper to ensure images are saved in the correct aspect ratio ($450 \times 350$) before uploading.
- **Data Dashboard:** View all Contact Form submissions and Newsletter subscribers in real-time.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), CSS3 (Modern Flexbox/Grid), Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Image Handling:** Base64 Encoding with React Easy Crop
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## ⚙️ Installation & Local Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/ApexConsult.git](https://github.com/YOUR_USERNAME/ApexConsult.git)
cd ApexConsult
```

### 2. Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```

Create a .env file in the server folder and add your MongoDB connection string:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

Start the Backend server:
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the client folder, and install dependencies:
```bash
cd ../client
npm install
```
Start the React Frontend:
```bash
npm run dev
# App runs on http://localhost:5173
```

### 🔑 Admin Credentials (For Testing)

To access the Admin Dashboard locally or on the live site:

- **Login URL:** `/login`
- **Username:** `admin`
- **Password:** `admin123`

### API Endpoints

| Method | Endpoint        | Description                     |
|--------|-----------------|---------------------------------|
| GET    | /api/projects   | Fetch all projects              |
| POST   | /api/projects   | Add a new project               |
| GET    | /api/clients    | Fetch all clients               |
| POST   | /api/clients    | Add a new client                |
| POST   | /api/contact    | Submit a contact form           |
| GET    | /api/contact    | Get all contact messages (Admin)|
| POST   | /api/subscribe  | Subscribe to newsletter         |
| GET    | /api/subscribe  | Get all subscribers (Admin)     |

## 📂 Project Structure

ApexConsult/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/            # Axios instance
│   │   ├── components/     # Reusable components (ImageCropper, etc.)
│   │   ├── pages/          # LandingPage, AdminPanel, Login
│   │   ├── App.jsx         # Routing & Auth Guard
│   │   └── main.jsx        # Entry point
│   └── ...
├── server/                 # Backend (Node + Express)
│   ├── controllers/        # Logic for DB operations
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Route definitions
│   ├── index.js            # Server entry point
│   └── ...
└── README.md

## 👤 Author
Developed by Abhay Bhatt.