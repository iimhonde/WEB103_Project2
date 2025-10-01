# WEB103 Project 2 - Florida Trails (Database Integration)

Submitted by: **Ivie Imhonde**

About this web app:  
**Florida Trails** is a Node/Express web application that showcases different hiking trails around Florida, now powered by a PostgreSQL database. This project refactors the original list-based web app to serve dynamic data from a database instead of hardcoded arrays. Each trail includes important details such as location, length, elevation gain, difficulty, keywords, weather conditions, and more. Users can view a card-based list of trails and click each one for a full detail page, all data being retrieved from the database in real-time.

Time spent: **3** hours

---

## ✅ Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database**
- [x] **The web app has an appropriately structured database table for the list items (trails)**
  - [x] **Database includes trails table with fields: id, name, location, length_miles, elevation_gain_ft, difficulty, rating, trail_type, dog_friendly, fees, keywords, typical_weather, recent_conditions, description, image**
- [x] **The web app displays data retrieved from the PostgreSQL database**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items from the database, each with at least three displayed attributes**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view uses the database ID for routing, such as `localhost:3000/trails/1` and `localhost:3000/trails/2`**
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using PicoCSS**

---

## 🛠️ Database Features

- [x] **PostgreSQL database hosted on Render.com**
- [x] **Automatic database seeding with trail data using reset script**
- [x] **Environment variables for secure database configuration**
- [x] **Database connection pooling for efficient query handling**
- [x] **Proper SQL schema with appropriate data types (TEXT[], DECIMAL, BOOLEAN, etc.)**

---

## ✨ Optional Features

- [x] The web app displays items in a **card layout** with images, rather than a plain list
- [x] A custom **forest-themed background** with translucent content panels for readability
- [x] **Database reset functionality** - `npm run reset` command to recreate and seed the database
- [x] **Modular code structure** - Separated data layer (trails.js) from server logic

---

## 🚀 Additional Features

- [x] Custom CSS (`main.css`) for background styling, banner, and readability
- [x] Responsive design (cards and layout adapt when the screen is resized)
- [x] **Error handling** for database connections and queries
- [x] **Environment-based configuration** using dotenv for database credentials

---

## 🎥 Video Walkthrough

Here’s a walkthrough of implemented required features:

<img src='https://imgur.com/a/iKjlHpM' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with **ScreenToGif** (Windows) / **Kap** (macOS) / **Peek** (Linux).

---

## 📝 Notes

Challenges:  
- **Database Integration**: Setting up PostgreSQL connection with proper environment variables and SSL configuration for Render.com hosting.
- **Data Migration**: Converting hardcoded trail data to database records while maintaining all trail attributes and proper data types.
- **Query Optimization**: Implementing efficient database queries for both list and detail views.
- **Error Handling**: Adding robust error handling for database connections, failed queries, and missing trails.
- **Environment Setup**: Configuring dotenv properly to load database credentials from the correct path relative to the config directory.
- **Schema Design**: Designing appropriate PostgreSQL data types for complex fields like keywords (TEXT[]) and ratings (DECIMAL).

Key Learnings:
- How to structure a PostgreSQL database schema for web applications
- Best practices for database connection pooling with pg
- Environment variable management for sensitive database credentials
- Database seeding and reset strategies for development workflows

---

## 📜 License

Copyright 2024 Ivie Imhonde

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0
