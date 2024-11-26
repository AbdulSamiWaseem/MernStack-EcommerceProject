import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pay from "./pages/Pay";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";


const App = () => {
  const User = useSelector((state) => state.user.currentUser);
  // const User = false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/products/:category" element={<ProductList />}>
        </Route>
        <Route path="/product/:id" element={<Product />}>
        </Route>
        <Route path="/cart" element={<Cart />}>
        </Route>
        <Route path="/success" element={<Success />}>
        </Route>
        <Route path="/pay" element={<Pay />}>
        </Route>
        <Route path="/login"  element={User ? <Navigate to={'/'} replace /> : <Login/>}>
        </Route>
        <Route path="/register"  element={User ? <Navigate to={'/'} replace /> : <Register/>}>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
