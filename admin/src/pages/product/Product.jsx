import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import PublishIcon from '@mui/icons-material/Publish';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getProductStats } from "../../api2/apiCalls";
import {
  updateProductSuccess,
} from "../../redux/productRedux";
import { updateProducts } from "../../api2/apiCalls";
import Loader from "../../components/loader/Loader";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { updatedProductSchema } from "../../schema";
import { capitalizeFirstLetter } from "../../utils";


export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [fetching, setFetching] = useState(false)

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const { values, handleChange, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      title: product.title,
      desc: product.desc,
      price: product.price,
      inStock: product.inStock,
      file: null
    },
    validationSchema: updatedProductSchema,
    onSubmit: (values) => {
      setFetching(true)

      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('desc', values.desc)
      formData.append('price', values.price)
      formData.append('inStock', values.inStock)

      values.file && formData.append('img', values.file)
      //  for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      updateProduct(productId, formData);

      setFetching(false)
    }

  })

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await getProductStats(productId)
        if (res?.status == 200) {
          const list = res.data.sort((a, b) => {
            return a._id - b._id
          })
          list.map((item) =>
            setPStats((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], Sales: item.total },
            ])

          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const updateProduct = async (productId, product) => {
      const res = await updateProducts(product, productId);
      if (res.status == 200) {
        dispatch(updateProductSuccess(res.data));
        toast.success('Product Updated Successfully.')
      }
   
  }

 
  // const handleChange = (e) => {
  //   setUpdatedProduct((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create New</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={`${process.env.REACT_APP_BASE_URL}${product.img}`} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ProductId: </span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Sales : </span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In Stock : </span>
              <span className="productInfoValue">{`${product.inStock}`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={"Name"} value={values.title} name="title" onChange={handleChange} />
            <p className="formErrors">{capitalizeFirstLetter(errors.title)}</p>
            <label>Product Description</label>
            <input type="text" placeholder={"Description"} value={values.desc} name="desc" onChange={handleChange} />
            <p className="formErrors">{capitalizeFirstLetter(errors.desc)}</p>
            <label>Price</label>
            <input type="text" placeholder={"Price"} value={values.price} name="price" onChange={handleChange} />
            <p className="formErrors">{capitalizeFirstLetter(errors.price)}</p>
            <label>In Stock</label>
            <select name="inStock" value={values.inStock} productId="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={values.file ?
                  URL.createObjectURL(values.file)
                  : `${process.env.REACT_APP_BASE_URL}${product.img}`
                }
                alt=""
                className="productUploadImg"
              />
              <label for="file" onClick={() => document.getElementById('product-image-input').click()} >
                <PublishIcon />
              </label>
              <input id='product-image-input' name="file" type="file" productId="file" style={{ display: "none" }} onChange={(e) => { console.log(e.target.files[0]); setFieldValue('file', e.target.files[0]) }} />
            </div>
            <button className="productButton" type="submit">Update</button>
          </div>
        </form>
      </div>
      <Loader flag={fetching} />
    </div>
  );
}
