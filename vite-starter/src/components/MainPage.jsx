import React from "react";
import { useSelector } from "react-redux";
import ShopItem from "./ShopItem";
const MainPage = () => {
  const { cartItems } = useSelector((store) => store.cart);
  return (
    <div>
      {cartItems.map((item) => {
        return <ShopItem key={item.id} {...item} />;
      })}
    </div>
  );
};

export default MainPage;
