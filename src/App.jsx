import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ShopGoods from "./components/ShopGoods.jsx";
import Cart from "./components/Cart.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentShop,
  selectGoods,
  selectIsLoading,
  selectOrder,
  selectOrderCreated,
  selectShops,
  setInitialData,
} from "./reducer.js";
import { getGoods, getShops } from "./queries.js";
import { useEffect } from "react";
import { useQueries } from "react-query";

const App = () => {
  const dispatch = useDispatch();

  // initial data loading
  const results = useQueries([
    {
      queryKey: ["shopsQuery"],
      queryFn: getShops,
    },
    {
      queryKey: ["goodsQuery"],
      queryFn: getGoods,
    },
  ]);

  const queriesLoading = results.some((result) => result.isLoading);

  useEffect(() => {
    if (!queriesLoading) {
      dispatch(setInitialData(results.map(item => item.data)));
    };
  }, [queriesLoading]);

  const isLoading = useSelector(selectIsLoading);
  const goods = useSelector(selectGoods) || [];
  const shops = useSelector(selectShops) || [];
  const order = useSelector(selectOrder) || {};
  const orderCreated = useSelector(selectOrderCreated)
  const currentShop = useSelector(selectCurrentShop);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<ShopGoods goods={goods} shops={shops} currentShop={currentShop} />} />
        <Route path="cart" element={<Cart order={order} orderCreated={orderCreated} />} />
        <Route
          path="shop"
          element={<ShopGoods goods={goods} shops={shops} currentShop={currentShop} />}
        />
      </>
    )
  );
  if (isLoading) {
    return <>Loading...</>;
  };

  return <RouterProvider router={router} />;
};

export default App;
