import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import {
  editarColor,
  eliminarColor,
  obtenerListaColores,
} from "../helpers/queries";
import Modal from "react-bootstrap/Modal";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
const ItemColor = ({ cargar, setCargar }) => {
  const [colorId, setColorId] = useState({});

  const [colores, setColores] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    obtenerListaColores().then((respuesta) => {
      //todo: preguntar si la respuesta tiene
      if (respuesta) {
        setColores(respuesta);
        setCargar(false);
        handleClose();
      } else {
        Swal.fire(
          "Error",
          "Intente realizar esta operación en unos minutos",
          "error"
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargar]);

  const handleEliminarColor = (color) => {
    Swal.fire({
      title: "Esta seguro de borrar la siguiente tarea?",
      text: "El siguiente cambio no podra ser revertido",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero borrar!",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        eliminarColor(color._id).then((respuesta) => {
          if (respuesta.status === 200) {
            obtenerListaColores().then((respuesta) => {
              if (respuesta) {
                setColores(respuesta);
              } else {
                Swal.fire(
                  "Error",
                  "Intente realizar esta operacion en unos minutos",
                  "error"
                );
              }
            });
            Swal.fire("Borrado!", "El color fue borrado.", "success");
          } else {
            Swal.fire({
              title: "Lo siento!",
              text: "El color no pudo ser eliminado.",
              icon: "error",
              confirmButtonColor: "#fa8072",
            });
          }
        });
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (colorEditado) => {
    editarColor(colorEditado, colorId._id).then((respuesta) => {
      if (respuesta.status === 200) {
        Swal.fire(
          "color editado correctamente!",
          `El color ${colorEditado.color} sufrió cambios`,
          "success"
        );
        reset();
        setCargar(true);
      } else {
        Swal.fire(
          "Ocurrio un error!",
          `El color ${colorEditado.color} no pudo ser editado`,
          "error"
        );
      }
    });
    Swal.fire("Color editado correctamente!", "", "success");
    reset();
  };

  return (
    <>
      {colores.map((color) => {
        return (
          <Card
            className="mx-2 my-2 col-12 col-md-3"
            style={{ width: "18rem" }}
            key={color._id}
          >
            <Card.Body
              style={{ background: color.color, height: "10rem" }}
            ></Card.Body>
            <Card.Body className="d-flex justify-content-between">
              <Card.Title>{color.color}</Card.Title>
            </Card.Body>
            <Card.Footer className="justify-content-">
              <Button
                variant="danger mx-4"
                onClick={() => handleEliminarColor(color)}
              >
                Borrar
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  handleShow();
                  setColorId(color);
                }}
              >
                Editar
              </Button>
            </Card.Footer>
          </Card>
        );
      })}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleSubmit(onSubmit)} className="bloqueFormulario">
            <Form.Group className="mb-3 d-flex flex-column" controlId="color">
              <Form.Label>El color actual es: {colorId.color}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escriba el nuevo color"
                {...register("color", {
                  required: "El nombre del color es obligatorio",
                  minLength: {
                    value: 2,
                    message: "La cantidad minima de caracteres es de 2 digitos",
                  },
                  maxLength: {
                    value: 150,
                    message:
                      "La cantidad maxima de caracteres es de 150 digitos",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.color?.message}
              </Form.Text>
            </Form.Group>
            <Container className="my-3 text-center">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="mx-5"
              >
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                Guardar cambios
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ItemColor;
