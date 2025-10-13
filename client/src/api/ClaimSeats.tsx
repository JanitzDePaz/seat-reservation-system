import seatsStatus from "./SeatsStatus";

type claimSchem = {
    chairIds: string[],
    nombre: string,
    apellido: string,
    DNI: string
    close: ()=> void
}

export default async function claimSeats({chairIds, nombre, apellido, DNI, close} : claimSchem){
    const response = await fetch("http://localhost:4000/claim",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            chairIds: chairIds,
            Nombre: nombre,
            Apellido: apellido,
            DNI: DNI,
            ocupado: false
        })

        
    })

    const res = await response.json();
    if(res.success){
        seatsStatus()
        close()
    }else{
        console.log(res.body)
    }
}