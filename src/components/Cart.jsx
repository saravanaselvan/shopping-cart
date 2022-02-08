import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + parseFloat(current.price) * Number(current.qty),
        0
      )
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded></Image>
                </Col>
                <Col md={2}>{prod.name}</Col>
                <Col md={2}>{prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: { id: prod.id, qty: e.target.value },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((val, index) => (
                      <option key={index}>{val + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length})</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: {total}</span>
        <Button disabled={cart.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
