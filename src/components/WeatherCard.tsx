import styled from "@emotion/styled"
import { useEffect, useMemo } from "react"
import { ReactComponent as AirFlowIcon } from "src/images/airFlow.svg"
import { ReactComponent as RainIcon } from "src/images/rain.svg"
import { ReactComponent as RefreshIcon } from "src/images/refresh.svg"
import { ReactComponent as LoadingIcon } from "src/images/loading.svg"
import { ReactComponent as CogIcon } from "src/images/cog.svg"
import WeatherIcon from "./ＷeatherIcon"
import { getMoment } from "src/utils/MomentGetter"
import useWeatherAPI from "src/hooks/useWeatherAPI"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { saveCurrPage, saveCurrTheme, selectIsLoading, selectLocatedCity } from "src/slices/statusSlice"
import { findLocation } from "src/utils/LocationMappings"

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

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const WeatherCard = () => {
  const dispatch = useAppDispatch()
  const locatedCity = useAppSelector(selectLocatedCity)
  const isLoading = useAppSelector(selectIsLoading)
  const currLocation = useMemo(() => findLocation(locatedCity), [locatedCity])
  const cityName = currLocation?.cityName ?? "臺北市"
  const locationName = currLocation?.locationName ?? "臺北"
  const sunriseCityName = currLocation?.sunriseCityName ?? "臺北市"

  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName])
  const [weather, fetchWeatherData]: any = useWeatherAPI({
    locationName,
    cityName
  })

  const {
    description,
    weatherCode,
    windSpeed,
    temperature,
    rainPossibility,
    observationTime,
    comfortability,
  } = weather

  useEffect(() => {
    dispatch(saveCurrTheme(moment === "day" ? "light" : "dark"))
  }, [moment])

  const handlePageChange = () => {
    dispatch(saveCurrPage("WeatherSetting"))
  }

  return (
    <CardContainer>
      <Cog onClick={handlePageChange}/>
      <Location>{locationName}</Location>
      <Description>
        {description}
        {comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon weatherCode={weatherCode} moment={moment} />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon /> {windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon /> {rainPossibility}%
      </Rain>
      <Refresh isLoading={isLoading} onClick={fetchWeatherData}>
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
