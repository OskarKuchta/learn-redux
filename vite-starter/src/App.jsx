import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";
const App = () => {
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="loading">
          <h1>loading...</h1>
        </div>
      </>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
