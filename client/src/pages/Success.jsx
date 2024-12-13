import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import apiRequest from "../api";
import { Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  console.log("current", currentUser)
  console.log("cart",cart);
  useEffect(() => {
    if (!currentUser || !cart ) {
      return
    }

    let total = 0;
    for (let i = 0; i < cart.products.length; i++) {
      total = total + cart.products[i].price * cart.products[i].quantity;
    }
    total+=5;
    console.log("total",total);

    const createOrder = async () => {
      const res = await apiRequest("POST", "orders", {
        userId: currentUser._id,
        products: cart.products.map((item) => ({
          productId: item._id,
          quantity: item._quantity,
        })),
        amount: total,
        address: data.billing_details.address,
      })
      console.log("res", res)
      if (res?.status == 200) {
        setOrderId(res.data._id);
      }

    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to={'/'}>
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
