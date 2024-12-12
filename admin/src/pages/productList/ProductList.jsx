import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productRows } from "../../dummyData";
import ListItem from "../../components/listItem/ListItem";

import {
  getProductSuccess,
} from "../../redux/productRedux";
import { getAllProducts } from "../../api2/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  // console.log(products);
  const getProducts = async () => {
    const res = await getAllProducts();
    // console.log('RES',res);
    if (res?.status == 200)
      dispatch(getProductSuccess(res.data));

  };

  useEffect(() => {
    getProducts();
  }, [dispatch]);


  // const [data,setData]=useState(productRows)


  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        // console.log(params.row.img[0])
        return (
          <div className="productListItem">
            {params.row.img[0] == 'u'
              ? <img className="productListImg" src={`${process.env.REACT_APP_BASE_URL}${params.row.img}`} alt="" />
              : <img className="productListImg" src={`${params.row.img}`} alt="" />}
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        console.log("a", params)
        return (
          <ListItem params={params} />
        );
      },
    },
  ];
  return (
    <div className="productList">
      <div className="createNewProduct">
        <h3>Products List</h3>
        <Link to="/newProduct">
          <button className="productAddButton">Create New Product</button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        // rows={productRows}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
