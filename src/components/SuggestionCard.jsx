import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function SuggestionCard({ name, price, stock, productId, onDelete }) {
  const [quantity, setQuantity] = useState(1); // State to keep track of product quantity

  // Function to increase quantity, ensuring it does not exceed the stock
  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  // Function to decrease quantity, ensuring it does not go below 1
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Card className="mt-2 px-2 py-3" key={productId}>
        <Container>
          <Row>
            <Col>
              <div className="d-flex align-items-center">
              <img src="../../public/vite.svg" className="mx-3"></img>
              {/* <img src={product.image} alt="../../public/vite.svg" className="mx-3" /> */}
                <div>
                  <h4 className="mb-0">
                    <b>{name}</b>
                  </h4>
                  <p className="mb-0 extra-small text-muted">Stock: {stock}</p>
                  <p className="mb-0 extra-small text-muted">Price: ${price}</p>
                </div>
              </div>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <Button
                variant="outline-danger"
                onClick={decreaseQuantity}
                className="me-2"
                disabled={quantity === 1} // Disable button if quantity is 1
              >
                -
              </Button>
              <div className="d-flex align-items-center justify-content-center mx-2">
                <span>{quantity}</span>
              </div>
              <Button
                variant="outline-success"
                onClick={increaseQuantity}
                disabled={quantity === stock} // Disable button if quantity reaches stock
              >
                +
              </Button>
              <div className="ms-3">
                <p className="mb-0">
                  <b>Total</b>
                </p>
                <p className="mb-0">${(quantity * price).toFixed(2)}</p>
              </div>
              <Button
                variant="outline-danger"
                onClick={() => onDelete(productId)} // Call onDelete with productId
                className="ms-3"
              >
                <i className="bi bi-x"></i>
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
}

SuggestionCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SuggestionCard;