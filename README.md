# 🏡 Guest House Management App

A web application for managing guest houses, rooms, and reservations.
This project allows different users (clients, owners, and admins) to interact with the system based on their roles.

---

## 🚀 Live Demo

*(Add your deployed link here — Vercel / Netlify)*

---

## ✨ Features

### 👤 Authentication

* User registration (Client & Owner)
* Login system with validation
* Role-based access (Client / Owner / Admin)

### 🏠 Guest Houses Management (Owner)

* Add, edit, delete guest houses
* Assign houses to owners
* Manage up to 5 rooms per house

### 🛏️ Rooms Management

* Add rooms with:

  * Name
  * Capacity
  * Description
  * Price
* Link rooms to specific houses

### 📅 Reservation System (Client)

* Browse guest houses
* View available rooms
* Book rooms with:

  * Number of guests (validated with capacity)
  * Check-in & check-out dates
* Reservation validation based on availability

### 🛒 Reservation Cart

* View all reservations
* Cancel reservations بسهولة

### 🔍 Search

* Search guest houses by:

  * Name
  * Address

### 🛠️ Admin Dashboard

* Manage all users
* Validate or reject owners
* Delete:

  * Users
  * Houses
  * Rooms
  * Reservations

---

## 🛠️ Tech Stack

* **HTML5**
* **CSS3**
* **Bootstrap**
* **JavaScript (Vanilla JS)**
* **LocalStorage** (for data persistence)

---

## 📸 Screenshots

*(Add screenshots here)*
Example:

* Home Page
* Dashboard
* Reservation Page

---

## 📁 Project Structure

```bash
project/
│── index.html
│── login.html
│── signup-client.html
│── signup-owner.html
│── dashboard-owner.html
│── add-house.html
│── add-room.html
│── js/
│   ├── script.js
│   ├── storage.js
│── css/
│   ├── style.css
```

---

## 🎯 What I Learned

* DOM manipulation using JavaScript
* Working with **LocalStorage**
* Using array methods:

  * `map()`
  * `filter()`
  * `reduce()`
* Form validation
* Role-based logic (Client / Owner / Admin)
* Building a complete front-end project structure

---

## 🔮 Future Improvements

* 🔐 Add real backend (Node.js / Firebase)
* 📦 Use a database instead of LocalStorage
* 📱 Make the app fully responsive
* ⭐ Add ratings & reviews system
* 💳 Add online payment integration

---

## 👩‍💻 Author

* Hayfa Chelbi
* GitHub: **

---

## 📌 Project Context

This project was developed as part of a training exercise to practice front-end development and build a real-world application scenario.

---
