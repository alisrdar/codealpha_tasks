# Internship Tasks

This repository contains two internship projects:  
1. **URL Shortener**  
3. **Restaurant Management System**  

---

## 📌 Task 1: URL Shortener

### 🔹 Description
A simple web service that shortens long URLs into shorter, shareable links.  

### ⚙️ Features
- Generate short URLs from long links  
- Redirect from short URL → original URL  
- Basic API endpoints for creating and retrieving URLs  
- MongoDB storage for mapping URLs  

### 🛠️ Tech Stack
- Node.js / Express.js  
- MongoDB  
- Shortid (for unique URL codes)  

### ▶️ How to Run
```bash
cd url-shortener
npm install
npm start
```
# 📌 Task 3: 🍽️ Restaurant Management System

## 🔹 Description
A backend system for managing restaurant operations such as orders, tables, reservations, and inventory.  
This project is built as part of internship tasks using **Express.js** and **MongoDB**.

---

## ⚙️ Features
-  Manage menu items (CRUD operations)  
-  Place and track customer orders  
-  Reserve tables & check availability  
-  Inventory management with auto-update on orders  
-  Reporting features (daily sales, stock alerts) 

---

## 🛠️ Tech Stack
- **Node.js / Express.js** – backend framework  
- **MongoDB** – database for persistent storage  
- **Mongoose** – ODM for MongoDB  

---

## 📂 Project Structure
```bash
restaurant-management/
├── models/          # Database schemas (Menu, Orders, Tables, Inventory)
├── routes/          # API routes
├── controllers/     # Business logic
├── server.js        # Entry point
└── README.md
```
