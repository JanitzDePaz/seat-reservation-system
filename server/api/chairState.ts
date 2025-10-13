import { app } from "../index.ts";
import mongoose from "mongoose";

const Asientos = mongoose.model(
        'Asientos', 
        new mongoose.Schema({
            numAsiento: Number,
            filaAsiento: Number,
            ocupado: Boolean,
        }, { strict: true }), 
        'Asientos'
    );

export default function chairState(){
    
    

    app.get('/asientos', async(req, res) => {

        const asientos = await Asientos.find()
        res.json(asientos)

    })
}
