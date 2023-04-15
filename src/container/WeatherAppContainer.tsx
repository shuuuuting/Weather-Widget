import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import { useState } from "react"
import { theme } from "src/assets/theme"
import WeatherCard from "src/components/WeatherCard"

const AppContainer = styled.div`
  background-color: ${({ theme }: any)  => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherAppContainer = () => {
  const [currTheme, setCurrTheme] = useState("dark")

  return (
    <ThemeProvider theme={theme[currTheme]}>
        <AppContainer>
        <WeatherCard />
        </AppContainer>
    </ThemeProvider>
    )
}

export default WeatherAppContainer