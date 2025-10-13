import { useEffect, useState } from "react"
import seatsStatus from "../api/SeatsStatus"
import SeatsForm from "./SeatsForm"
type Seats = {
    _id: string,
    numAsientos: number,
    filaAsientos: number,
    ocupado: boolean
}

export default function Seats(){
    const [seats, setSeats] = useState <Seats[]>([])
    const [selectedSeats, setSelectedSeats] = useState <Seats[]>([])
    const [activeForm, setActiveForm] = useState (false)

    const loadSeats = async () => {
        const seatData = await seatsStatus()
        setSeats(seatData)
    }

    useEffect(()=>{
        loadSeats()
    },[])

    const btnStyle = "h-[5vh]  w-[10vw] self-center rounded-xl border-[1px] border-[#00FFFF]"

    return(
        <div className="w-[40vw] h-[80vh] justify-center absolute top-[50%] left-[50%] translate-[-50%] flex flex-col gap-2">
            <div className="h-[70vh] w-[100%] bg-slate-800 border-white border-[2px]  grid grid-cols-10 gap-3 grid-rows-8">
            {
                seats.map(seat => {
                    return (
                        <img  alt="Seat img" onClick={ () =>{
                            if(selectedSeats.includes(seat)){
                                setSelectedSeats(selectedSeats.filter(s => seat._id !== s._id))
                            }else if(seat.ocupado !== true){
                                setSelectedSeats([...selectedSeats, seat])
                            }
                        }} src={seat.ocupado ? "ocupedSeat.png" : selectedSeats.includes(seat) ? "selectedSeat.png" : "freeSeat.png"} key={seat._id}/>
                    )
                })
            }
            
            </div>
            {
                selectedSeats.length <= 0
                
                ?
                    <button className={`bg-[#6B7280] text-white ${btnStyle}`} title={selectedSeats.length <= 0 ? "Tienes que elegir al menos un asiento para continuar" : ""}>Continuar</button>

                :
                    <button className={`bg-[#0099ff] text-black pointer ${btnStyle} `} onClick={() => setActiveForm(true)}>Continuar</button>
            }

            {activeForm && <SeatsForm selectedSeats={selectedSeats} close={()=> setActiveForm(false)} refreshState={loadSeats}/>}
            
        </div>
    )
}