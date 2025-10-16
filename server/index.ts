import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';




//Conectar Express
export const app = express();
const puerto = 4000;


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json())




//Conectar MongoDB
const URL = 'mongodb://localhost:27017/App';
mongoose.connect(URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.log(error));


app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

import seatState from "./api/seatState.ts";
seatState()

import claimSeats from "./api/claimSeats.ts";
claimSeats()