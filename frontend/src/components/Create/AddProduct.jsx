import axios from 'axios';
import React, { useState } from 'react';
import './AddProduct.css'

function AddProduct({ onUpload }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      formData.append('image', newProduct.image);

      axios.post('http://127.0.0.1:8000/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          onUpload();
          setNewProduct({ name: '', price: '', description: '', image: null });

        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const initialProductState = {
    name: '',
    price: '',
    description: '',
    image: null,
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!newProduct.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
      setIsSubmitted(false);
    }else{
      setIsSubmitted(true);
    }

    if (!newProduct.price) {
      errors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(newProduct.price)) {
      errors.price = 'Price must be a number';
      isValid = false;
      setIsSubmitted(false);
    }else{
      setIsSubmitted(true);
    }

    if (!newProduct.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
      setIsSubmitted(false);
    }else{
      setIsSubmitted(true);
    }

    if (!newProduct.image) {
      errors.image = 'Image is required';
      isValid = false;
      setIsSubmitted(false);
    }else{
      setIsSubmitted(true);
    }

    setErrors(errors);
    
    setNewProduct(initialProductState);
    return isValid;

  };


  return (
    <div className="parent-container">
      <div className="add-product-container">
        <h1>AddProduct</h1>
        {isSubmitted && <p>Product added successfully!</p>}
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" value={newProduct.description} onChange={handleChange} />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input type="number" name="price" value={newProduct.price} onChange={handleChange} />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>

          <div>
            <label htmlFor="image">Image</label>
            <input type="file" accept="image/*" name="image" onChange={handleChange} />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>

          <button type="submit">Add product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;