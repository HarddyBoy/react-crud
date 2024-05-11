import React, { useEffect } from 'react';
import { useState } from 'react';
import ProductService from '../service/product_service';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [product, setProduct] =  useState({
    id:"",
    productName:"",
    description:"",
    price:"",
    status:""
  });

  const navigate = useNavigate();

  const {id} = useParams();
  console.log(id);

  const [msg, setMsg] = useState("");

  useEffect(()=>{
    ProductService.getProductById(id).then((res)=>{
      setProduct(res.data);
    }).catch((error)=>{
      console.log(error);
    });

  },[id]);

  const handleChange=(e)=>{
    const value  = e.target.value;
    setProduct({...product,[e.target.name]:value});
  }

  const ProductUpdate = (e)=>{
    e.preventDefault();
    ProductService.editProduct(product).then((res)=>{
      console.log("Product Updated successfully");
      navigate("/");
    }).catch((error)=>{
      console.log(error);
    })
  };
  return (
    <>
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <div className='card'>
              <div className='card-header fs-3 text-center'>Edit Product</div>

              {
                msg &&
                <p className='fs-4 text-center text-success'>{msg}</p>
              }

              <div className='card-body'>
                <form onSubmit={(e)=>ProductUpdate(e)}>
                  <div className='mb-3'>
                    <label>Enter Product Name</label>
                    <input type="text" name="productName" id="productName" className='form-control' onChange={(e)=>handleChange(e)} value={product.productName}/>
                  </div>

                  <div className='mb-3'>
                    <label>Enter Product Description</label>
                    <input type="text" name="description" id="description" className='form-control' onChange={(e)=>handleChange(e)} value={product.description} />
                  </div>

                  <div className='mb-3'>
                    <label>Enter Product Price</label>
                    <input type="text" name="price" id="price" className='form-control' onChange={(e)=>handleChange(e)} value={product.price} />
                  </div>

                  <div className='mb-3'>
                    <label>Enter Product Status</label>
                    <input type="text" name="status" id="status" className='form-control' onChange={(e)=>handleChange(e)} value={product.status} />
                  </div>

                  <button className='btn btn-success col-md-12'>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProduct
