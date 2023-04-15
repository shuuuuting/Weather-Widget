import axios, { AxiosResponse } from "axios"
import { ApiResponse } from "src/types/Response.type"

const AUTH_TOKEN = "CWB-0CD4EF1A-51A3-4093-8B9E-A9EB60C8C09D"
const LOCATION = "臺北"
const BASE_URL = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001"

export const fetchWeather = async (): Promise<ApiResponse> => {
    try {
        const res = await axios.get(BASE_URL, {
            params: {
                Authorization: AUTH_TOKEN,
                locationName: LOCATION
            }
        })
        if (res.data.success === "true" ) return { data: res.data.records }
        else return { error: res.data.msg }
    } catch (e) {
        console.log(e)
        return { error: "Fail: internal service error happened while fetching country data"}
    }
}