export default async function seatsStatus(){
        try{
            const res = await fetch("http://localhost:4000/asientos")
            const seatData =  await res.json()
        
            return seatData
        }catch (err){
            console.log(err)
        }

    }