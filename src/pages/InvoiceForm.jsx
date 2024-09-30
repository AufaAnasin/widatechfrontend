import axios from "axios";
import { useState } from "react";
import {
  Col,
  Container,
  Form,
  ListGroup,
  Navbar,
  Row,
  Button,
} from "react-bootstrap";
import SuggestionCard from "../components/SuggestionCard";

function InvoiceForm() {
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products
  const [customerName, setCustomerName] = useState("");
  const [salespersonName, setSalespersonName] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch suggestions based on query
  const fetchSuggestion = async (query) => {
    if (query) {
      try {
        const response = await axios.get(
          `http://localhost:4080/api/products/search?query=${query}`
        );
        setSuggestion(response.data.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestion([]);
    }
  };

  // Handle input change for product search
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestion(value);
  };

  // Handle product selection
  const handleSelectProduct = (product) => {
    // Add the selected product to the selectedProducts array with a default quantity of 1
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      { ...product, quantity: 1 },
    ]);
    setQuery(""); // Clear the query input
    setSuggestion([]); // Clear the suggestion list
  };

  // Handle removing a selected product
  const handleRemoveProduct = (productId) => {
    // Filter out the product from the selectedProducts array
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((p) => p.productId !== productId)
    );
  };

  // Handle changing product quantity
  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.productId === productId ? { ...p, quantity: newQuantity } : p
      )
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      customerName,
      salespersonName,
      date,
      notes,
      product: selectedProducts.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      })),
    };

    try {
      // Send POST request to the backend API
      const response = await axios.post("http://localhost:4080/api/invoice", data);
      console.log("Invoice created:", response.data);
      // You can add success handling here (e.g., showing a message, resetting form, etc.)
    } catch (error) {
      console.error("Error creating invoice:", error);
      // Handle error response from backend
    }
  };

  return (
    <>
      <div>
        <Navbar className="bg-body-tertiary">
          <Container className="d-flex flex-row align-items-center">
            <Navbar.Brand href="#home" className="d-flex align-items-center">
              <i className="bi bi-bezier me-2" style={{ color: "blue" }}></i> <span>Sales Insight</span>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container className="mt-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Salesperson Name</Form.Label>
                  <Form.Control
                    type="input"
                    value={salespersonName}
                    onChange={(e) => setSalespersonName(e.target.value)}
                    placeholder="Enter salesperson name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter notes..."
                    required
                  />
                </Form.Group>

                {/* Product Search Autocomplete */}
                <Form.Group>
                  <Form.Label>Product Checked Out</Form.Label>
                  <Form.Control
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Type to search for products"
                  />

                  {/* List of suggested items */}
                  {suggestion.length > 0 && (
                    <ListGroup className="mt-2">
                      {suggestion.map((product) => (
                        <ListGroup.Item
                          key={product.productId}
                          onClick={() => handleSelectProduct(product)}
                          style={{ cursor: "pointer" }}
                          className="d-flex"
                        >
                          <img src="../../public/vite.svg" className="mx-3" />
                          <div className="d-flex flex-column">
                            <strong className="mb-0">
                              {product.productName}
                            </strong>
                            <p className="mb-0 text-muted">
                              Price: ${product.price}
                            </p>
                            <p className="mb-0 text-muted">
                              Stock: {product.stock}
                            </p>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Form.Group>

                {selectedProducts.length > 0 && (
                  <div className="mt-3">
                    {selectedProducts.map((product) => (
                      <SuggestionCard
                        key={product.productId}
                        stock={product.stock}
                        productId={product.productId}
                        image={product.image}
                        name={product.productName}
                        price={product.price}
                        quantity={product.quantity}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(product.productId, newQuantity)
                        } // Handle quantity change
                        onDelete={handleRemoveProduct} // Handle delete product
                      />
                    ))}
                  </div>
                )}

                <Button variant="primary" type="submit" className="mt-3">
                  Submit Invoice
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default InvoiceForm;