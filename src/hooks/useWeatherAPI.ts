import { useCallback, useEffect, useState } from "react"
import { fetchRealTimeWeather, fetchWeatherForecast } from "src/apis/Weather.api"
import {
  IRealTimeWeather,
  IWeather,
  IWeatherElement,
  IWeatherForecast,
} from "src/types/Weather.type"

const getRealTimeWeather = async (locationName: string) => {
  const res = await fetchRealTimeWeather(locationName)
  if ("data" in res) {
    const locationData = res.data.location[0]
    const weatherElements = locationData.weatherElement.reduce(
      (neededElements: IRealTimeWeather, item: IWeatherElement) => {
        if (["WDSD", "TEMP"].includes(item.elementName)) {
          neededElements[item.elementName] = item.elementValue
        }
        return neededElements
      },
      {}
    )
    return {
      locationName: locationData.locationName,
      windSpeed: weatherElements.WDSD,
      temperature: weatherElements.TEMP,
      observationTime: locationData.time.obsTime,
    }
  }
  return {
    locationName: "",
    windSpeed: 0,
    temperature: 0,
    observationTime: new Date().toString(),
  }
}

const getWeatherForecast = async (cityName: string) => {
  const res = await fetchWeatherForecast(cityName)
  if ("data" in res) {
    const locationData = res.data.location[0]
    const weatherElements = locationData.weatherElement.reduce(
      (neededElements: IWeatherForecast, item: IWeatherElement) => {
        if (["Wx", "PoP", "CI"].includes(item.elementName)) {
          neededElements[item.elementName] = item.time[0].parameter
        }
        return neededElements
      },
      {}
    )
    return {
      description: weatherElements.Wx.parameterName,
      weatherCode: weatherElements.Wx.parameterValue,
      rainPossibility: weatherElements.PoP.parameterName,
      comfortability: weatherElements.CI.parameterName,
    }
  }
  return {
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
  }
}

const useWeatherAPI = ({ locationName, cityName }: { locationName: string; cityName: string }) => {
  const [weather, setWeather] = useState<IWeather>({
    locationName: "",
    description: "",
    weatherCode: 0,
    windSpeed: 0,
    temperature: 0,
    rainPossibility: 0,
    observationTime: new Date().toString(),
    comfortability: "",
  })

  const fetchWeatherData = useCallback(async () => {
    const [realTimeWeather, weatherForecast] = await Promise.all([
      getRealTimeWeather(locationName),
      getWeatherForecast(cityName),
    ])

    setWeather({
      ...realTimeWeather,
      ...weatherForecast,
    })
  }, [locationName, cityName])

  useEffect(() => {
    fetchWeatherData()
  }, [fetchWeatherData])

  return [weather, fetchWeatherData]
}

export default useWeatherAPI
