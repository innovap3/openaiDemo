import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS, postProducts } from "./api";
import "./ProductModal.scss";

const ProductModalForm = ({ setProductName, setPrice }) => {
  return (
    <form>
      <div className="field">
        <label>product name</label>
        <input onChange={(e) => setProductName(e.target.value)} />
      </div>
      <div className="field">
        <label>price</label>
        <input onChange={(e) => setPrice(e.target.value)} />
      </div>
    </form>
  );
};

const ProductModal = ({ isOpen, setIsOpen }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      await postProducts({ name: productName, price });
      setIsOpen(false);
    },
    {
      onSuccess: () => {
        setProductName("");
        setPrice("");
        queryClient.invalidateQueries(QUERY_KEYS.listProducts);
      },
    }
  );
  if (!isOpen) return null;
  return (
    <div className="product-modal">
      <div className="body">
        <div className="header">
          <h3>Add Product</h3>
        </div>
        <div className="content">
          <ProductModalForm
            setProductName={setProductName}
            setPrice={setPrice}
          />
        </div>
        <div className="footer">
          <button onClick={mutation.mutate}>OK</button>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
