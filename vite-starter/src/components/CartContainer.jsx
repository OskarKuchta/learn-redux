import React from "react";
import CartItem from "./CartItems";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
const CartContainer = () => {
  const dispatch = useDispatch();
  const modal = () => {
    dispatch(openModal());
  };

  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const filteredCartItems = cartItems.filter((item) => item.amount > 1);
  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag is empty</h2>
          <h4 className="empty-cart"> is currently empty</h4>
        </header>
        <a href="/">
          <button className="btn btn-reverse">Back to main page</button>
        </a>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
      </header>

      <div>
        {filteredCartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={modal}>
          Clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
