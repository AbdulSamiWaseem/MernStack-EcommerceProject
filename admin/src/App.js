import './app.css'
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser'
import Product from './pages/product/Product'
import ProductsList from './pages/productList/ProductList';
import NewProduct from './pages/newProduct/NewProduct'
import Login from './pages/login/Login'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = () => {
  return (
    <div className="App">
      <Topbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function App() {
  // const admin = useState(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin);
  const { currentUser } = useSelector(state => state.user)
  // console.log("admin :", currentUser)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            element={currentUser?.isAdmin ?
              <DashboardLayout /> :
              <Navigate to={'/login'} replace />
            } >
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/user/:userId' element={<User />} />
            <Route path='/newUser' element={<NewUser />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/newProduct' element={<NewProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;

// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
// import "./App.css";
// import Home from "./pages/home/Home";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";
// import Login from "./pages/login/Login";
// import { useSelector } from "react-redux";

// function App() {
//   const admin = useSelector((state) => state.user.currentUser.isAdmin);
//   return (
//     <Router>
//       <Switch>
//         <Route path="/login">
//           <Login />
//         </Route>
//         {admin && (
//           <>
//             <Topbar />
//             <div className="container">
//               <Sidebar />
//               <Route exact path="/">
//                 <Home />
//               </Route>
//               <Route path="/users">
//                 <UserList />
//               </Route>
//               <Route path="/user/:userId">
//                 <User />
//               </Route>
//               <Route path="/newUser">
//                 <NewUser />
//               </Route>
//               <Route path="/products">
//                 <ProductList />
//               </Route>
//               <Route path="/product/:productId">
//                 <Product />
//               </Route>
//               <Route path="/newproduct">
//                 <NewProduct />
//               </Route>
//             </div>
//           </>
//         )}
//       </Switch>
//     </Router>
//   );
// }

// export default App;
