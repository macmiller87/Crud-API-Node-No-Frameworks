const host = process.env.HOST;
const port = process.env.PORT;

export async function makePOSTRequests(endPoint, data) {
    const request = await fetch(`http://${host}:${port}/${endPoint}`, {
        method: "POST",                             
        body: JSON.stringify(data)
    });
    
    return request.json();            
};