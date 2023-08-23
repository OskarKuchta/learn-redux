import React from "react";
import CartItem from "./CartItems";
import { clearCart, resetChanges } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
const CartContainer = () => {
  const dispatch = useDispatch();
  const clearList = () => {
    dispatch(clearCart());
    dispatch(openModal());
  };
  const reset = () => {
    dispatch(resetChanges());
  };

  const { cartItems, total, amount } = useSelector((store) => store.cart);
  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag is empty</h2>
          <h4 className="empty-cart"> is currently empty</h4>
        </header>
        <button className="btn btn-reverse" onClick={reset}>
          Reset changes
        </button>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={clearList}>
          Clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
