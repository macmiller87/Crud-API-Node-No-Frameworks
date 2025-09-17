const host = process.env.HOST;
const port = process.env.PORT;

export async function makePOSTWithTokenRequests(endPoint, data) {

    const request = await fetch(`http://${host}:${port}/${endPoint}`, {
        method: "POST",                 
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    }).then(async (response) => {
        const resp = await new Promise(resolve => resolve(response.json()));
        return resp;
    });            

    return request;
};