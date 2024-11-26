import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { productRows } from "../../dummyData";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "../../redux/productRedux";
import { getAllProducts,deleteProduct } from "../../api2/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  // console.log(products);
  const getProducts = async () => {
    dispatch(getProductStart());
    try {
      const res = await getAllProducts();
      // console.log('RES',res);
      if(res?.status == 200)
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
  };

  useEffect(() => {
    getProducts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteProductStart());
    try {
      // const res= await deleteProduct(id);
      // console.log("delete res:",res)
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
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
            {params.row.img[0]=='u'
            ?<img className="productListImg" src={`${process.env.REACT_APP_BASE_URL}${params.row.img}`} alt="" />
            :<img className="productListImg" src={`${params.row.img}`} alt="" /> }
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
        return (
          <div className="edit">
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="productList">
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
