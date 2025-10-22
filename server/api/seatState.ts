import { app } from "../index.ts";
import mongoose from "mongoose";

const stateSchem = mongoose.model(
        'stateSchem', 
        new mongoose.Schema({
            seatNum: Number,
            lineNum: Number,
            occupied: Boolean,
        }, { strict: true }), 
        'Seats'
    );

export default function chairState(){
    app.get('/seatStatus', async(req, res) => {
        try{
            const asientos = await stateSchem.find().sort({ lineNum: 1, seatNum: 1 })
            const state = asientos.map(a => {
                return {
                    _id: a._id,
                    seatNum: a.seatNum,
                    lineNum: a.lineNum,
                    occupied: a.occupied
                }
            })
            
            res.json(state)
        }catch (err){
            console.log(err)
            res.status(500).json({ error: 'Error al obtener el estado de los asientos' });
        }
        

    })
}
