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
  //This states takes seat data from the database
  const [seats, setSeats] = useState<Seat[]>([]);

  //This state takes the seats that the user has selected
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  //State to control the visibility of the form
  const [activeForm, setActiveForm] = useState(false);

  //Function to load seat data from the database
  const loadSeats = async () => {
    const seatData = await seatsStatus();
    setSeats(seatData);
  };

  //Load seat data when the component mounts
  useEffect(() => {
    setSelectedSeats([]);
    loadSeats();
  }, []);

  //Style for the buttons without usings CSS file
  const btnStyle =
    'w-[30vw] h-[5vh]  lg:w-[20vw] self-center rounded-xl border-[1px] border-[#00FFFF] text-white font-bold';

  //Legend data
  const leyend = [
    { img: 'freeSeat.svg', alt: 'FreeSeatImg', text: 'Libre' },
    { img: 'selectedSeat.svg', alt: 'SelectedSeatImg', text: 'Seleccionado' },
    { img: 'occupiedSeat.svg', alt: 'occupiedSeatImg', text: 'Ocupado' },
  ];

  return (
    <main className="flex h-full w-full justify-around items-center">
      <section className="hidden lg:flex flex-col items-center gap-5 w-[20vw] h-[70vh] ">
        <div className="w-[15vw] h-[30vh] bg-[#252525c4] border-2 border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-3">
          <h1 className="large-text text-2xl">Leyenda</h1>
          {leyend.map((item, i) => (
            <article key={i} className="flex gap-3 w-[70%] m-0 justify-start items-center">
              <img alt={item.alt} src={item.img} className="w-[3vw]" />
              <h2 className="medium-text">{item.text}</h2>
            </article>
          ))}
        </div>
        <div className="w-[15vw] h-[40vh] bg-[#252525c4] border-2 border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-4">
          <h1 className="large-text text-center">Instrucciones</h1>
          <p className="small-text text-center w-[80%]">
            1. Selecciona los asientos que deseas reservar haciendo click en ellos.
          </p>
          <p className="small-text text-center w-[80%]">
            2. Una vez seleccionados, haz click en "Continuar" para proceder con la reserva.
          </p>
          <p className="small-text text-center w-[80%]">
            3. Completa el formulario con tus datos personales y confirma la reserva.
          </p>
          <p className="small-text text-center w-[80%]">
            4. Recibirás una confirmación de tu reserva.
          </p>
        </div>
      </section>
      <section className="w-[90vw] md:w-[70vw] lg:w-[40vw] h-[80vh] justify-center flex flex-col gap-2">
        <div className="h-[70vh] w-[100%] bg-slate-800 grid grid-cols-10 gap-3 grid-rows-9 ">
          <div className="col-span-2 col-start-5 row-start-2 row-span-5"></div>
          {seats.map((seat) => {
            // Render each seat based on its status
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
          <img src="screen.png" alt="screenImg" className="col-[1/11] row-8 w-full rotate-180" />
        </div>
        {
          // Continue button logic, disabled if no seats are selected
          selectedSeats.length <= 0 ? (
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
          )
        }

        {
          // Render the SeatsForm component when activeForm is true
          activeForm && (
            <SeatsForm
              selectedSeats={selectedSeats}
              resetSelectedSeats={() => setSelectedSeats([])}
              close={() => setActiveForm(false)}
              refreshState={loadSeats}
            />
          )
        }
      </section>
      <section className="hidden gap-5 lg:flex flex-col items-center w-[20vw] h-[70vh] border-2 border-blue-500 rounded-2xl bg-[#252525c4] overflow-auto">
        <h1 className="large-text mt-5">Tickets</h1>
        {
          // Render tickets for each selected seat
          selectedSeats.map((seat: Seat, i) => {
            return (
              <Ticket
                ticketNum={i + 1}
                seatNum={seat.seatNum}
                lineNum={seat.lineNum}
                movieDate="16/10/25"
                movieImage="exampleFilmImg.png"
                movieTitle="Titulo de la pelicula"
                style=" w-[90%] min-h-[15vh] h-[15vh]"
              />
            );
          })
        }
      </section>
    </main>
  );
}
