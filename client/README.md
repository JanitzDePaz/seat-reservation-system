# 🎟️ Seat Reservation System

Welcome! This project is a **simple yet functional system** for selecting and reserving seats using a **React frontend** connected to a **Node.js + MongoDB backend**.  

⚠️ **Note:** This is my **first project involving a backend and database**, so there might be some rough edges or suboptimal implementations.

The idea is straightforward: choose one or multiple seats, provide your **first name, last name and Email**, and save your reservation directly to the database.

---

## How to use

    1. Clone this project.
    2. Install all dependencies.
    3. Start a MongoDB instance on port :27017, with a database named "App" and a collection named "Seats".
    4. Execute the Seed.ts script for configure the database.
    5. Run the client with the command "npm run dev" inside the ".../client"
    6. Run the server with the command "npx ts-node index.ts" inside the ".../server" directory.
    


## 🪑 How It Works

### 1. Select Your Seats
- A **seat map** is displayed in the interface.  
- **Occupied seats** are clearly marked and **cannot** be selected.  
- Click on a **free seat** to select it.  
- Click again on a **selected seat** to deselect it.

### 2. Fill in Your Details
Once you’ve chosen your seats, a form appears asking for:  
- **First Name**  
- **Last Name**  
- **Email**

### 3. Reserve
- Click **Next** to send your data to the backend.  
- The backend marks the selected seats as **occupied** in the database.  
- If everything goes smoothly, the form **closes automatically**.  
- Any errors are logged to the console (this can be improved later with **user-friendly notifications**).

---

## 🖥️ Backend

- **Node.js + Express**  
- **MongoDB with Mongoose**

The backend listens for a `POST` request at `/claim` containing:  
- **Seat IDs**  
- **User information**  

It then uses `updateMany` in MongoDB to:  
1. Mark the selected seats as **occupied**  
2. Store the **name, surname, and DNI** of the user.

---

Future improvements
- **Upgrade the UI** for a more modern look and feel.    
- **Optimize and clean up the code** for better maintainability. 
  

💡 **Tip:** You can expand this system by adding features like real-time seat availability, user authentication, or prettier notifications for errors and confirmations.  
