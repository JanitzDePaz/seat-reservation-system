import mongoose from "mongoose";
import { app } from "../index.ts";

const claimSchem = mongoose.model(
        "claimSchem", 
        new mongoose.Schema({
            chairIds: [],
            nombre: String,
            apellido: String,
            mail: String,
            ocupado: Boolean
        },{strict: false}), "Asientos"
)

export default function claimSeats(){

    let nameFormat = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]{3,10}$/;
    let dniFormat = /^[0-9]{8}[A-Za-z]$/;

    app.post("/claim", async  (req, res) => {
        try{
            const { chairIds, nombre, apellido, DNI } : {chairIds: string[], nombre: string, apellido: string, DNI: string} = req.body;
            const objectIds = chairIds.map(id => new mongoose.Types.ObjectId(id));

            if(!nameFormat.test(nombre) || !nameFormat.test(apellido) || !dniFormat.test(DNI)){
                return res.status(400).json({ success: false, error: "Debes completar todos los campos" });
            }else if(!nameFormat.test(nombre)){
                return res.status(400).json({ success: false, error: "El nombre no es valido" });
            
            }else if(!nameFormat.test(apellido)){
                return res.status(400).json({ success: false, error: "El apellido no es valido" });

            }else if(!dniFormat.test(DNI)){
                return res.status(400).json({ success: false, error: "El DNI no es valido" });

            }else {
                
                const result = await claimSchem.updateMany(
                { _id: { $in: objectIds } },
                { $set: { ocupado: true, nombre, apellido, DNI } }
            );
                res.json({success: true})
            }
            
        }catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: "Error actualizando asientos" });
        }
    });
}

