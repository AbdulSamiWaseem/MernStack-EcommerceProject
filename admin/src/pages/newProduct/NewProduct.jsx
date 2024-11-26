import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import app from "../../firebase";
// import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { addProduct } from "../../api2/apiCalls";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "../../redux/productRedux";
export default function NewProduct() {
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    price: '',
    inStock: true
  });
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('title', inputs.title)
    formData.append('desc', inputs.desc)
    formData.append('price', inputs.price)
    formData.append('inStock', inputs.inStock)
    cat.forEach(item => {
      formData.append('categories[]', item)
    })
    file && formData.append('img', file)

    createProduct(formData);

  };
  const createProduct = async (product) => {
    dispatch(addProductStart());
    try {
      // const res = await userRequest.post(`/products`, product);
      const res = await addProduct(product);
      if (res?.status == 200)
        dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
    setInputs({
      title: '',
      desc: '',
      price: '',
      inStock: true
    })
    setCat([])
    setFile(null)
    // console.log(inputs)
    // console.log(cat)
    // console.log(file)
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            value={inputs.desc}
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            value={inputs.price}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" value={inputs.inStock} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>

      </form>
    </div>
  );
}
