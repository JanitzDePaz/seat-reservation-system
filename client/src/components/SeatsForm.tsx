import { useRef, useState } from "react";
import claimSeats from "../api/ClaimSeats";
import Ticket from "./Ticket";

type Seat = {
    _id: string;
    seatNum: number;
    lineNum: number;
    occupied: boolean;
}

type ClaimSeatArray = {
    selectedSeats: Seat[];
    close: () => void,
    refreshState: ()=> void
    resetSelectedSeats: ()=> void
}

export default function SeatsForm({selectedSeats, close, refreshState, resetSelectedSeats} : ClaimSeatArray){
    const [errorMsg, setErrorMsg] = useState<string[]>([]);

    const userName = useRef<HTMLInputElement>(null)
    const lastName = useRef<HTMLInputElement>(null)
    const mail = useRef<HTMLInputElement>(null)

    const idOfChairs = selectedSeats.map(chair => chair._id);

    return (
        <main className="w-[60vw] lg:w-[40vw] h-[80vh] bg-transparent absolute top-[50%] left-[50%] translate-[-50%] flex justify-center items-center backdrop-blur-[1px]">
            <div className="bg-[#252525dc] border-2 border-blue-500 w-[80vw] lg:w-[35vw] h-[50vh] rounded-2xl flex flex-col items-center">
                <h1 className="text-xl lg:text-2xl text-white mt-[1vh]">Reserva tus asientos</h1>
                <div className="flex lg:w-[30vw] w-[60vw] h-[35vh] justify-around m-[1vw]" >
                    <form className="flex flex-col align-middle gap-1 w-[80%] lg:w-[17vw] self-center items-center">
                        <label htmlFor="userName" className="text-[1rem] text-center text-white">Ingrese su nombre</label>
                        <input ref={userName} type="text" placeholder="Ej: Juan" id="userName" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%] text-white" />
                        <p className="form-errors">
                            {errorMsg.includes("errorName") ? "El nombre es incorrecto" : " "}
                        </p>
                        
                        <label htmlFor="lastName" className="text-[1rem] text-center text-white">Ingrese su primer apellido</label>
                        <input ref={lastName} type="text" placeholder="Ej: Perez" id="lastName" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%] text-white" />
                        <p className="form-errors">
                            {errorMsg.includes("errorLastName") ? "El apellido es incorrecto" : " "}   
                        </p>

                        <label htmlFor="mail" className="text-[1rem] text-center text-white">Ingrese su mail</label>
                        <input ref={mail} type="email" id="mail" placeholder="Ej: JuanPerez@gmail.com" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%] text-white" />
                        <p className="form-errors">
                            {errorMsg.includes("errorEmail") ? "El mail no es correcto" : " "}
                        </p>
                    </form>
                    <section className="hidden lg:w-[10vw] h-[25vh] overflow-y-auto lg:flex flex-col gap-4 self-center">
                        <h2 className="text-xl text-white text-center">Tus tickets</h2>
                        {selectedSeats.map((showSeat, i) => (
                            <Ticket ticketNum={i+1} seatNum={showSeat.seatNum} lineNum={showSeat.lineNum} movieDate='16/10/25' movieImage='exampleFilmImg.png' movieTitle='Titulo de la pelicula' style="w-[100%] min-h-[6vh] h-[6vh]" key={showSeat._id}/>
                            ))
                        }
                    </section>
                </div>
                <section className="h-[10vh] lg:h-[5vh] flex-col-reverse sm:flex-row items-center flex justify-center gap-5 w-[80%]">
                    <button className=" max-h-[6vh] w-[40%] md:w-[10vw] h-[4vh] bg-gray-600 border-2 border-blue-400 text-white rounded-xl" onClick={close}>Cancelar</button>
                    <button onClick={() => claimSeats({chairIds: idOfChairs, name: userName.current?.value || "", lastName: lastName.current?.value || "", email:mail.current?.value || "" , close:() => {refreshState(); close(); resetSelectedSeats()}, setError:setErrorMsg })} className="bg-blue-400 text-white border-2 border-white max-h-[6vh] h-[4vh] w-[40%] md:w-[10vw] m-[0%] rounded-xl">Siguiente</button>
                </section>
                {errorMsg.includes("errorEmpty") ? <p className="text-red-500 text-sm self-center">Debes completar todos los campos</p> : null}
            </div>
        </main>
    )
}