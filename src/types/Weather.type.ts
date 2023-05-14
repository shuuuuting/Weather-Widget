export type IWeather = {
  locationName: string
  description: string
  weatherCode: number
  windSpeed: number
  temperature: number
  rainPossibility: number
  observationTime: string
  comfortability: string
}

export type IRealTimeWeather = {
  [key: string]: any
  locationName: string
  windSpeed: number
  temperature: number
  observationTime: string
}

export type IWeatherForecast = {
  [key: string]: any
  description: string
  weatherCode: number
  rainPossibility: number
  comfortability: string
}

export type IWeatherElement = {
  elementName: string
  elementValue: string
  time: ITimeElement[]
}

type ITimeElement = {
  startTime: string
  endTime: string
  parameter: {
    parameterName: string
    parameterValue: string
  }
}

export type ILocation = {
  cityName: string
  locationName: string
  sunriseCityName: string
}
