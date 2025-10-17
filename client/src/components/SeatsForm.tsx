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
    const [errorMsg, setErrorMsg] = useState("");

    const userName = useRef<HTMLInputElement>(null)
    const lastName = useRef<HTMLInputElement>(null)
    const mail = useRef<HTMLInputElement>(null)

    const idOfChairs = selectedSeats.map(chair => chair._id);

    return (
        <main className="w-[80vw] lg:w-[40vw] h-[80vh] bg-transparent absolute flex justify-center items-center backdrop-blur-[1px]">
            <div className="bg-[#252525dc] border-2 border-blue-500 w-[80vw] lg:w-[35vw] h-[50vh] rounded-2xl flex flex-col items-center">
                <h1 className="text-2xl text-white mt-[1vh]">Reserva tus asientos</h1>
                <div className="flex lg:w-[30vw] w-[80vw] h-[35vh] justify-around m-[1vw]" >
                    <form className="flex flex-col align-middle gap-4 w-[25vw] lg:w-[17vw] self-center items-center">
                        <label htmlFor="userName" className="text-[1rem] text-center text-white">Ingrese su nombre</label>
                        <input ref={userName} type="text" required pattern="[A-Za-z]{3,10}" id="userName" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%] text-white" />
                        {errorMsg == "errorName" ? <p className="text-red-500 text-sm">El nombre es incorrecto</p> : null}
                        
                        <label htmlFor="lastName" className="text-[1rem] text-center text-white">Ingrese su primer apellido</label>
                        <input ref={lastName} type="text" required pattern="[A-Za-z]{3,10}" id="lastName" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%] text-white" />
                        {errorMsg == "errorLastName" ? <p className="text-red-500 text-sm">El apellido es incorrecto</p> : null}    

                        <label htmlFor="mail" className="text-[1rem] text-center text-white">Ingrese su mail</label>
                        <input ref={mail} type="text" id="mail" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%] text-white" />
                        {errorMsg == "errorMail" ? <p className="text-red-500 text-sm">El mail no es correcto</p> : null}
                    </form>
                    <section className="w-[50vw] flex-wrap lg:w-[10vw] h-[25vh] overflow-y-auto flex flex-col gap-4 self-center">
                        <h2 className="text-xl text-white text-center">Entradas</h2>
                        {selectedSeats.map((showSeat, i) => (
                            <Ticket ticketNum={i+1} seatNum={showSeat.seatNum} lineNum={showSeat.lineNum} movieDate='16/10/25' movieImage='exampleFilmImg.png' movieTitle='Titulo de la pelicula'/>
                            ))
                        }
                    </section>
                </div>
                <section className="h-[5vh] flex justify-center gap-5">
                    <button className=" w-[6vw] md:w-[10vw] bg-gray-600 border-2 border-blue-400 text-white rounded-xl" onClick={close}>Cancelar</button>
                    <button onClick={() => claimSeats({chairIds: idOfChairs, name: userName.current?.value || "", lastName: lastName.current?.value || "", mail:mail.current?.value || "" , close:() => {refreshState(); close(); resetSelectedSeats()}, setError:setErrorMsg })} className="bg-blue-400 text-white border-2 border-white w-[6vw] md:w-[10vw] rounded-xl">Siguiente</button>
                </section>
                {errorMsg == "errorEmpty" ? <p className="text-red-500 text-sm self-center">Debes completar todos los campos</p> : null}
            </div>
        </main>
    )
}