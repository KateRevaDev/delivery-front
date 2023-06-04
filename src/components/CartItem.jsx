import { useEffect, useState } from "react";
import NoImagePlaceholder from "../assets/no-image-placeholder.png";
import CloseImg from "../assets/close.svg";
import { useDispatch } from "react-redux";
import { removeItem, updateOrderField } from "../reducer";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div key={`good-${item._id}`} className="cart-item">
      <img className="cart-item__img" src={NoImagePlaceholder} />
      <div className="cart-item__content">
        <div className="cart-item__name">{item.name}</div>
        <div className="cart-item__quantity">
          <input
            defaultValue={quantity}
            min={1}
            type="number"
            onChange={(e) => setQuantity(Number(e.target.value))}
            onBlur={() =>
              dispatch(
                updateOrderField({
                  field: "quantity",
                  value: quantity,
                  _id: item._id,
                })
              )
            }
          />
          <img
            className="cart-item__close-img"
            src={CloseImg}
            alt="Remove item"
            onClick={() => {
              dispatch(
                removeItem({
                  _id: item._id,
                })
              );
            }}
          />
        </div>
        <div>
          {item.price?.$numberDecimal}{" "}
          <span>{item.price.currency || "UAH"}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
