
export async function getPlanets() {
   let response = await fetch('https://findfalcone.herokuapp.com/planets');
   let data = await response.json();
   return data;
}

export async function getVehicles() {
    let response = await fetch('https://findfalcone.herokuapp.com/vehicles');
    let data = await response.json();
    return data;
 }

export async function gameResult(req) {
    let response  = await fetch('https://findfalcone.herokuapp.com/find', 
    { 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method : 'POST',
        body: JSON.stringify(req)
        }
    );

    let data = await response.json();
    return data;
}

export async function token() {
    let response  = await fetch('https://findfalcone.herokuapp.com/token', 
    { 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method : 'POST'
        }
    );
    let data = await response.json();
    return data.token;
 }
 