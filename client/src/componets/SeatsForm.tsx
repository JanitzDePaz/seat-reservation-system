import { useRef } from "react";
import claimSeats from "../api/ClaimSeats";

type Seat = {
    _id: string;
    numAsiento: number;
    filaAsiento: number;
    ocupado: boolean;
}

type ClaimSeatArray = {
    selectedSeats: Seat[];
    close: () => void,
    refreshState: ()=> void
}

export default function SeatsForm({selectedSeats, close, refreshState} : ClaimSeatArray){
    const userName = useRef<HTMLInputElement>(null)
    const lastName = useRef<HTMLInputElement>(null)
    const DNI = useRef<HTMLInputElement>(null)

    const idOfChairs = selectedSeats.map(chair => chair._id);

    console.log(idOfChairs)

    return (
        <main className="w-[40vw] h-[80vh] bg-transparent absolute flex justify-center items-center backdrop-blur-[1px]">
            <div className="bg-[#252525c4] border-2 border-blue-500 w-[35vw] h-[50vh] backdrop-blur-[2px] rounded-2xl flex flex-col items-center">
                <h1 className="text-2xl text-white mt-[1vh]">Reserva tus asientos</h1>
                <div className="flex w-[30vw] h-[35vh] justify-around bg-white m-[1vw]" >
                    <form className="flex flex-col align-middle gap-2 w-[17vw] self-center items-center">
                        <label htmlFor="userName" className="text-xl text-center">Ingrese su nombre</label>
                        <input ref={userName} type="text" id="userName" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%]" />

                        <label htmlFor="lastName" className="text-xl text-center">Ingrese su primer apellido</label>
                        <input ref={lastName} type="text" id="lastName" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%]" />

                        <label htmlFor="DNI" className="text-xl text-center ">Ingrese su DNI</label>
                        <input ref={DNI} type="text" id="DNI" className="border-[#2659e4] border-2 rounded-[12px] text-center w-[85%]" />
                    </form>
                    <section className="w-[10vw] h-[25vh] overflow-y-auto flex flex-col gap-4 self-center">
                        {selectedSeats.map((showSeat, i) => (
                            <article key={showSeat._id} className=" w-[10vw] h-[7vh] flex flex-col border-2 border-[#1e7af1] bg-[#36324d] rounded-xl text-white">
                                <h2 className="text-[1rem] text-center">Asiento {i+1}</h2>
                                <div className="flex justify-around">
                                    <h3 className="text-[0.8rem]">Numero {showSeat.numAsiento}</h3>
                                    <h3 className="text-[0.8rem]">Fila {showSeat.filaAsiento}</h3>
                                </div>
                            </article>
                            ))
                        }
                    </section>
                </div>
                <section className="h-[5vh] flex justify-center gap-5">
                    <button className="bg-gray-600 border-2 border-blue-400 text-white p-2 rounded-xl" onClick={close}>Cancelar</button>
                    <button onClick={() => claimSeats({chairIds: idOfChairs, nombre: userName.current?.value || "", apellido: lastName.current?.value || "", DNI:DNI.current?.value || "" , close:() => {refreshState(); close()}})} className="bg-blue-400 text-white border-2 border-white p-2 rounded-xl">Siguiente</button>
                </section>
            </div>
            

        </main>
    )
}