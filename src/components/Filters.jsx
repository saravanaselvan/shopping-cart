import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Filters = () => {
  const {
    productState: { sort, byStock, byRating },
    productDispatch,
  } = CartState();

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inine-1`}
          value="asc"
          checked={sort === "asc"}
          onChange={() =>
            productDispatch({ type: "SORT_BY_PRICE", payload: "asc" })
          }
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inine-2`}
          value="desc"
          checked={sort === "desc"}
          onChange={() =>
            productDispatch({ type: "SORT_BY_PRICE", payload: "desc" })
          }
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inine-3`}
          checked={byStock}
          onChange={() => productDispatch({ type: "FILTER_BY_STOCK" })}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inine-4`}
          onChange={() => productDispatch({ type: "FILTER_BY_FAST_DELIVERY" })}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          style={{ cursor: "pointer" }}
          onClick={(i) => {
            productDispatch({ type: "FILTER_BY_RATING", payload: i + 1 });
          }}
        />
      </span>
      <Button variant="light" onClick={() => productDispatch({})}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
