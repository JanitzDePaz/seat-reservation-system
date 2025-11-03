import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';




//Conect Express
export const app = express();
const port = 4000;

// Configurate CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json())




//Conect MongoDB
const URL = 'mongodb://localhost:27017/App';
mongoose.connect(URL)
  .then(() => console.log('Connecting to MongoDB'))
  .catch(error => console.log(error));


// import the API routes and use them
import seatState from "./api/seatState.ts";
seatState()

import claimSeats from "./api/claimSeats.ts";
claimSeats()



app.listen(port, () => {
    console.log(`Server listening at port http://localhost:${port}`);
});