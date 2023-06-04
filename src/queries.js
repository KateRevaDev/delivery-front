const SERVER_URL = "http://localhost:3333";

export const getShops = async () => {
  const res = await fetch(`${SERVER_URL}/shops`);
  return res.json();
};

export const getGoods = async () => {
  const res = await fetch(`${SERVER_URL}/goods`);
  return res.json();
};

export const createOrder = async (order) => {
  const res = await fetch(`${SERVER_URL}/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });
  return res.json();
};
