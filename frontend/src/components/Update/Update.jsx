import React, { useEffect, useState } from 'react';
import './Update.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Update() {
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  const BASE_URL = 'http://127.0.0.1:8000'
  
  const [show, setShow] = useState(false);

  const [currentProductId, setCurrentProductId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (productId) => {
    setCurrentProductId(productId);
    const selectedProduct = products.find(product => product.id === productId);
    setUpdateProduct({
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price,
      image: selectedProduct.image
    });
    setShow(true);
  };

 

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axios.get(`${BASE_URL}/display/`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUpdateProduct(prevState => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_id', currentProductId);
    formData.append('name', updateProduct.name);
    formData.append('description', updateProduct.description);
    formData.append('price', updateProduct.price);
    formData.append('image', updateProduct.image);

    axios.post(`${BASE_URL}/update_product/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Response:', response.data);
        handleClose();
        window.location.reload(); 
      })
      .catch(error => {
        console.log('Error submitting product data:', error);
      });
  };

  return (
    <div>
      <h2>Update</h2>
      <div className="card-container">
        {products.map((product, index) => (
          <div key={index} className="card">
            <img src={BASE_URL + product.image} alt="Product" />
            <div className="card-body">
              <h2>{product.name}</h2>
              <p>{product.id}</p>
              <p>${product.price}</p>
              <Button variant="primary" onClick={() => handleShow(product.id)}>
                Edit
              </Button>
              <button className='buy-btn'>Buy</button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={updateProduct.name} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea name="description" value={updateProduct.description} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input type="number" name="price" value={updateProduct.price} onChange={handleChange} />
            </div>

            <div>
              <img src={BASE_URL + updateProduct.image} alt="Product" />
              <br />
              <label htmlFor="image">Image</label>
              <input type="file" accept="image/*" name="image" onChange={handleChange} />
            </div>

            <button type="submit">Update Product</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Update;
