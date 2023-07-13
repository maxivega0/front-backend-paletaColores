import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import ItemColor from "./ItemColor";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { crearColor } from "../helpers/queries";

const FormularioColor = () => {
  const [cargar, setCargar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (nuevoColor) => {
    console.log(nuevoColor);
    crearColor(nuevoColor).then((respuesta) => {
      if (respuesta.status === 201) {
        Swal.fire(
          "Producto creado correctamente!",
          `El producto ${nuevoColor.color} fue creado correctamente`,
          "success"
        );
        reset();
        setCargar(true);
      } else {
        Swal.fire(
          "Ocurrio un error!",
          `El producto ${nuevoColor.color} no pudo ser creado`,
          "error"
        );
      }
    });
    reset();
  };

  // const borrarColor = (nombreColor) =>{
  //   let copiaColores = colores.filter((itemColor) => itemColor !== nombreColor);
  //   setColores(copiaColores);
  // }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="bloqueFormulario">
        <Form.Group className="mb-3 d-flex flex-column" controlId="color">
          <Form.Label>Color*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: alguna descripcion"
            {...register("color", {
              required: "El nombre del producto es obligatorio",
              minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
              maxLength: {
                value: 150,
                message: "La cantidad maxima de caracteres es de 150 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.color?.message}</Form.Text>
        </Form.Group>
        <Container className="my-3 text-center">
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Container>
      </Form>

      <Container className="d-flex row justify-content-center">
        <ItemColor cargar={cargar} setCargar={setCargar}></ItemColor>
      </Container>
    </>
  );
};

export default FormularioColor;
