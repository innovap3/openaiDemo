import express, { Request } from "express";

const router = express.Router();

const products = [
  { id: 1, name: "apple", price: 5 },
  { id: 2, name: "banana", price: 6 },
  { id: 3, name: "orange", price: 3 },
];

router.get("/", function (req, res) {
  res.json(products);
});

router.post(
  "/",
  function (
    req: Request<unknown, unknown, { name: string; price: string }>,
    res,
  ) {
    const { name, price } = req.body || {};
    if (!name || !price) {
      res.status(500).json({ error: "Failed to add product." });
      return;
    }
    products.push({ id: products.length, name, price: Number(price) });
    res.json(products);
  },
);

export default router;
