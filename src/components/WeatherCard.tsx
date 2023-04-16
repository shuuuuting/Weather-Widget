import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { fetchRealTimeWeather, fetchWeatherForecast } from "src/apis/Weather.api"
import { ReactComponent as AirFlowIcon } from "src/images/airFlow.svg"
import { ReactComponent as DayCloudyIcon } from "src/images/day-cloudy.svg"
import { ReactComponent as RainIcon } from "src/images/rain.svg"
import { ReactComponent as RefreshIcon } from "src/images/refresh.svg"
import { ReactComponent as LoadingIcon } from "src/images/loading.svg"
import { IWeather, IWeatherElement } from "src/types/Weather.type"

const CardContainer = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }: any) => theme.boxShadow};
  background-color: ${({ theme }: any) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }: any) => theme.titleColor};
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }: any) => theme.textColor};
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Temperature = styled.div`
  color: ${({ theme }: any) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }: any) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }: any) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const DayCloudy = styled(DayCloudyIcon)`
  flex-basis: 30%;
`

const Refresh = styled.div<{ isLoading: Boolean }>`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }: any) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`

const WeatherCard = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [weather, setWeather] = useState<IWeather>({
    locationName: "台北市",
    description: "多雲時晴",
    weatherCode: 0,
    windSpeed: 1.1,
    temperature: 22.9,
    rainPossibility: 48.3,
    observationTime: "2020-12-12 22:10:00",
    comfortability: "舒適"
  })

const { 
    locationName, 
    description, 
    weatherCode,
    windSpeed, 
    temperature, 
    rainPossibility, 
    observationTime, 
    comfortability
  } = weather

  useEffect(() => {
    getRealTimeWeather()
    getWeatherForecast()
  }, [])

  const getRealTimeWeather = async () => {
    setIsLoading(true)
    const res = await fetchRealTimeWeather()
    if ("data" in res) {
      const locationData = res.data.location[0]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements: { [key: string]: string }, item: IWeatherElement) => {
          if (["WDSD", "TEMP"].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue
          }
          return neededElements
        },
        {}
      )
      setWeather((prevWeather) => ({
        ...prevWeather,
        locationName: locationData.locationName,
        windSpeed: weatherElements.WDSD,
        temperature: weatherElements.TEMP,
        observationTime: locationData.time.obsTime,
      }))
      setIsLoading(false)
    }
  }

  const getWeatherForecast = async () => {
    const res = await fetchWeatherForecast()
    if ("data" in res) {
      const locationData = res.data.location[0]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements: { [key: string]: any }, item: IWeatherElement) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter
          }
          return neededElements
        },
        {}
      )
      setWeather((prevWeather) => ({
        ...prevWeather,
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      }))
    }
  }

  const handleRefresh = () => {
    getRealTimeWeather()
    getWeatherForecast()
  }

  return (
    <CardContainer>
      <Location>{locationName}</Location>
      <Description>{description}{comfortability}</Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <DayCloudy />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon /> {windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon /> {rainPossibility}%
      </Rain>
      <Refresh 
        isLoading={isLoading} 
        onClick={handleRefresh}
      >
        最後觀測時間：
        {new Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(observationTime))}
        {isLoading ? <LoadingIcon /> : <RefreshIcon />}
      </Refresh>
    </CardContainer>
  )
}

export default WeatherCard
