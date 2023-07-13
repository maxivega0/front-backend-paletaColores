import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Card from 'react-bootstrap/Card';

const ItemColor = ({colores, borrarColor }) => {
    return (    
    <>
      {colores.map((color) => {
        return (
          <Card className="mx-2 my-2 col-12 col-md-3" style={{ width: "18rem" }} key={color}>
            <Card.Body style={{ background: color, height: "10rem" }}></Card.Body>
            <Card.Body className="d-flex justify-content-between">
              <Card.Title>{color}</Card.Title>
            </Card.Body>
            <Card.Footer className='justify-content-'>
              <Button variant="danger mx-4" onClick={() => borrarColor(color)}>Borrar</Button>
              <Button variant="warning" onClick={() => borrarColor(color)}>Editar</Button>
            </Card.Footer>
          </Card>
        );
      })}
    </>
      
    );
    
};

export default ItemColor;