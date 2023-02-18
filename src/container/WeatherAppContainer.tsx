import styled from "@emotion/styled"
import WeatherCard from "src/components/WeatherCard"

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherAppContainer = () => {
  return (
      <Container>
        <WeatherCard />
      </Container>
  )
}

export default WeatherAppContainer