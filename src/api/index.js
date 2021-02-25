import Axios from "axios";

const url = 'http://openapi.data.go.kr/getCovid19InfStateJson'

export const fetchData = async () => {
    const data = await Axios.get(url, {
        headers: {
           "Access-Control-Allow-Origin": "*"
        },
        params: {
            ServiceKey : 'mQ12y4QAfbuZL2fpRcPbVSTKZY%2BoEy6pNjTBVz1wFY6Wd9BEkEJ6a0o85TUBK6o9NXHaF6c%2B6FZ%2BshGbhzAygw%3D%3D'
        }
    })

    console.log(data);

    return data
}