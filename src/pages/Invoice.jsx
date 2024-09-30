import { Col, Container, Navbar, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

function Invoice() {
  const apiResponse = useSelector((state) => state.invoice.apiResponse);
  return (
    <div>
      {" "}
      <Navbar className="bg-body-tertiary">
        <Container className="d-flex flex-row align-items-center">
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <i className="bi bi-bezier me-2" style={{ color: "blue" }}></i>{" "}
            <span>Sales Insight</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <h3 className="mt-3">Invoice Details</h3>
        <p className="mb-2">
              Invoice Number: <strong>{apiResponse.data.invoiceId}</strong>
            </p>
        <Row>
          <Col>
            <p className="mb-0">
              <strong>Customer Name: </strong>
            </p>
            <p className="mb-4">{apiResponse.data.customerName}</p>
            <p className="mb-0">
              <strong>Total Price: </strong>
            </p>
            <p>${apiResponse.data.total}</p>
          </Col>
          <Col>
            <p className="mb-0">
              <strong>Date: </strong>
            </p>
            <p className="mb-4">{apiResponse.data.date}</p>
            <p className="mb-0">
              <strong>Notes </strong>
            </p>
            <p>{apiResponse.data.notes}</p>
          </Col>
        </Row>
        <Row>
            <h5>Product Details</h5>
            {apiResponse.length > 0 && (
                <div className="mt-3">
                    <ProductCard />
                </div>
            )}
        </Row>
        <Row>
          </Row>
      </Container>
    </div>
  );
}

export default Invoice;
