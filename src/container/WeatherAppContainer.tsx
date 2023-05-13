import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import { useAppSelector } from "src/app/hooks"
import { theme } from "src/assets/theme"
import WeatherCard from "src/components/WeatherCard"
import { selectTheme } from "src/slices/statusSlice"

const AppContainer = styled.div`
  background-color: ${({ theme }: any)  => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherAppContainer = () => {
  const currTheme = useAppSelector(selectTheme)

  return (
    <ThemeProvider theme={theme[currTheme]}>
        <AppContainer>
        <WeatherCard />
        </AppContainer>
    </ThemeProvider>
    )
}

export default WeatherAppContainer