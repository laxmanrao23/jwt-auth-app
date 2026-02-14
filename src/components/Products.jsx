import { useEffect, useState } from "react";
import { getAllProducts } from "../Api/productService";
import { addToCart } from "../Api/CartService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Increment
  const increment = (id) => {
    setQuantities(prev => ({
      ...prev, [id]: (prev[id] || 1) + 1
    }));
  };

  // Decrement
  const decrement = (id) => {
    setQuantities(prev => ({
      ...prev, [id] : Math.max((prev[id] || 1) - 1, 1)
    }))
  }

  // add to cart
  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    const productId = product._id || product.id || product.productId
    const data = {
      username: localStorage.getItem("username"),
      productid: productId,
      productName: product.name,
      price: product.price,
      quantity: quantity,
      category: product.category
    };

    console.log("data: ", data);

    addToCart(data).then(() => alert("Added to cart")).catch(err => console.error("Add to cart failed", err));
  }

  useEffect(() => {
    getAllProducts()
    .then(res => setProducts(res.data))
    .catch(err => console.error("Products API failed", err));
  }, []);

  return (
    <div>
      <h3>Products</h3>

      {products.map(product => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          product name: <h4>{product.name}</h4>
          <p>{product.description}</p>
          Product Price: <p>₹{product.price}</p>
          category : <p>{product.category}</p>

          <div>
            <button onClick={() => decrement(product._id)}>-</button>

            <span style={{ margin: "0 10px" }}>
              {quantities[product._id] || 1}
            </span>

            <button onClick={() => increment(product._id)}>+</button>
          </div>

          <button
            style={{ marginTop: "10px" }}
            onClick={() => {
              handleAddToCart(product)}}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
