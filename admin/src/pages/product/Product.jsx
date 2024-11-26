import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import PublishIcon from '@mui/icons-material/Publish';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
// import { userRequest } from "../../requestMethods";
import { getProductStats } from "../../api2/apiCalls";
import {
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "../../redux/productRedux";
import { updateProducts } from "../../api2/apiCalls";
import Loader from "../../components/loader/Loader";
import { toast } from 'react-toastify';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

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

  useEffect(() => {
    const getStats = async () => {
      try {
        // const res = await userRequest.get("orders/income?pid=" + productId);
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
    dispatch(updateProductStart());
    try {
      const res = await updateProducts(product, productId);
      if (res.status == 200) {
        dispatch(updateProductSuccess(res.data));
        toast.success('Product Updated Successfully.')
      }
    } catch (err) {
      dispatch(updateProductFailure());
      toast.error("Product Not Updated.")
    }
  }
  const [updatedProduct, setUpdatedProduct] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
    inStock: product.inStock

  })
  const [file, setFile] = useState(null);
  const [fetching, setFetching] = useState(false)


  const handleChange = (e) => {
    setUpdatedProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    setFetching(true)
    e.preventDefault();
    const formData = new FormData()
    formData.append('title', updatedProduct.title)
    formData.append('desc', updatedProduct.desc)
    formData.append('price', updatedProduct.price)
    formData.append('inStock', updatedProduct.inStock)

    file && formData.append('img', file)
    // console.log("updatedProduct",updatedProduct);
    // console.log("product",product)
    // console.log("productID",productId)

    updateProduct(productId, formData);
    setFetching(false)


  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
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
              <span className="productInfoKey">productId:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product.title} name="title" onChange={handleChange} />
            <label>Product Description</label>
            <input type="text" placeholder={product.desc} name="desc" onChange={handleChange} />
            <label>Price</label>
            <input type="text" placeholder={product.price} name="price" onChange={handleChange} />
            <label>In Stock</label>
            <select name="inStock" productId="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={file ?
                  URL.createObjectURL(file)
                  : `${process.env.REACT_APP_BASE_URL}${product.img}`
                }
                alt=""
                className="productUploadImg"
              />
              <label for="file" onClick={() => document.getElementById('product-image-input').click()} >
                <PublishIcon />
              </label>
              <input id={'product-image-input'} type="file" productId="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <button className="productButton" onClick={handleClick}>Update</button>
          </div>
        </form>
      </div>
      <Loader flag={fetching} />
    </div>
  );
}
