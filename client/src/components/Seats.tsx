import { useEffect, useState } from 'react';
import seatsStatus from '../api/SeatsStatus';
import SeatsForm from './SeatsForm';
import Ticket from './Ticket';
type Seat = {
  _id: string;
  seatNum: number;
  lineNum: number;
  occupied: boolean;
};

export default function Seats() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [activeForm, setActiveForm] = useState(false);
  
  const loadSeats = async () => {
    const seatData = await seatsStatus();
    setSeats(seatData);
  };

  useEffect(() => {
    setSelectedSeats([]);
    loadSeats();
  }, []);

  const btnStyle = 'w-[30vw] h-[5vh]  lg:w-[20vw] self-center rounded-xl border-[1px] border-[#00FFFF] text-white font-bold';
  const largeText = "md:text-[1rem] lg:text-[1.2rem] xl:text-[1.3rem] 2xl:text-[1.5rem]";
  const mediumText = "md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.2rem]";
  const smallText = "md:text-[0.4rem] lg:text-[0.6rem] xl:text-[0.7rem] 2xl:text-[0.8rem]";

  return (
    <main className="flex h-full w-full justify-around items-center">
      <section className="hidden lg:flex flex-col items-center gap-5 w-[20vw] h-[70vh] ">
        <div className="w-[15vw] h-[30vh] bg-[#252525c4] border-2 border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-3">
          <h1 className={`${largeText} text-2xl text-white`}>Leyenda</h1>
          <article className="flex gap-3 w-[70%] m-0 justify-start items-center">
            <img alt="Seat img" src="freeSeat.svg" className="w-[3vw]" />
            <h2 className={`${mediumText} text-white text-lg`}>Libre</h2>
          </article>
          <article className="flex gap-3 w-[70%] m-0 justify-start items-center">
            <img alt="Seat img" src="selectedSeat.svg" className="w-[3vw]" />
            <h2 className={`${mediumText} text-white text-lg`}>Seleccionado</h2>
          </article>
          <article className="flex gap-3 w-[70%] m-0 justify-start items-center">
            <img alt="Seat img" src="occupiedSeat.svg" className="w-[3vw]" />
            <h2 className={`${mediumText} text-white text-lg`}>Ocupado</h2>
          </article>
        </div>
        <div className="w-[15vw] h-[40vh] bg-[#252525c4] border-2 border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-4">
          <h1 className={`${largeText} text-white text-2xl text-center`}>Instrucciones</h1>
          <p className={`${smallText} text-white text-sm text-center w-[80%]`}>
            1. Selecciona los asientos que deseas reservar haciendo click en ellos.
          </p>
          <p className={`${smallText} text-white text-sm text-center w-[80%]`}>
            2. Una vez seleccionados, haz click en "Continuar" para proceder con la reserva.
          </p>
          <p className={`${smallText} text-white text-sm text-center w-[80%]`}>
            3. Completa el formulario con tus datos personales y confirma la reserva.
          </p>
          <p className={`${smallText} text-white text-sm text-center w-[80%]`}>
            4. Recibirás una confirmación de tu reserva.
          </p>
        </div>
      </section>
      <section className="w-[90vw] md:w-[70vw] lg:w-[40vw] h-[80vh] justify-center flex flex-col gap-2">
        <div className="h-[70vh] w-[100%] bg-slate-800 grid grid-cols-10 gap-3 grid-rows-9 ">
          {seats.map((seat) => {
            return (
              <img
                alt="Seat img"
                onClick={() => {
                  if (selectedSeats.includes(seat)) {
                    setSelectedSeats(selectedSeats.filter((s) => seat._id !== s._id));
                  } else if (seat.occupied !== true) {
                    setSelectedSeats([...selectedSeats, seat]);
                  }
                }}
                src={
                  seat.occupied
                    ? 'occupiedSeat.svg'
                    : selectedSeats.includes(seat)
                      ? 'selectedSeat.svg'
                      : 'freeSeat.svg'
                }
                key={seat._id}
              />
            );
          })}
          <img src="screen.png" alt="screenImg" className='col-[1/11] row-8 w-full rotate-180'  />
        </div>
        {selectedSeats.length <= 0 ? (
          <button
            className={`bg-[#6B7280] text-white ${btnStyle}`}
            title={
              selectedSeats.length <= 0
                ? 'Tienes que elegir al menos un asiento para continuar'
                : ''
            }
          >
            Continuar
          </button>
        ) : (
          <button
            className={`bg-[#0099ff] text-black pointer ${btnStyle} `}
            onClick={() => setActiveForm(true)}
          >
            Continuar
          </button>
        )}

        {activeForm && (
          <SeatsForm
            selectedSeats={selectedSeats}
            resetSelectedSeats={() => setSelectedSeats([])}
            close={() => setActiveForm(false)}
            refreshState={loadSeats}
          />
        )}
      </section>
      <section className="hidden gap-5 lg:flex flex-col items-center w-[20vw] h-[70vh] border-2 border-blue-500 rounded-2xl bg-[#252525c4] overflow-auto">
        <h1 className={`${largeText} text-white mt-5`}>Tickets</h1>
        {selectedSeats.map((seat: Seat, i) => {
          return (
              <Ticket ticketNum={i+1} seatNum={seat.seatNum} lineNum={seat.lineNum} movieDate='16/10/25' movieImage='exampleFilmImg.png' movieTitle='Titulo de la pelicula'/>
          );
        })}
      </section>
    </main>
  );
}
