# League Management System 🏒🥅
A full-featured **League Management System** developed as a semester project for **CIS2261 - System Analysis and Design** at **Holland College**.

This project is designed to streamline the management of sports leagues, teams, players, and more. It offers tools for league administrators, and coaches to manage teams, track players, handle scheduling, and maintain league integrity—all within a centralized platform. 

## 📌 Project Overview

The League Management System is built to support various real-world use cases such as:
- Creating and managing leagues with or without divisions
- Assigning coaches to teams
- Tracking team stats per match and season
- Managing seasons, matches, player rosters, and more

## 🔧 Technologies Used

- **Backend**: Spring Boot (Java)
- **Frontend**: React / Next.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)

## 🏫 Academic Info

- **Course**: CIS2261 - System Analysis and Design  
- **Institution**: Holland College  
- **Semester**: Winter 2025  
- **Project Type**: Semester-long individual project

## 📜 License

This project is for educational purposes only.

## 📋 Prerequisites

To run the League Management System locally, make sure you have the following installed:

---

### 🖥️ Backend (Spring Boot)

- **Java JDK 23+**
  - Download: [https://jdk.java.net/](https://jdk.java.net/)
- **Maven 3.8+**
  - Download: [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
- **MySQL / phpMyAdmin**
  - You can install MySQL manually or use a tool like [XAMPP](https://www.apachefriends.org/) or [MAMP](https://www.mamp.info/). XAMPP was used in the making of this project.

---

### 🌐 Frontend (React + Next.js)

- **Node.js 18+**
  - Download: [https://nodejs.org/](https://nodejs.org/)
- **npm 9+**
  - Comes with Node.js installation
- **React 19**
- **Next.js 15**
  - Installed automatically via `npm install`

## Getting Started
To get started, clone this project. Once that is done follow the steps below.

### 🖥️ Backend Setup (Spring Boot)
1. **Open the project**  
   Open the Spring Boot backend in your IDE of choice (such as IntelliJ IDEA or NetBeans). The folder is located at `project/league_management`

2. **Create the database using phpMyAdmin**  
   - Open [phpMyAdmin](http://localhost/phpmyadmin) in your browser.
   - Log in to your MySQL account.
   - Create a new database named `league_management_system` (or whatever name is defined in your `application.properties`).
   - In your project’s `resources` folder, find the SQL script named `lms_db_script.sql`.
   - Run this script in phpMyAdmin under the SQL tab to create the necessary tables and insert initial data.

3. **Configure your database credentials**  
   In `src/main/resources/application.properties` (or `application.yml`), make sure your database settings match your phpMyAdmin (MySQL) setup. Example:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/league_management_system
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=none
4. **Run the project** 🚀🚀🚀
	>       ./mvnw spring-boot:run
	or
    >        Click the run button on your IDE

### 🌐 Frontend Setup (Next.js + React)
1. **Open The Project** 
Open the Next.js/React frontend in your IDE of choice (such as IntelliJ IDEA or NetBeans). The folder is located at `project/league_management_frontend`
2. **Get Project Dependencies**

           npm install
3. **Configure Environment Variables** 
If there is not already, create a `.env.local` folder in the root of the project. Ensure the contents are as follows:

    NEXT_PUBLIC_API_URL="http://localhost:9000/api"
	NODE_TLS_REJECT_UNAUTHORIZED=0
4. **Run the Development Server** 🚀🚀🚀

         npm run dev

## Important Note ‼️
You can try to run the frontend using https using `npm run https`. This feature is from Next.js and is currently in experimental mode. It is useful especially in this project as it prevents the refresh token cookie from being deleted when navigating to a new page. If you don't want to run this or would rather just use `npm run dev`, to get the full functionality of the authentication you will have to manually secure the refresh cookie in Chrome DevTools. A link to a picture is provided below:
[devtool_example.png](https://hollandcollege-my.sharepoint.com/:i:/p/iforddow/Ebcld7QokDRCjXAJFpEvh-ABsnsF9c_tV_VibphaAsiAXQ?e=DFrTCe)
You can find the cookie by opening DevTools and going to `Application->Cookies`

Note that `refreshToken` cookie must have `Secure` checked.

## Questions ❓
If you have any questions or concerns feel free to contact me via email at iforddow@hollandcollege.com

