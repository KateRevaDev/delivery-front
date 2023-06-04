import { useDispatch } from "react-redux";
import Header from "./Header";
import { useEffect, useState } from "react";
import { createOrder } from "../queries";
import { setOrderCreated, updateOrderField } from "../reducer";
import CartItem from "./CartItem";

const Cart = ({ order, orderCreated }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(order.name);
  const [email, setEmail] = useState(order.email);
  const [phone, setPhone] = useState(order.phone);
  const [address, setAddress] = useState(order.address);

  useEffect(() => {
    return () => {
      dispatch(setOrderCreated({ created: false }));
    };
  }, []);

  if (orderCreated) {
    return (
      <>
        <Header />
        <span>Your order was succesfully created!</span>
      </>
    );
  }

  return (
    <>
      <Header />
      {order.goods.length ? (
        <div className="cart">
          <div className="cart-details">
            <div className="cart-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="cart-input"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() =>
                  dispatch(updateOrderField({ field: "name", value: name }))
                }
              />
            </div>
            <div className="cart-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="cart-input"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() =>
                  dispatch(updateOrderField({ field: "email", value: email }))
                }
              />
            </div>
            <div className="cart-field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                className="cart-input"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() =>
                  dispatch(updateOrderField({ field: "phone", value: phone }))
                }
              />
            </div>
            <div className="cart-field">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                className="cart-input"
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() =>
                  dispatch(
                    updateOrderField({ field: "address", value: address })
                  )
                }
              />
            </div>
          </div>

          <div className="cart-content">
            <div className="cart-list">
              {order?.goods.map((item) => (
                <CartItem key={`cart-item${item._id}`} item={item} />
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>{order.total}</span>
              </div>
              <button
                onClick={() => {
                  const res = createOrder(order);
                  res.then((value) => {
                    if (value._id) {
                      dispatch(setOrderCreated({ created: true }));
                    }
                  });
                }}
                className="button cart-button"
              >
                Create an order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <span>Your cart is empty...</span>
      )}
    </>
  );
};

export default Cart;
