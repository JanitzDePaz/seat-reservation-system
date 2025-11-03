import mongoose from "mongoose";
import { app } from "../index.ts";

// Define Mongoose schema and model for claiming seats
const claimSchem = mongoose.model(
  "claimSchem",
  new mongoose.Schema(
    {
      chairIds: [],
      name: String,
      lastName: String,
      email: String,
    },
    { strict: false }
  ),
  "Seats"
);

export default function claimSeats() {
  // Regular expressions for validating input
  let nameFormat = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]{3,10}$/;
  let mailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // post claimed seats if the conditions are met
  app.post("/claim", async (req, res) => {
    try {
      const {
        chairIds,
        name,
        lastName,
        email,
      }: { chairIds: string[]; name: string; lastName: string; email: string } =
        req.body;
      const objectIds = chairIds.map((id) => new mongoose.Types.ObjectId(id));

      // Declare an array to hold error messages and push it if any validation fails
      const errorArray: string[] = [];
      if (name == "" || lastName == "" || email == "") {
        errorArray.push("errorEmpty");
      } else {
        if (!nameFormat.test(name)) {
          errorArray.push("errorName");
        }

        if (!nameFormat.test(lastName)) {
          errorArray.push("errorLastName");
        }

        if (!mailFormat.test(email)) {
          errorArray.push("errorEmail");
        }
      }

      // If no errors, update the seats in the database, else, return errors
      if (errorArray.length < 1) {
        const result = await claimSchem.updateMany(
          { _id: { $in: objectIds } },
          { $set: { occupied: true, name, lastName, email } }
        );
        return res.json({ success: true });
      } else {
        return res.status(400).json({ success: false, errorType: errorArray });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          success: false,
          error: "Error actualizando asientos",
          errorType: "serverError",
        });
    }
  });
}
