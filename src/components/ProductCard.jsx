import { Card, Col, Container, Row } from "react-bootstrap";

function ProductCard() {
  return (
    <div>
      <Card className="mt-2 px-2 py-3">
        <Container>
          <Row>
            <Col className="d-flex">
              <img src="../../public/vite.svg" alt="Test" />
              <div className="mx-3">
                <p className="mb-0">
                  <strong>Product Name</strong>
                </p>
                <p className="text-muted">iPhone 13 Pro</p>
                <p className="mb-0">
                  <strong>Price</strong>
                </p>
                <p className="text-muted">$1299</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <div className="mx-3">
                <p className="mb-0">
                  <strong>Quantity:</strong>
                </p>
                <p className="text-muted">3</p>
                <p className="mb-0">
                  <strong>Total:</strong>
                </p>
                <p className="text-muted">$3999</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}

export default ProductCard;
