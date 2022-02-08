import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import "./styles.css";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const filteredProducts = () =>
    products
      .filter((prod) => (byStock ? true : prod.inStock))
      .filter((prod) => (byFastDelivery ? prod.fastDelivery : true))
      .filter((prod) => prod.ratings >= byRating)
      .filter((prod) =>
        searchQuery
          ? prod.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      );
  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {filteredProducts()
          .sort((a, b) =>
            sort === "asc"
              ? Number(a.price) - Number(b.price)
              : Number(b.price) - Number(a.price)
          )
          .map((prod) => {
            return <SingleProduct key={prod.id} prod={prod} />;
          })}
      </div>
    </div>
  );
};

export default Home;
