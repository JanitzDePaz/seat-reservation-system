import mongoose from "mongoose";
import { app } from "../index.ts";

const claimSchem = mongoose.model(
        "claimSchem", 
        new mongoose.Schema({
            chairIds: [],
            nombre: String,
            apellido: String,
            DNI: String,
            ocupado: Boolean
        },{strict: false}), "Asientos"
)

export default function claimSeats(){
    app.post("/claim", async  (req, res) => {
        try{
            const { chairIds, nombre, apellido, DNI } : {chairIds: string[], nombre: string, apellido: string, DNI: string} = req.body;

            const objectIds = chairIds.map(id => new mongoose.Types.ObjectId(id));
            
            const result = await claimSchem.updateMany(
                { _id: { $in: objectIds } },
                { $set: { ocupado: true, nombre, apellido, DNI } }
            );
            
            res.json({success: true})
        }catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: "Error actualizando asientos" });
        }
    });
}

