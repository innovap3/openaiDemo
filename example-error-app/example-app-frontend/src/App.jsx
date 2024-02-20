import { useQuery } from "react-query";
import { listProducts, QUERY_KEYS } from "./api";
import Adding from "./Adding";
import Menu from "./Menu";
import "./App.css";

function App() {
  const { data = [] } = useQuery(QUERY_KEYS.listProducts, listProducts);
  return (
    <>
      <Menu products={data} />
      <Adding products={data} />
    </>
  );
}

export default App;
