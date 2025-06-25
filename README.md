# MERN Crash Course

This is a full-stack web application built with the **MERN** stack — **MongoDB**, **Express.js**, **React**, and **Node.js** — combined with **TypeScript**, **Zustand**, **Vite**, and **Chakra UI** on the frontend. The application allows users to perform CRUD operations on a list of products and includes an additional feature to discover and select images from the **Unsplash API**.

## 🌱 About the Project

This project was inspired by the [MERN Stack Tutorial with Deployment – Beginner's Course](https://youtu.be/O3BUHwfHf84?si=G8u5dtwF2t53PTtB) by [freeCodeCamp.org](http://freecodecamp.org/). While the video provided a solid foundation for learning the MERN stack, I extended it further to implement clean code and architectural patterns in React, integrating my own ideas and learnings into the development.

The project is structured into two main folders within a single repository:

- `backend/` for building RESTful APIs with Express and MongoDB
- `frontend/` for the client-side application using React + TypeScript

Though not a strict monolithic or monorepo architecture, the structure is modular and manageable for both learning and scaling.

## 🔗 Live Demo

You can try the live version of this app here:  
👉 [https://mern-crash-course-dfkw.onrender.com](https://mern-crash-course-dfkw.onrender.com)

## 🎯 Key Features

- ✅ Create, read, update, and delete products
- ✅ Responsive UI with light and dark theme
- ✅ Upload product with name, price, and optional image URL
- ✅ Image discovery via Unsplash API integration
- ✅ Global state management using Zustand
- ✅ UI development with Chakra UI
- ✅ Hot reload during backend development using Nodemon
- ✅ Clean architecture and reusable components on the frontend

## 🛠️ Tech Stack

### Backend
- **Express.js** – RESTful API server
- **MongoDB Atlas** – Cloud-based NoSQL database
- **Mongoose** – Object modeling for MongoDB
- **Nodemon** – Dev utility for live server reloads

### Frontend
- **React + TypeScript** – Component-based UI development
- **Vite** – Fast frontend bundler and dev server
- **Zustand** – Lightweight global state management
- **Chakra UI** – Accessible and customizable component library
- **React Router DOM** – SPA routing
- **Unsplash API** – Fetch and display images related to products

## 📁 Project Structure

```bash
mern-crash-course/
│
├── backend/
│   ├── config/           # MongoDB configuration
│   ├── controllers/      # Business logic for APIs
│   ├── models/           # Mongoose data models
│   ├── routes/           # API route definitions
│   └── server.js         # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # General utilities like API clients or fetch wrappers
│   │   ├── pages/        # Application pages (routing targets)
│   │   ├── services/     # External API communication
│   │   ├── stores/       # Zustand store and API logic
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Helper functions (e.g., formatting, debouncing)
│   └── vite.config.ts    # Vite configuration
│
├── .env.example          # Backend environment variables template
├── frontend/.env.example # Frontend environment variables template
├── package.json          # Root project configuration
└── README.md
```

## 🧠 My Learning Experience

As a frontend engineer aiming to strengthen my full-stack skills, I took this project as an opportunity to go beyond just following a tutorial. I explored integrating clean code principles, practiced component abstractions, and applied architectural thinking on the frontend. Using tools like Zustand and Chakra UI helped me discover modern and efficient ways to manage state and build consistent UIs.

This project not only helped reinforce my understanding of TypeScript and React hooks, but also gave me hands-on experience with: 
- Practice backend API creation using Express and MongoDB
- Understand full-stack data flow
- Apply clean code best practices
- Experiment with UI design and component abstraction using Chakra UI
- Learn to integrate external APIs (Unsplash)

## ⚙️ Getting Started

### Prerequisites

- Node.js (>= 18.x)
- MongoDB Atlas account
- Unsplash Developer account for access key

### Clone the Repo

```bash
git clone https://github.com/shagaranasution/mern-crash-course
cd mern-crash-course
```

### Setup Environment Variables
Create a `.env` file in the root and frontend folders using the .env.example files as templates.

```bash
# .env
PORT=3000
MONGO_URI=your_mongodb_connection_string

# frontend/.env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

### Install Dependencies

```bash
# Install root and backend dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### Run in Development

```bash
# Start backend server
npm run dev

# In another terminal, start frontend dev server
cd frontend
npm run dev
```

The app will be running on:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🙏 Acknowledgements

- [freeCodeCamp.org](https://www.freecodecamp.org) – for the foundational MERN crash course tutorial  
- [Unsplash](https://unsplash.com/developers) – for the beautiful public photo API  
- The developers behind **Chakra UI**, **Zustand**, and **Vite** – for their powerful tools

> _This project serves as a milestone in my journey to become a better full-stack developer and to write clean, scalable, and maintainable code. I hope this can be useful for others on a similar path._ ✨

