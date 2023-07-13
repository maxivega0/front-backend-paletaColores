const URL_colores = import.meta.env.VITE_API_COLOR
// direccion api: VITE_API_Color=http://localhost:4010/apiColores/Colores 

export const crearColor = async (color) => {
    try {
      const respuesta = await fetch(URL_colores, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(color),
      });
      return respuesta; 
    } catch (error) {
      console.log(error);
    }
  };

  export const obtenerListaColores = async () => {
    try {
      const respuesta = await fetch(URL_colores);
      const listaColores = await respuesta.json();
      return listaColores;
    }catch (error) {
      console.log(error)
    }
  }

  export const eliminarColor = async (id) => {
    try {
      const respuesta = await fetch(URL_colores + "/" + id, {
        method: "DELETE",
      });
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const editarColor = async (color, id) => {
    try {
      console.log(id);
      console.log(color);
      console.log(URL_colores);
      const respuesta = await fetch(URL_colores + "/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(color),
      });
      console.log(respuesta);
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };
