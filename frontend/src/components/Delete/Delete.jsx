import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Delete() {
  const [products, setProducts] = useState([]);
  const BASE_URL = 'http://127.0.0.1:8000'

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchProduct();
  }, [])

  const fetchProduct = () => {
    axios.get(`${BASE_URL}/display/`)
      .then(response => {
        setProducts(response.data)
        console.log(response.data)
      }).catch(error => {
        console.log("EROOR", error)
      })
  }

  function ClickDelete(product_id) {
    console.log(product_id)
    axios.post(`${BASE_URL}/delete/`, { product_id })
      .then(response => {
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <h1>Delete</h1>
      <div className="card-container">

        {products.map((product, index) => (
          <div>
            <div key={index} className="card">
              <img src={BASE_URL + product.image} alt="Product" />
              <div className="card-body">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button className='cart-btn' onClick={handleShow} >delete</button>
                {/* onClick={
                              ()=> ClickDelete(product.id)
                            } */}
              </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>DELETE THE PRODUCT</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={() => {
                  handleClose();
                  ClickDelete(product.id);
                }}>
                  Delete
                </Button>

              </Modal.Footer>
            </Modal>


          </div>
        ))}



      </div>


    </div>
  )
}

export default Delete