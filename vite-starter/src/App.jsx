import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal, clearCart } from "./features/cart/cartSlice";
import Modal from "./components/Modal";
import { Route, Routes } from "react-router-dom";
import NotExist from "./components/NotExist";
import MainPage from "./components/MainPage";

const App = () => {
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  return (
    <>
      {isOpen && <Modal />}
      <Navbar />
      <Routes>
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotExist />} />
      </Routes>
    </>
  );
};

export default App;
