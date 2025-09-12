const host = process.env.HOST;
const port = process.env.PORT;          

export async function makePATCHRequests(endPoint, data) {
    
    const request = await fetch(`http://${host}:${port}/${endPoint}/${data.user_id}`, {
        method: "PATCH",
        body: JSON.stringify({ username: data.username }),
        headers: {
            Authorization: `Bearer ${data.token}`
        }, 

    }).then(async (response) => {
        const resp = await new Promise(resolve => resolve(response.json()));
        return resp;  
    });

    return request;
};