const host = process.env.HOST;
const port = process.env.PORT;

export async function makeDELETERequests(endPoint, data) {
    
    const request = await fetch(`http://${host}:${port}/${endPoint}/${data.user_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${data.token}`
        }

    }).then(async (response) => {
        const resp = await new Promise(resolve => resolve(response.json()));
        return resp;
    });

    return request;
}

export async function makeDELETERequestsProducts(endPoint, data) {
    
    const request = await fetch(`http://${host}:${port}/${endPoint}/${data.product_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${data.token}`
        }

    }).then(async (response) => {
        const resp = await new Promise(resolve => resolve(response.json()));
        return resp;
    });

    return request;
}
