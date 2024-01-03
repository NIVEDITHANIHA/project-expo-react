import axios from "axios"


const Api = async (httpmethod, url, body, header) => {

    const reqConfig = {
        method: httpmethod,
        url: url,
        data: body,
        headers: header ? header : { "Content-Type": "application/json" }

    }

    return await axios(reqConfig).then((response) => {
        console.log(response);
        return response
    }).catch((error) => {
        console.log(error);
        return error
    })



}

export default Api