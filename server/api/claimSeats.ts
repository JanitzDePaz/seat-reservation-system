import mongoose from "mongoose";
import { app } from "../index.ts";
import { Console, error } from "console";

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

            if(name == "" || lastName == "" || mail == ""){
                return res.status(400).json({ success: false, error: "Debes completar todos los campos", errorType: "errorEmpty" });


            }else if(!nameFormat.test(name)){
                return res.status(400).json({ success: false, error: "El nombre no es valido", errorType: "errorName" });
            
            }else if(!nameFormat.test(lastName)){
                return res.status(400).json({ success: false, error: "El apellido no es valido", errorType : "errorLastName" });

            }else if(!mailFormat.test(mail)){
                return res.status(400).json({ success: false, error: "El mail no es valido", errorType: "errorMail" });
            }else {
                
                const result = await claimSchem.updateMany(
                { _id: { $in: objectIds } },
                { $set: { occupied: true, name, lastName, mail } }
            );
                res.json({success: true})
            }
            
        }catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: "Error actualizando asientos", errorType: "serverError" });
        }
    });
}

