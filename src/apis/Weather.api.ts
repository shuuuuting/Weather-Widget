import axios from "axios"
import { ApiResponse } from "src/types/Response.type"

const AUTH_TOKEN = process.env.REACT_APP_API_AUTHORIZATION_KEY
const BASE_URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/"
const REALTIME_KEY = "O-A0003-001"
const FORECAST_KEY = "F-C0032-001"

export const fetchRealTimeWeather = async (locationName: string): Promise<ApiResponse> => {
  try {
    const res = await axios.get(BASE_URL + REALTIME_KEY, {
      params: {
        Authorization: AUTH_TOKEN,
        stationName: locationName
      },
    })
    if (res.data.success === "true") return { data: res.data.records }
    else return { error: res.data.msg }
  } catch (e) {
    console.log(e)
    return { error: "Fail: internal service error happened while fetching country data" }
  }
}

export const fetchWeatherForecast = async (cityName: string): Promise<ApiResponse> => {
  try {
    const res = await axios.get(BASE_URL + FORECAST_KEY, {
      params: {
        Authorization: AUTH_TOKEN,
        locationName: cityName,
      },
    })
    if (res.data.success === "true") return { data: res.data.records }
    else return { error: res.data.msg }
  } catch (e) {
    console.log(e)
    return { error: "Fail: internal service error happened while fetching country data" }
  }
}
