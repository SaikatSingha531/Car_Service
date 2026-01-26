import { BrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import theme from './Theme/Theme'
import { ThemeProvider , CssBaseline } from '@mui/material'
import MainHome from './Components/MainHome'
import { Router } from './Routing/Routing'

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <RouterProvider router={Router}/>


   


    </ThemeProvider>
    </>
  )
}

export default App
