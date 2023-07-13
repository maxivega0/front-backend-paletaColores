import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import ItemColor from "./ItemColor";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";

const FormularioColor = () => {
  const coloresLocalStorage = JSON.parse(localStorage.getItem('listaColores')) || [];
  const [color, setColor] = useState("");
  const [colores, setColores] = useState(coloresLocalStorage)
  
  useEffect(() => {
    localStorage.setItem('listaColores', JSON.stringify(colores))
  }, [colores])

  const handleSubmit = (e) => {
    e.preventDefault();
    setColores([...colores, color]);
    setColor("");
  }
  
  const borrarColor = (nombreColor) =>{
    let copiaColores = colores.filter((itemColor) => itemColor !== nombreColor);
    setColores(copiaColores);
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="bloqueFormulario">
        <Form.Group className="mb-3 d-flex flex-column" controlId="tarea">
          <Form.Control
            type="text"
            placeholder="Ingrese una color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          />
        </Form.Group>

          <Container className="my-3 text-center">
          <Button variant="primary" type="submit">
            Guardar
          </Button>
          </Container>
  
      </Form>

      <Container className="d-flex row justify-content-center">
        <ItemColor colores={colores} borrarColor={borrarColor}></ItemColor>
      </Container>
      
    </>
  );
};

export default FormularioColor;