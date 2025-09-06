const baseURL = process.env.BASE_URL;

export async function makePOSTRequests(endPoint, data) {
    const request = await fetch(`${baseURL}/${endPoint}`, {
        method: "POST",                             
        body: JSON.stringify(data)
    });
    
    return request.json();            
};