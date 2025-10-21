import mongoose from "mongoose";
import { app } from "../index.ts";

const claimSchem = mongoose.model(
        "claimSchem", 
        new mongoose.Schema({
            chairIds: [],
            name: String,
            lastName: String,
            mail: String
        },{strict: false}), "Asientos"
)

export default function claimSeats(){

    let nameFormat = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]{3,10}$/;
    let mailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

    app.post("/claim", async  (req, res) => {
        try{
            const { chairIds, name, lastName, mail} : {chairIds: string[], name: string, lastName: string, mail: string} = req.body;
            const objectIds = chairIds.map(id => new mongoose.Types.ObjectId(id));

            const errorArray: string[] = [];
            if(name == "" || lastName == "" || mail == ""){
                errorArray.push("errorEmpty");

            }
            
            if(!nameFormat.test(name)){
                errorArray.push("errorName");
            
            }
            
            if(!nameFormat.test(lastName)){
                errorArray.push("errorLastName")

            }
            
            if(!mailFormat.test(mail)){
                errorArray.push("errorMail");
            }
            
            if(errorArray.length < 1){
                
                const result = await claimSchem.updateMany(
                { _id: { $in: objectIds } },
                { $set: { occupied: true, name, lastName, mail } }
            );
                return res.json({success: true})
            
            }else {
                return res.status(400).json({ success: false, errorType:errorArray});
            }
            
        }catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: "Error actualizando asientos", errorType: "serverError" });
        }
    });
}

