import { useEffect, useState } from "react";
import { getCart, updateCartQuantity, deleteCartItem } from "../Api/CartService";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const username = localStorage.getItem("username");

  const loadCart = () => {
    if (!username) return;

    getCart(username)
      .then(res => {
        setCart(res.data.data);
      })
      .catch(err => console.error("Cart API failed", err));
  };

  useEffect(() => {
    loadCart();
  }, [username]);

  // ➕ increment
  const increment = (item) => {
    updateCartQuantity(item.id, item.quantity + 1)
      .then(loadCart)
      .catch(err => console.error("Update failed", err));
  };

  // ➖ decrement
  const decrement = (item) => {
    if (item.quantity <= 1) return;

    updateCartQuantity(item.id, item.quantity - 1)
      .then(loadCart)
      .catch(err => console.error("Update failed", err));
  };

  // ❌ remove item
  const removeItem = (id) => {
    deleteCartItem(id)
      .then(loadCart)
      .catch(err => console.error("Delete failed", err));
  };

  if (!cart || !Array.isArray(cart.items)) {
    return <p>Loading cart...</p>;
  }

  return (
    <div>
      <h3>Cart</h3>

      {cart.items.map(item => (
        <div
          key={item.id}
          style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
        >
          <h4>{item.productName}</h4>
          <h3>{item.quantity}</h3>
          <p>₹{item.price}</p>

          <button onClick={() => decrement(item)}>-</button>
          <span style={{ margin: "0 10px" }}>{item.quantity}</span>
          <button onClick={() => increment(item)}>+</button>

          <button
            style={{ marginLeft: "20px", color: "red" }}
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h4>Total: ₹{cart.totalAmount}</h4>
    </div>
  );
}
