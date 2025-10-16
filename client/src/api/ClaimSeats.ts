import seatsStatus from "./SeatsStatus";

type claimSchem = {
    chairIds: string[],
    nombre: string,
    apellido: string,
    mail: string
    close: ()=> void
}

export default async function claimSeats({chairIds, nombre, apellido, mail, close} : claimSchem){
    const response = await fetch("http://localhost:4000/claim",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            chairIds: chairIds,
            Nombre: nombre,
            Apellido: apellido,
            mail: mail,
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