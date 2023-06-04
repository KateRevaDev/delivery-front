import { Link } from "react-router-dom";
import { selectOrderQuantity } from "../reducer";
import { useSelector } from "react-redux";

const Header = () => {

  const quantity = useSelector(selectOrderQuantity);

  return (
    <header>
      <ul className="header-items">
        <li className="header-item header-shops">
          <Link to={`/shop`}>Shops</Link>
        </li>
        <li className="header-item header-cart">
          <Link to={`/cart`}>Cart <span>({ quantity || 0 })</span></Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
