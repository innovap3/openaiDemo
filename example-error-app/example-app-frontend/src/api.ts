export const QUERY_KEYS = {
  listProducts: "listProducts",
  postProducts: "postProducts",
};

export const listProducts = async () => {
  const response = await fetch("http://localhost:3001/products");
  return response.json();
};

export const postProducts = async (payload: {
  name: string;
  price: number;
}) => {
  const response = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
