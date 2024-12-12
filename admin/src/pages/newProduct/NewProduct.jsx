import { useState, useRef } from "react";
import "./newProduct.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../api2/apiCalls";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "../../redux/productRedux";
import { useFormik } from 'formik';
import { createProductSchema } from "../../schema";
import { capitalizeFirstLetter } from "../../utils";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

export default function NewProduct() {

  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit, setFieldValue, errors, touched, handleBlur } = useFormik({
    initialValues: {
      title: '',
      desc: '',
      price: '',
      inStock: true,
      color: [],
      cat: [],
      file: null
    },
    validationSchema: createProductSchema,
    onSubmit: (values, actions) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('desc', values.desc)
      formData.append('price', values.price)
      formData.append('inStock', values.inStock)

      values.cat.forEach(item => {
        formData.append('categories[]', item)
      })
      values.color.forEach(item => {
        formData.append('color[]', item)
      })
      values.file && formData.append('img', values.file)
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      createProduct(formData);
      actions.resetForm();
      fileInputRef.current.value = '';
    }

  })

  const createProduct = async (product) => {
      const res = await addProduct(product);
      if (res?.status == 200)
        dispatch(addProductSuccess(res.data));
      toast.success('Product Added Successfully.')
  };

  return (
    <div className="newProduct">
      <div className="newProductForm">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm" onSubmit={handleSubmit}>
          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file"
              id="file"
              name="file"
              ref={fileInputRef}
              onChange={(e) => { setFieldValue('file', e.target.files[0]) }}
            />
            {errors.file && touched.file
              ? <p className="formErrors">{capitalizeFirstLetter(errors.file)}</p>
              : null
            }
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}

            />
            {(errors.title && touched.title)
              ? (<p className="formErrors">{capitalizeFirstLetter(errors.title)}</p>)
              : null
            }
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              name="desc"
              type="text"
              value={values.desc}
              placeholder="description..."
              onChange={handleChange}
              onBlur={handleBlur}

            />
            {errors.desc && touched.desc
              ? <p className="formErrors">{capitalizeFirstLetter(errors.desc)}</p>
              : null
            }
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="100"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}

            />
            {errors.price && touched.price
              ? <p className="formErrors">{capitalizeFirstLetter(errors.price)}</p>
              : null
            }
          </div>
          <div className="addProductItem">
            <label>Categories</label>

            <input type="text" name="cat" value={values.cat} placeholder="mens, womens and kids" onBlur={handleBlur} onChange={(e) => { setFieldValue('cat', e.target.value.split(",")) }} />
            {errors.cat && touched.cat
              ? <p className="formErrors">{capitalizeFirstLetter(errors.cat)}</p>
              : null
            }
          </div>
          <div className="addProductItem">
            <label>Colors</label>
            <input name="color" type="text" value={values.color} placeholder="Colors(i.e. black,red,orange)" onBlur={handleBlur} onChange={(e) => { setFieldValue('color', e.target.value.split(",")) }} />
            {errors.color && touched.color
              ? <p className="formErrors">{capitalizeFirstLetter(errors.color)}</p>
              : null
            }
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select name="inStock" onChange={handleChange} value={values.inStock}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button type="submit" className="addProductButton">
            Create
          </button>

        </form>
      </div>
      <Link to="/products">
        <button className="productAddButton">
          Back to Products List
        </button>
      </Link>
    </div>
  );
}
