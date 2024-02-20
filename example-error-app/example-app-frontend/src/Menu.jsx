import { useState } from "react";
import "./Menu.scss";
import ProductModal from "./ProductModal";

const Menu = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="menu">
      <table>
        <thead>
          <tr>
            <th>product</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((data) => (
            <tr key={data.name}>
              <td>{data.name}</td>
              <td>${data.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add Product
      </button>
      <ProductModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Menu;
