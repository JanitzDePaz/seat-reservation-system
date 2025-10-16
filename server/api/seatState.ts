import { app } from "../index.ts";
import mongoose from "mongoose";

const Asientos = mongoose.model(
        'Asientos', 
        new mongoose.Schema({
            seatNum: Number,
            lineNum: Number,
            occupied: Boolean,
        }, { strict: true }), 
        'Asientos'
    );

export default function chairState(){
    
    

    app.get('/asientos', async(req, res) => {
        
        const asientos = await Asientos.find()
        console.log(res.json(asientos))
        res.json(asientos)

    })
}
