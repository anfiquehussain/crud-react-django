import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Display.css';

function Display() {
    // State to hold the products received from the API
    const [products, setProducts] = useState([]);

    const Base_url = 'http://127.0.0.1:8000'

    // Fetch products from the API when the component mounts
    useEffect(() => {
        fetchProduct();
    }, []);

    // Function to fetch products from the API
    const fetchProduct = () => {
        // Make a GET request to the API endpoint
        axios.get('http://localhost:8000/display/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                // Log an error if there's an error fetching data from the API
                console.error('Error fetching data:', error);
            });
    };



    // Render the component with the products data
    return (
        <div>
            <h2>Display</h2>
            <div className="card-container">
                {/* Display the products */}
                {products.map((product, index) => (
                    <div key={index} className="card">
                        <img src={Base_url + product.image} alt="Product" />
                        <div className="card-body">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <button className='cart-btn'>Add to Cart</button><button className='buy-btn'>Buy</button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default Display;
