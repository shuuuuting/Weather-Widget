import styled from "@emotion/styled"
import WeatherCard from "src/components/WeatherCard"

const AppContainer = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherAppContainer = () => {
  return (
      <AppContainer>
        <WeatherCard />
      </AppContainer>
  )
}

export default WeatherAppContainer