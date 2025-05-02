# 🌿 GardenGuru

GardenGuru is your all-in-one intelligent gardening assistant. Whether you're a beginner plant parent or a seasoned gardener, GardenGuru helps you discover, manage, and care for your plants effortlessly. 🌱✨

---

## 🧠 Problem Statement

Many people face challenges in gardening, such as:

- Difficulty in selecting the right plants for their environment (e.g., indoor, outdoor, low sunlight).
- Lack of access to reliable and detailed plant care information.
- Forgetting to water or change soil at the right time.
- Limited access to a community for support and knowledge sharing.

---

## 🌟 Solution

GardenGuru solves this by combining **AI**, **automation**, and **community** to offer a smart plant care experience.

---

## 🚀 Features

### 1. 🌿 **Plant Discovery**
- Search and filter plants by type (indoor/outdoor), light requirements, and more.
- Powered by the [Perenual Plant API](https://perenual.com/docs/api).

### 2. 📅 **Personal Garden**
- Add plants to your personal virtual garden.
- Get **automatic watering** and **soil change reminders**.
- Track your plant’s history and care routines.

### 3. 🤖 **AI Assistant**
- Powered by **Google Gemini API**, ask anything about plant care or diseases.
- Upload plant images to get disease diagnosis and treatment advice.
  
### 4. 🌤️ **Weather Integration**
- Integrated with **WeatherAPI** to suggest plants based on average temperature through the year to decide hariness zone

### 5. 🌍 **Community Hub**
- Join interest-based groups.
- Post updates, ask questions, and engage in discussions.
- Like, comment, and connect with fellow plant lovers.

---

## 🛠️ Technologies & Tools Used

| Tech / API | Purpose |
|------------|---------|
| **React.js** | Frontend UI |
| **Tailwind CSS** | Styling |
| **Node.js + Express.js** | Backend Server |
| **MongoDB + Mongoose** | Database |
| **Redux Toolkit** | State Management |
| **Cloudinary** | Image Uploads |
| **Perenual Plant API** | Plant data and search |
| **Google Gemini API** | AI-based plant assistant |
| **WeatherAPI** | Real-time weather data |

---

## 🧩 Implementation Overview

### Backend:
- Built with Node.js and Express.
- Authentication and user management with JWT.
- MongoDB for storing users, plants, reminders, and community data.
- Scheduled reminders using custom logic based on plant metadata.

### Frontend:
- React with Redux Toolkit for global state (auth, garden, AI responses).
- Tailwind CSS for responsive and modern UI.
- Image upload handled through Cloudinary.
- AI queries routed through a Node backend using Google Gemini.

---

![Screenshot 2025-05-02 100208](https://github.com/user-attachments/assets/4bd0442a-7e1a-4eea-be26-55c5e70d27e3)

## ⚙️ Setup Instructions

### Clone the repo
```bash
git clone https://github.com/gautamankit31/gardenguru.git
cd gardenguru 
