import seatsStatus from "./SeatsStatus";

type claimSchem = {
    chairIds: string[],
    name: string,
    lastName: string,
    email: string
    close: ()=> void
    setError: (error: string[]) => void
}

export default async function claimSeats({chairIds, name, lastName, email, close, setError} : claimSchem){
    const response = await fetch("http://localhost:4000/claim",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            chairIds: chairIds,
            name: name,
            lastName: lastName,
            email: email,
            occupied: false
        })
    })

    const res = await response.json();
    if(res.success){
        seatsStatus()
        close()
    }else{
        console.log(res.errorType)
        setError(res.errorType)
    }
}