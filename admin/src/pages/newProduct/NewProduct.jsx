import { useState } from "react";
import "./newProduct.css";
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
    formData.append('color[]', 'black')

    cat.forEach(item => {
      formData.append('categories[]', item)
    })
    file && formData.append('img', file)

    createProduct(formData);

  };
  const createProduct = async (product) => {
    dispatch(addProductStart());
    try {
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
          <input type="text" placeholder="mens, womens and kids" onChange={handleCat} />
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
