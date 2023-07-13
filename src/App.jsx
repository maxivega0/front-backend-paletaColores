// import { useState } from 'react'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormularioColores from "./components/FormularioColores";
import './App.css'

function App() {

  return (
    <>
    <Container className="mb-5">
      <h1 className='display-4 text-center'>Guardar colores</h1>
      <FormularioColores></FormularioColores>
    </Container>
    <footer className='text-center bg-dark text-light py-4'>
      <p>&copy; Todos los derechos reservados</p>
    </footer>
    </>
  )
}

export default App
