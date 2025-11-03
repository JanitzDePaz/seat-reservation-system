import { app } from "../index.ts";
import mongoose from "mongoose";

// Define Mongoose schema and model for seat state
const stateSchem = mongoose.model(
  "stateSchem",
  new mongoose.Schema(
    {
      seatNum: Number,
      lineNum: Number,
      occupied: Boolean,
    },
    { strict: true }
  ),
  "Seats"
);

export default function chairState() {
  // get seat status for show the seats state in the client
  app.get("/seatStatus", async (req, res) => {
    try {
      // Find all seats and sort them by lineNum and seatNum
      const asientos = await stateSchem.find().sort({ lineNum: 1, seatNum: 1 });
      const state = asientos.map((a) => {
        return {
          _id: a._id,
          seatNum: a.seatNum,
          lineNum: a.lineNum,
          occupied: a.occupied,
        };
      });

      res.json(state);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Error al obtener el estado de los asientos" });
    }
  });
}
