import styled from "@emotion/styled"
import { ReactComponent as AirFlowIcon } from "src/images/airFlow.svg"
import { ReactComponent as DayCloudyIcon } from "src/images/day-cloudy.svg"
import { ReactComponent as RainIcon } from "src/images/rain.svg"
import { ReactComponent as RefreshIcon } from "src/images/refresh.svg"

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

const Refresh = styled.div`
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
  }
`

const WeatherCard = () => {
  return (
    <CardContainer>
      <Location>台北市</Location>
      <Description>多雲時晴</Description>
      <CurrentWeather>
        <Temperature>
          23 <Celsius>°C</Celsius>
        </Temperature>
        <DayCloudy />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon /> 23 m/h
      </AirFlow>
      <Rain>
        <RainIcon /> 48%
      </Rain>
      <Refresh>
        最後觀測時間：上午 12:03 <RefreshIcon />
      </Refresh>
    </CardContainer>
  )
}

export default WeatherCard
