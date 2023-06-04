import { useDispatch } from "react-redux";
import { addToCart, setCurrentShop } from "../reducer";
import Header from "./Header";
import NoImagePlaceholder from "../assets/no-image-placeholder.png"

const ShopGoods = ({ goods, shops, currentShop }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <div className="content-container">
        <ul className="shops">
          {shops.map((shop) => {
            return (
              <li
                className={`shop-item ${currentShop === shop ? "active" : null}` }
                onClick={() => dispatch(setCurrentShop(shop))}
                key={`shop-${shop._id}`}
              >
                <div>{shop.name}</div>
              </li>
            );
          })}
        </ul>
        <div className="goods">
          {goods.map((item) => {
            return (
              <div key={`good-${item._id}`} className="good-item">
                <img className="good-item__img" src={NoImagePlaceholder} />
                <div className="good-item__name">{item.name}</div>
                <div>{item.price.$numberDecimal} <span>{item.price.currency || "UAH"}</span></div>
                <button className="button" onClick={() => dispatch(addToCart(item))}>
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShopGoods;
